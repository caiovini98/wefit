import React, { useState, useEffect } from "react";
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

  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchMovie, setSearchMovie] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao carregar os dados.");
        }
        return res.json();
      })
      .then((data: Products[]) => {
        setProducts(data);
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
    setSearchMovie(decodeURIComponent(searchTerm));
  }

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleInputChange = (event: any) => {
    setSearchMovie(event.target.value);
  };

  const handleSearch = () => {
    console.log("searchMovie: ", searchMovie);
    fetch(`http://localhost:8000/products?q=${searchMovie}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar produtos");
        }
        return response.json();
      })
      .then((data: Products[]) => {
        console.log("Resultado da busca:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });

    const searchTerm = encodeURIComponent(searchMovie);
    const newPath = `/${searchTerm}`;
    navigate(newPath);
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
        {products.map((product) => (
          <ProductCards key={product.id}>
            <ImageProduct src={product.image} alt="Product" />
            <DetailProduct>
              <TitleProduct>{product.title}</TitleProduct>
              <PriceProduct>R$ {product.price}</PriceProduct>
            </DetailProduct>
            <ButtonAddProduct>
              <IconBox>
                <IconAddCart />
                <QuantityProduct>0</QuantityProduct>
              </IconBox>
              <TitleAddCard>ADICIONAR AO CARRINHO</TitleAddCard>
            </ButtonAddProduct>
          </ProductCards>
        ))}
      </ProductCardsContainer>
    </Container>
  );
}
