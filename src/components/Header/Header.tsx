import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();
  const route = location.pathname;
  const { cart, setMyCart } = useCart();
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const newTotalItems = cart.reduce(
      (total, currentItem) => total + currentItem.quantity,
      0
    );

    setTotalItems(newTotalItems);
  }, [cart]);

  const handleClick = () => {
    const cartFiltered = cart.filter((item) => item.quantity > 0);
    setMyCart(cartFiltered);
    if (totalItems > 0) {
      navigate("/shopping-cart");
    }
  };

  const goHome = () => {
    if (route === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <Container>
        <Title onClick={() => goHome()}>WeMovies</Title>
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
