import React, { useState, useEffect } from "react";
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
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const newTotalItems = cart.reduce(
      (total, currentItem) => total + currentItem.quantity,
      0
    );

    setTotalItems(newTotalItems);
  }, [cart]);

  const handleClick = () => {
    console.log("cart: ", cart);
    // Ir para o 'meu carrinho'
  };

  return (
    <>
      <Container>
        <Title>WeMovies</Title>
        <BoxCart>
          <ItensCart>
            <Span>Meu Carrinho</Span>
            <Itens>{totalItems} itens</Itens>
          </ItensCart>
          <IconBag onClick={handleClick} />
        </BoxCart>
      </Container>
    </>
  );
}
