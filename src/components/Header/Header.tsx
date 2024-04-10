import React from "react";
import {
  Container,
  Title,
  BoxCart,
  ItensCart,
  Span,
  Itens,
  Teste,
} from "./styles";

export default function HeaderComponent() {
  return (
    <>
      <Container>
        <Title>WeMovies</Title>
        <BoxCart>
          <ItensCart>
            <Span>Meu Carrinho</Span>
            <Itens>0 itens</Itens>
          </ItensCart>
          <Teste />
        </BoxCart>
      </Container>
    </>
  );
}
