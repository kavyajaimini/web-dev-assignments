import React from "react";
import useSimulateRealtime from "../hooks/useSimulateRealtime";
import TenantSwitcher from "../components/TenantSwitcher";
import InventorySyncStatus from "../components/InventorySyncStatus";
import OrderQueueStatus from "../components/OrderQueueStatus";

import { useSelector } from "react-redux";
import ProductGrid from "../components/ProductGrid";
import "../components/ProductGrid.css";
import "../components/ProductCard.css";

import SearchBar from "../components/SearchBar";

export default function Dashboard() {
  useSimulateRealtime();
  const products = useSelector((s) => s.products.items);
  const [search, setSearch] = React.useState({ q: "", cat: "" });
  const cats = React.useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );
  const handleSearch = (params) => setSearch(params);
  const filtered = React.useMemo(() => {
    let out = products;
    if (search.cat) out = out.filter((p) => p.category === search.cat);
    if (search.q) {
      const q = search.q.toLowerCase();
      out = out.filter(
        (p) => p.name.toLowerCase().includes(q) || String(p.id).includes(q)
      );
    }
    if (search.stock && !isNaN(Number(search.stock))) {
      out = out.filter((p) => p.stock >= Number(search.stock));
    }
    return out;
  }, [products, search]);
  const totalProducts = products.length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: 32,
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h1 style={{ margin: 0 }}>One Stop Destination for your needs!</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <TenantSwitcher />
        </div>
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        <InventorySyncStatus />
        <OrderQueueStatus />
      </div>
      <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
        <div
          style={{
            flex: 1,
            background: "#f7f7fa",
            borderRadius: 8,
            padding: 20,
            boxShadow: "0 1px 6px #0001",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 700 }}>{totalProducts}</div>
          <div style={{ color: "#888" }}>Total Products</div>
        </div>
        <div
          style={{
            flex: 1,
            background: "#fff0f0",
            borderRadius: 8,
            padding: 20,
            boxShadow: "0 1px 6px #0001",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 700, color: "#c00" }}>
            {outOfStock}
          </div>
          <div style={{ color: "#c00" }}>Out of Stock</div>
        </div>
      </div>
      <SearchBar onSearch={handleSearch} categories={cats} />
      <ProductGrid products={filtered.slice(0, 40)} />
    </div>
  );
}
