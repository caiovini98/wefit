import styled from "styled-components";

export const Container = styled.div`
  min-height: 70vh;
  background-color: red;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

export const Title = styled.h1`
  text-align: center;
  color: ${(props) => props.theme.colors.primary};
  font-size: 28px;
`;

export const Image = styled.img``;

export const ButtonBack = styled.button`
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
  text-transform: uppercase;
`;
