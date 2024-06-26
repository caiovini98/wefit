import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Product } from "../../models/product";
import {
  Container,
  Input,
  ButtonSearch,
  InputContainer,
  SearchIcon,
  ProductCardsContainer,
  ProductCards,
  ImageProduct,
  DetailProduct,
  TitleProduct,
  PriceProduct,
  IconAddCart,
  IconBox,
  QuantityProduct,
  ButtonAddProduct,
  TitleAddCard,
  Title,
  ButtonReloadPage,
  Image,
  Spinner,
} from "./styles";

import NotFound from "../../assets/notfound.png";

export default function Home() {
  const navigate = useNavigate();
  const { addToCart, setCart, cart } = useCart();

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [searchMovie, setSearchMovie] = useState("");
  const [filmesDisponiveis, setFilmesDisponiveis] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao carregar os dados.");
        }
        return res.json();
      })
      .then((data: Product[]) => {
        const newData: Product[] = data.map((item) => ({
          ...item,
          quantity: 0,
        }));
        setCart(newData);
        setFilmesDisponiveis(newData);
        setLoadingData(false);
      })
      .catch((error) => {
        setLoadingData(true);
      });
  }, []);

  useEffect(() => {
    function handlePopState() {
      setLoading(true);
      const path = window.location.pathname;
      const searchTerm: string = path.split("/").pop() as string;

      fetch(`http://localhost:8000/products?q=${searchTerm}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro");
          }
          return response.json();
        })
        .then((data: Product[]) => {
          const moviesFiltered = cart.filter((itemCart) =>
            data.some((itemData) => itemData.id === itemCart.id)
          );
          setFilmesDisponiveis(moviesFiltered);
        })
        .catch((error) => {
          throw new Error("Erro ao buscar filmes");
        })
        .finally(() => {
          setLoading(false);
        });
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [cart, setFilmesDisponiveis]);

  const handleInputChange = (event: any) => {
    setSearchMovie(event.target.value);
  };

  const handleSearch = () => {
    setLoading(true);
    fetch(`http://localhost:8000/products?q=${searchMovie}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro");
        }
        return response.json();
      })
      .then((data: Product[]) => {
        const moviesFiltered = cart.filter((itemCart) =>
          data.some((itemData) => itemData.id === itemCart.id)
        );
        setFilmesDisponiveis(moviesFiltered);
      })
      .catch((error) => {
        throw new Error("Erro ao buscar filmes");
      })
      .finally(() => {
        setLoading(false);
      });

    const searchTerm = encodeURIComponent(searchMovie);
    const newPath = `/${searchTerm}`;
    navigate(newPath);
  };

  const handleAddToCart = (product: Product) => {
    const filmesDisponiveisAtualizados: Product[] = filmesDisponiveis.map(
      (filmeAdicionado) => {
        if (filmeAdicionado.id === product.id) {
          return {
            ...filmeAdicionado,
            quantity: filmeAdicionado.quantity + 1,
          };
        }

        return filmeAdicionado;
      }
    );
    setFilmesDisponiveis(filmesDisponiveisAtualizados);
    addToCart(product);
  };

  return (
    <>
      {loadingData ? (
        <Container loadingData={loadingData}>
          <Title>Parece que não há nada por aqui :(</Title>
          <Image src={NotFound} alt="image" />
          <ButtonReloadPage onClick={() => window.location.reload()}>
            Recarregar página
          </ButtonReloadPage>
        </Container>
      ) : (
        <Container loadingData={loadingData}>
          <InputContainer>
            <Input value={searchMovie} onChange={handleInputChange} />
            <ButtonSearch disabled={!searchMovie} onClick={handleSearch}>
              <SearchIcon />
            </ButtonSearch>
          </InputContainer>
          {loading ? (
            <Spinner>
              <TailSpin
                visible
                height="80"
                width="80"
                color="#FFFFFF"
                ariaLabel="tail-spin-loading"
                radius="1"
              />
            </Spinner>
          ) : (
            <ProductCardsContainer>
              {filmesDisponiveis.map((product) => (
                <ProductCards key={product.id}>
                  <ImageProduct src={product.image} alt={product.image} />
                  <DetailProduct>
                    <TitleProduct>{product.title}</TitleProduct>
                    <PriceProduct>
                      R${" "}
                      {product.price.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </PriceProduct>
                  </DetailProduct>
                  <ButtonAddProduct
                    colorAddCart={product.quantity}
                    onClick={() => handleAddToCart(product)}
                  >
                    <IconBox>
                      <IconAddCart />
                      <QuantityProduct>{product.quantity ?? 0}</QuantityProduct>
                    </IconBox>
                    <TitleAddCard>Adicionar ao carrinho</TitleAddCard>
                  </ButtonAddProduct>
                </ProductCards>
              ))}
            </ProductCardsContainer>
          )}
        </Container>
      )}
    </>
  );
}
