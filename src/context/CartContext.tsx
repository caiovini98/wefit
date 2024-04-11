import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../models/product";

interface CartContextType {
  cart: Product[];
  myCart: Product[];
  addToCart: (item: Product) => void;
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  setMyCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  myCart: [],
  addToCart: (item: Product) => {},
  setCart: () => {},
  setMyCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [myCart, setMyCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    const hasProduct = cart.find((item) => item.id === product.id);

    if (hasProduct) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        setMyCart,
        myCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
