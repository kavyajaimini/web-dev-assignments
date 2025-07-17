import React from "react";
import { useDispatch } from "react-redux";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  return (
    <div className="product-card">
      <img src={product.img || "/vite.svg"} alt={product.name} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.category}</p>
        <div className="product-bottom">
          <span>${product.price}</span>
        </div>
      </div>
    </div>
  );
}
