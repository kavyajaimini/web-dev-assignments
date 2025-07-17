import React, { useState, useEffect } from "react";

export default function SearchBar({ onSearch, categories }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [stock, setStock] = useState("");
  useEffect(() => {
    onSearch && onSearch({ q, cat, stock });
  }, [q, cat, stock]);
  return (
    <form
      style={{
        display: "flex",
        gap: 8,
        margin: "16px 0",
        alignItems: "center",
      }}
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search products..."
        style={{
          flex: 1,
          padding: "8px 12px",
          borderRadius: 6,
          border: "1px solid #ddd",
        }}
      />
      {categories && (
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: 6 }}
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      )}
      <input
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        placeholder="Stock >="
        type="number"
        min="0"
        style={{
          width: 90,
          padding: "8px 12px",
          borderRadius: 6,
          border: "1px solid #ddd",
        }}
      />
      <button
        type="button"
        style={{
          background: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "8px 20px",
          fontWeight: 600,
          cursor: "pointer",
          transition: "background .2s",
        }}
        onClick={() => onSearch && onSearch({ q, cat, stock })}
      >
        Search
      </button>
    </form>
  );
}
