import React, { createContext, useContext, useState, ReactNode } from "react";
import { Products } from "../models/products";

interface CartContextType {
  cart: Products[];
  myCart: Products[];
  addToCart: (item: Products) => void;
  setCart: React.Dispatch<React.SetStateAction<Products[]>>;
  setMyCart: React.Dispatch<React.SetStateAction<Products[]>>;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  myCart: [],
  addToCart: (item: Products) => {},
  setCart: () => {},
  setMyCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Products[]>([]);
  const [myCart, setMyCart] = useState<Products[]>([]);

  const addToCart = (product: Products) => {
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
