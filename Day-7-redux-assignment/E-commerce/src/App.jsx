import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import store from "./redux/store";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import NetworkStatusBanner from "./components/NetworkStatusBanner";

const navStyle = {
  display: "flex",
  gap: 32,
  padding: "18px 32px",
  background: "linear-gradient(90deg,#232526 0,#414345 100%)",
  color: "#fff",
  alignItems: "center",
  fontSize: 18,
  boxShadow: "0 2px 12px #0002",
  borderRadius: 0,
  marginBottom: 24,
};

const linkStyle = ({ isActive }) => ({
  color: isActive ? "#fff" : "#b0b0b0",
  background: isActive ? "#646cff" : "transparent",
  borderRadius: 6,
  padding: "6px 18px",
  textDecoration: "none",
  fontWeight: isActive ? 600 : 400,
  transition: "background 0.2s, color 0.2s",
});

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <NetworkStatusBanner />
          <nav style={navStyle}>
            <span style={{ fontWeight: 800, fontSize: 24, letterSpacing: 1 }}>
              E-Cart
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <NavLink to="/" style={linkStyle} end>
                Dashboard
              </NavLink>
              <NavLink to="/products" style={linkStyle}>
                Products
              </NavLink>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            {/* <Route path="/orders" element={<Orders />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}
