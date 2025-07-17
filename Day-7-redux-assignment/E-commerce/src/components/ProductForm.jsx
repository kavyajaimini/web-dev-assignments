import React, { useState } from "react";

export default function ProductForm({
  open,
  onClose,
  onSave,
  product,
  categories,
}) {
  const [form, setForm] = useState(
    product || { name: "", category: "", price: "", stock: "", img: "" }
  );
  if (!open) return null;
  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "#0006",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 10,
          minWidth: 320,
          boxShadow: "0 4px 32px #0003",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <h2>{product ? "Edit" : "Add"} Product</h2>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories?.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          min="0"
          required
        />
        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          type="number"
          min="0"
          required
        />
        <input
          name="img"
          value={form.img}
          onChange={handleChange}
          placeholder="Image URL (optional)"
        />
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
