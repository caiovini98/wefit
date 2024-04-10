import styled from "styled-components";
import { IoIosSearch } from "react-icons/io";
import { LiaCartPlusSolid } from "react-icons/lia";

export const Container = styled.div`
  min-height: 100vh;
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

export const ProductCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

export const ProductCards = styled.div`
  height: 300px;
  width: 330px;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const ImageProduct = styled.img`
  width: 140px;
  height: 160px;
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
  font-size: 12px;
`;

export const PriceProduct = styled.span`
  font-weight: bold;
  font-size: 15px;
`;

export const ButtonAddProduct = styled.button`
  height: 12%;
  width: 90%;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.color_button};
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
`;