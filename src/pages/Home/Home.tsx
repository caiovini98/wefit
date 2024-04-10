import React, { useState, useEffect } from "react";
import "./styles.css";
import { Products } from "../../models/products";

export default function Home() {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao carregar os dados.");
        }
        return res.json();
      })
      .then((data: Products[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro de rede:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ backgroundColor: "red" }}>
      <h1>Essta é a tela de Home</h1>
      {products.map((product) => (
        <h4>{product.title}</h4>
      ))}
    </div>
  );
}
