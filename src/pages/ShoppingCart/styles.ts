import styled from "styled-components";
import { IoAddCircleOutline } from "react-icons/io5";
import { GrSubtractCircle } from "react-icons/gr";
import { FaTrash } from "react-icons/fa";

interface Props {
  isMobileView: boolean;
}

export const Main = styled.main`
  margin-bottom: 25px;
`;

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 5px;
  padding: 22px;

  @media screen and (max-width: 790px) {
    /* Seu estilo para telas menores que 790x830 */
    margin-left: 10px;
    /* background-color: red; */
  }
`;

export const Section = styled.section`
  border-bottom: 1px solid;
  border-bottom-color: ${(props) => props.theme.colors.itens};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Thead = styled.thead``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: left;
  padding-bottom: 10px;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.itens};
`;

export const Td = styled.td`
  padding: 30px 0;
  color: ${(props) => props.theme.colors.black};
  font-size: 18px;
  font-weight: bold;
`;

export const Tbody = styled.tbody``;

export const ProductBox = styled.div`
  display: flex;
  align-items: center;
`;

export const Image = styled.img`
  border-radius: 6px;
  height: 120px;
  width: 100px;
`;

export const ProductInfo = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

export const ProductName = styled.span`
  font-size: 18px;
  margin-bottom: 10px;
  color: ${(props) => props.theme.colors.black};
  font-weight: bold;
`;

export const ProductPrice = styled.span`
  color: ${(props) => props.theme.colors.black};
  font-size: 22px;
  font-weight: bold;
`;

export const IncrementOrDecrementBox = styled.div`
  display: inline-flex;
  padding: 0 0;
  align-items: center;
  min-width: 60px;
  height: 30px;
`;

export const IncrementOrDecrementButton = styled.button<Props>`
  display: flex;
  align-items: center;
  background: transparent;
  border: 0;
  padding: ${({ isMobileView }) => (isMobileView ? "0 3px 0 0" : "0 10px")};
  font-size: ${({ isMobileView }) => (isMobileView ? "16px" : "20px")};
  height: 100%;
`;

export const IncrementOrDecrementInput = styled.input<Props>`
  width: ${({ isMobileView }) => (isMobileView ? "12%" : "18%")};
  text-align: center;
`;

export const RemoveButton = styled.button`
  border: 0;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

export const FinishBox = styled.section`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const FinishButton = styled.button`
  height: 35px;
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
  text-transform: uppercase;
`;

export const TotalBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Total = styled.span`
  color: ${(props) => props.theme.colors.itens};
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const PriceTotal = styled.span`
  color: ${(props) => props.theme.colors.black};
  font-size: 24px;
  font-weight: bold;
`;

export const AddIcon = styled(IoAddCircleOutline)`
  color: ${(props) => props.theme.colors.color_button};
  font-size: 24px;
  cursor: pointer;
`;

export const SubtractIcon = styled(GrSubtractCircle)`
  color: ${(props) => props.theme.colors.color_button};
  font-size: 24px;
  cursor: pointer;
`;

export const TrashIcon = styled(FaTrash)<Props>`
  color: ${(props) => props.theme.colors.color_button};
  font-size: ${({ isMobileView }) => (isMobileView ? "18px" : "24px")};
  cursor: pointer;
`;

// 790x830
