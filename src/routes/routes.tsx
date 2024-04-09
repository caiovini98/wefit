import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Purchased from "../pages/Purchased/Purchased";
import ShoppingCart from "../pages/ShoppingCart/ShoppingCart";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/purchased" element={<Purchased />} />
      <Route path="/shopping-cart" element={<ShoppingCart />} />
    </Routes>
  );
};

export default AppRoutes;
