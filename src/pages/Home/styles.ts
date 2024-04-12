import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { LiaCartPlusSolid } from "react-icons/lia";

interface ButtonProps {
  colorAddCart: number;
}

interface ContainerProps {
  loadingData: boolean;
}

export const Title = styled.h1`
  text-align: center;
  color: ${(props) => props.theme.colors.primary};
  font-size: 28px;
`;

export const Image = styled.img``;

export const ButtonReloadPage = styled.button`
  height: 40px;
  width: 15%;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.color_button};
  color: ${(props) => props.theme.colors.secondary};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const Container = styled.div<ContainerProps>`
  min-height: ${({ loadingData }) => (loadingData ? "70vh" : "100vh")};
  background-color: ${({ theme, loadingData }) =>
    loadingData && theme.colors.secondary};

  ${({ loadingData }) =>
    loadingData &&
    `
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
  `}
`;

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 3rem;
`;

export const Input = styled.input.attrs({
  placeholder: "Buscar filme pelo nome",
})`
  width: 100%;
  height: 55px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  outline: none;

  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.color_button};
  }

  ::placeholder {
    color: ${(props) => props.theme.colors.itens};
    padding-left: 5px;
    font-size: 18px;
  }
`;

export const ButtonSearch = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
`;

export const SearchIcon = styled(IoIosSearch)`
  color: ${(props) => props.theme.colors.itens};
  font-size: 24px;
`;

export const Spinner = styled.div`
  display: flex;
  justify-content: center;
`;

export const ProductCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
`;

export const ProductCards = styled.div`
  height: 390px;
  width: 430px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const ImageProduct = styled.img`
  width: 160px;
  height: 180px;
`;

export const DetailProduct = styled.div`
  margin-top: -16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
`;

export const TitleProduct = styled.span`
  font-weight: bold;
  font-size: 16px;
`;

export const PriceProduct = styled.span`
  font-weight: bold;
  font-size: 19px;
`;

export const ButtonAddProduct = styled.button<ButtonProps>`
  height: 12%;
  width: 90%;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${({ theme, colorAddCart }) =>
    colorAddCart ? theme.colors.color_text : theme.colors.color_button};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

export const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const IconAddCart = styled(LiaCartPlusSolid)`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 20px;
`;

export const QuantityProduct = styled.span`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 12px;
`;

export const TitleAddCard = styled.span`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 14px;
  text-transform: uppercase;
`;
