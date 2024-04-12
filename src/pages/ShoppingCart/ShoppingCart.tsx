import React, { useEffect, useState } from "react";
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
  SectionMobile,
  ImageMobile,
  InfoCartMobile,
  TitleBoxMobile,
  TitleMobile,
  CartPriceBoxMobile,
  SubtotalBoxMobile,
  FinishBoxMobile,
  IncrementOrDecrementBoxMobile,
  SubtotalMobile,
  PriceMobile,
  Divider,
  TotalBoxMobile,
} from "./styles";

import { useCart } from "../../context/CartContext";

export default function ShoppingCart() {
  const navigate = useNavigate();
  const { myCart, setMyCart } = useCart();

  const [quantities, setQuantities] = useState(
    myCart.map((cartItem) => cartItem.quantity)
  );
  const [isMobileView, setIsMobileView] = useState(false);

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

  const handleChangePage = () => {
    navigate("/purchased");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 790);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Main>
      <Container>
        {isMobileView ? (
          <>
            {myCart.map((cartItem, index) => (
              <>
                <SectionMobile key={cartItem.id}>
                  <ImageMobile src={cartItem.image} alt={cartItem.image} />
                  <InfoCartMobile>
                    <TitleBoxMobile>
                      <TitleMobile>{cartItem.title}</TitleMobile>
                      <CartPriceBoxMobile>
                        <ProductPrice isMobileView={isMobileView}>
                          R${" "}
                          {cartItem.price.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </ProductPrice>
                        <TrashIcon isMobileView={isMobileView} />
                      </CartPriceBoxMobile>
                    </TitleBoxMobile>
                    <FinishBoxMobile>
                      <IncrementOrDecrementBoxMobile>
                        <IncrementOrDecrementButton
                          isMobileView={isMobileView}
                          onClick={() => handleDecrement(index)}
                        >
                          <SubtractIcon />
                        </IncrementOrDecrementButton>
                        <IncrementOrDecrementInput
                          isMobileView={isMobileView}
                          value={quantities[index]}
                          readOnly
                        />
                        <IncrementOrDecrementButton
                          isMobileView={isMobileView}
                          onClick={() => handleIncrement(index)}
                        >
                          <AddIcon />
                        </IncrementOrDecrementButton>
                      </IncrementOrDecrementBoxMobile>
                      <SubtotalBoxMobile>
                        <SubtotalMobile>Subtotal</SubtotalMobile>
                        <PriceMobile>
                          R$ {moneyMask(cartItem.price, quantities[index])}
                        </PriceMobile>
                      </SubtotalBoxMobile>
                    </FinishBoxMobile>
                  </InfoCartMobile>
                </SectionMobile>
              </>
            ))}
            <Divider />
            <TotalBoxMobile>
              <Total>Total</Total>
              <PriceTotal>
                R${" "}
                {calculatePriceTotal().toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </PriceTotal>
            </TotalBoxMobile>
            <FinishButton
              isMobileView={isMobileView}
              onClick={handleChangePage}
            >
              Finalizar pedido
            </FinishButton>
          </>
        ) : (
          <>
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
                            <ProductPrice isMobileView={isMobileView}>
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
                            isMobileView={isMobileView}
                            onClick={() => handleDecrement(index)}
                          >
                            <SubtractIcon />
                          </IncrementOrDecrementButton>
                          <IncrementOrDecrementInput
                            isMobileView={isMobileView}
                            value={quantities[index]}
                            readOnly
                          />
                          <IncrementOrDecrementButton
                            isMobileView={isMobileView}
                            onClick={() => handleIncrement(index)}
                          >
                            <AddIcon />
                          </IncrementOrDecrementButton>
                        </IncrementOrDecrementBox>
                      </Td>
                      <Td>R$ {moneyMask(cartItem.price, quantities[index])}</Td>
                      <Td>
                        <RemoveButton
                          onClick={() => handleRemoveItem(cartItem.id)}
                        >
                          <TrashIcon isMobileView={isMobileView} />
                        </RemoveButton>
                      </Td>
                    </Tr>
                  </Tbody>
                ))}
              </Table>
            </Section>
            <FinishBox>
              <FinishButton
                isMobileView={isMobileView}
                onClick={handleChangePage}
              >
                Finalizar pedido
              </FinishButton>
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
          </>
        )}
      </Container>
    </Main>
  );
}
