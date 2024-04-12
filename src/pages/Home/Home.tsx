import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Product } from "../../models/product";
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
  Title,
  ButtonReloadPage,
  Image,
} from "./styles";

import NotFound from "../../assets/notfound.png";

export default function Home() {
  const navigate = useNavigate();
  const { addToCart, setCart, cart } = useCart();

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [searchMovie, setSearchMovie] = useState("");
  const [filmesDisponiveis, setFilmesDisponiveis] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => {
        if (!res.ok) {
          console.log("erro aqui");
          throw new Error("Erro ao carregar os dados.");
        }
        return res.json();
      })
      .then((data: Product[]) => {
        const newData: Product[] = data.map((item) => ({
          ...item,
          quantity: 0,
        }));
        console.log("newData: ", newData);
        setCart(newData);
        setFilmesDisponiveis(newData);
        setLoadingData(false);
      })
      .catch((error) => {
        console.error("Erro de rede:", error);
        setLoadingData(true);
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
        .then((data: Product[]) => {
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
      .then((data: Product[]) => {
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

  const handleAddToCart = (product: Product) => {
    const filmesDisponiveisAtualizados: Product[] = filmesDisponiveis.map(
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
    <>
      {loadingData ? (
        <Container loadingData={loadingData}>
          <Title>Parece que não há nada por aqui :(</Title>
          <Image src={NotFound} alt="image" />
          <ButtonReloadPage onClick={() => window.location.reload}>
            Recarregar página
          </ButtonReloadPage>
        </Container>
      ) : (
        <Container loadingData={loadingData}>
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
                  <TitleAddCard>Adicionar ao carrinho</TitleAddCard>
                </ButtonAddProduct>
              </ProductCards>
            ))}
          </ProductCardsContainer>
        </Container>
      )}
    </>
  );

  // return ;
}
