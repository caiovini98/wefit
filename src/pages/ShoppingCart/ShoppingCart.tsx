import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Main,
  Container,
  Section,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  ProductBox,
  Image,
  ProductInfo,
  ProductName,
  ProductPrice,
  IncrementOrDecrementBox,
  IncrementOrDecrementButton,
  IncrementOrDecrementInput,
  RemoveButton,
  FinishBox,
  FinishButton,
  TotalBox,
  Total,
  PriceTotal,
  AddIcon,
  SubtractIcon,
  TrashIcon,
} from "./styles";

import { useCart } from "../../context/CartContext";

export default function ShoppingCart() {
  const navigate = useNavigate();
  const { myCart, setMyCart } = useCart();

  const [quantities, setQuantities] = useState(
    myCart.map((cartItem) => cartItem.quantity)
  );

  console.log("quantities: ", quantities);

  const handleIncrement = (index: number) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] += 1;
    setQuantities(updatedQuantities);
  };

  const handleDecrement = (index: number) => {
    const updatedQuantities = [...quantities];
    if (updatedQuantities[index] > 0) {
      updatedQuantities[index] -= 1;
      setQuantities(updatedQuantities);
    }
  };

  const handleRemoveItem = (index: number) => {
    const myCartFiltered = myCart.filter((item) => item.id !== index);
    setMyCart(myCartFiltered);
  };

  const moneyMask = (price: number, quantity: number) => {
    const totalFinale = price * quantity;

    return totalFinale.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  };

  const calculatePriceTotal = () => {
    let priceTotal = 0;
    myCart.forEach((cartItem, index) => {
      priceTotal += cartItem.price * quantities[index];
    });

    return priceTotal;
  };

  return (
    <Main>
      <Container>
        <Section>
          <Table>
            <Thead>
              <Tr>
                <Th>Produto</Th>
                <Th>Qtd</Th>
                <Th>Subtotal</Th>
              </Tr>
            </Thead>
            {myCart.map((cartItem, index) => (
              <Tbody>
                <Tr key={cartItem.id}>
                  <Td>
                    <ProductBox>
                      <Image src={cartItem.image} alt={cartItem.image} />
                      <ProductInfo>
                        <ProductName>{cartItem.title}</ProductName>
                        <ProductPrice>
                          R${" "}
                          {cartItem.price.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </ProductPrice>
                      </ProductInfo>
                    </ProductBox>
                  </Td>
                  <Td>
                    <IncrementOrDecrementBox>
                      <IncrementOrDecrementButton
                        onClick={() => handleDecrement(index)}
                      >
                        <SubtractIcon />
                      </IncrementOrDecrementButton>
                      <IncrementOrDecrementInput
                        value={quantities[index]}
                        readOnly
                      />
                      <IncrementOrDecrementButton
                        onClick={() => handleIncrement(index)}
                      >
                        <AddIcon />
                      </IncrementOrDecrementButton>
                    </IncrementOrDecrementBox>
                  </Td>
                  <Td>R$ {moneyMask(cartItem.price, quantities[index])}</Td>
                  <Td>
                    <RemoveButton onClick={() => handleRemoveItem(cartItem.id)}>
                      <TrashIcon />
                    </RemoveButton>
                  </Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </Section>
        <FinishBox>
          <FinishButton>Finalizar pedido</FinishButton>
          <TotalBox>
            <Total>Total</Total>
            <PriceTotal>
              R${" "}
              {calculatePriceTotal().toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </PriceTotal>
          </TotalBox>
        </FinishBox>
      </Container>
    </Main>
  );
}
