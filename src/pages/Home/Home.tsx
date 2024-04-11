import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Products } from "../../models/products";
import {
  Container,
  Input,
  ButtonSearch,
  InputContainer,
  SearchIcon,
  ProductCardsContainer,
  ProductCards,
  ImageProduct,
  DetailProduct,
  TitleProduct,
  PriceProduct,
  IconAddCart,
  IconBox,
  QuantityProduct,
  ButtonAddProduct,
  TitleAddCard,
} from "./styles";

export default function Home() {
  const navigate = useNavigate();
  const { addToCart, setCart, cart } = useCart();

  const [loading, setLoading] = useState(true);
  const [searchMovie, setSearchMovie] = useState("");
  const [filmesDisponiveis, setFilmesDisponiveis] = useState<Products[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao carregar os dados.");
        }
        return res.json();
      })
      .then((data: Products[]) => {
        const newData: Products[] = data.map((item) => ({
          ...item,
          quantity: 0,
        }));
        console.log("newData: ", newData);
        setCart(newData);
        setFilmesDisponiveis(newData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro de rede:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    function handlePopState() {
      const path = window.location.pathname;
      const searchTerm: string = path.split("/").pop() as string;

      fetch(`http://localhost:8000/products?q=${searchTerm}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao buscar produtos");
          }
          return response.json();
        })
        .then((data: Products[]) => {
          const moviesFiltered = cart.filter((itemCart) =>
            data.some((itemData) => itemData.id === itemCart.id)
          );
          console.log("moviesFiltered: ", moviesFiltered);
          setFilmesDisponiveis(moviesFiltered);
        })
        .catch((error) => {
          console.error("Erro ao buscar produtos:", error);
        });
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [cart, setFilmesDisponiveis]);

  const handleInputChange = (event: any) => {
    setSearchMovie(event.target.value);
  };

  const handleSearch = () => {
    fetch(`http://localhost:8000/products?q=${searchMovie}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }
        return response.json();
      })
      .then((data: Products[]) => {
        const moviesFiltered = cart.filter((itemCart) =>
          data.some((itemData) => itemData.id === itemCart.id)
        );
        // console.log("moviesFiltered: ", moviesFiltered);
        setFilmesDisponiveis(moviesFiltered);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });

    const searchTerm = encodeURIComponent(searchMovie);
    const newPath = `/${searchTerm}`;
    navigate(newPath);
  };

  const handleAddToCart = (product: Products) => {
    const filmesDisponiveisAtualizados: Products[] = filmesDisponiveis.map(
      (filmeAdicionado) => {
        if (filmeAdicionado.id === product.id) {
          return {
            ...filmeAdicionado,
            quantity: filmeAdicionado.quantity + 1,
          };
        }

        return filmeAdicionado;
      }
    );
    console.log("filmesDisponiveisAtualizados: ", filmesDisponiveisAtualizados);
    setFilmesDisponiveis(filmesDisponiveisAtualizados);
    addToCart(product);
  };

  return (
    <Container>
      <InputContainer>
        <Input value={searchMovie} onChange={handleInputChange} />
        <ButtonSearch disabled={!searchMovie} onClick={handleSearch}>
          <SearchIcon />
        </ButtonSearch>
      </InputContainer>
      <ProductCardsContainer>
        {filmesDisponiveis.map((product) => (
          <ProductCards key={product.id}>
            <ImageProduct src={product.image} alt={product.image} />
            <DetailProduct>
              <TitleProduct>{product.title}</TitleProduct>
              <PriceProduct>
                R${" "}
                {product.price.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </PriceProduct>
            </DetailProduct>
            <ButtonAddProduct
              colorAddCart={product.quantity}
              onClick={() => handleAddToCart(product)}
            >
              <IconBox>
                <IconAddCart />
                <QuantityProduct>{product.quantity ?? 0}</QuantityProduct>
              </IconBox>
              <TitleAddCard>ADICIONAR AO CARRINHO</TitleAddCard>
            </ButtonAddProduct>
          </ProductCards>
        ))}
      </ProductCardsContainer>
    </Container>
  );
}
