import React from "react";
import { useNavigate } from "react-router-dom";

import { Container, Title, Image, ButtonBack } from "./styles";
import image from "../../assets/image.png";

export default function Purchased() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <Container>
      <Title>Compra realizada com sucesso!</Title>
      <Image src={image} alt="image" />
      <ButtonBack onClick={goHome}>Voltar</ButtonBack>
    </Container>
  );
}
