import React, { useState, useEffect } from "react";
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

  const handleInputChange = (event: any) => {
    setSearchMovie(event.target.value);
  };

  return (
    <Container>
      <InputContainer>
        <Input value={searchMovie} onChange={handleInputChange} />
        <ButtonSearch
          disabled={!searchMovie}
          onClick={() => console.log("clicou: ", searchMovie)}
        >
          <SearchIcon />
        </ButtonSearch>
      </InputContainer>
      <ProductCardsContainer>
        {products.map((product) => (
          <ProductCards>
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
