import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.css";
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
  const location = useLocation();
  const { addToCart, setCart, cart } = useCart();

  // const [products, setProducts] = useState<Products[]>([]);
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
    const searchTerm = decodeURIComponent(
      location.pathname.split("/").pop() as string
    );
    setSearchMovie(searchTerm);
  }, [location.pathname]);

  function handlePopState() {
    const path = window.location.pathname;
    const searchTerm: string = path.split("/").pop() as string;

    // Se der BO, é só apagar aqui
    fetch(`http://localhost:8000/products?q=${searchTerm}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }
        return response.json();
      })
      .then((data: Products[]) => {
        const newData: Products[] = data.map((item) => ({
          ...item,
          quantity: 0,
        }));
        const arrayAtualizado = newData.map((novo) => {
          const existente = cart.find((elemento) => elemento.id === novo.id);
          if (existente) {
            return { ...novo, quantity: existente.quantity };
          }
          return novo;
        });

        setCart(arrayAtualizado);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  }

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

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
        const terceiroArray = cart.filter((item2) =>
          data.some((item1) => item1.id === item2.id)
        );
        // updateCartWithSearchResults(data);
        console.log("terceiroArray: ", terceiroArray);
        setFilmesDisponiveis(terceiroArray);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });

    const searchTerm = encodeURIComponent(searchMovie);
    const newPath = `/${searchTerm}`;
    navigate(newPath);
  };

  const handleAddToCart = (product: Products) => {
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
            <ImageProduct src={product.image} alt="Product" />
            <DetailProduct>
              <TitleProduct>{product.title}</TitleProduct>
              <PriceProduct>R$ {product.price}</PriceProduct>
            </DetailProduct>
            <ButtonAddProduct onClick={() => handleAddToCart(product)}>
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
