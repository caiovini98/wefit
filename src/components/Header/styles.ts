import styled from "styled-components";
import { BsBagPlus } from "react-icons/bs";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.2rem;
  margin-bottom: 2rem;
`;

export const Title = styled.span`
  color: ${(props) => props.theme.colors.secondary};
  font-weight: bold;
  font-size: 20px;
`;

export const BoxCart = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

export const ItensCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Span = styled.span`
  color: ${(props) => props.theme.colors.secondary};
`;

export const Itens = styled.span`
  color: ${(props) => props.theme.colors.itens};
`;

export const IconBag = styled(BsBagPlus)`
  color: ${(props) => props.theme.colors.secondary};
  font-size: 24px;
  cursor: pointer;
`;
