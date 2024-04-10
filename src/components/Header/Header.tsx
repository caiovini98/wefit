import React from "react";
import { useCart } from "../../context/CartContext";
import {
  Container,
  Title,
  BoxCart,
  ItensCart,
  Span,
  Itens,
  IconBag,
} from "./styles";

export default function HeaderComponent() {
  const { cart } = useCart();

  const handleClick = () => {
    console.log("cart: ", cart);
  };

  return (
    <>
      <Container>
        <Title>WeMovies</Title>
        <BoxCart>
          <ItensCart>
            <Span>Meu Carrinho</Span>
            <Itens>{cart.length} itens</Itens>
          </ItensCart>
          <IconBag onClick={handleClick} />
        </BoxCart>
      </Container>
    </>
  );
}
