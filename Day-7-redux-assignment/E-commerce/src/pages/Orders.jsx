import React from "react";
import { useSelector } from "react-redux";

export default function Orders() {
  const orders = useSelector((s) => s.orders?.items || []);

  if (!orders.length) {
    return <div style={{ padding: 32 }}>No orders yet.</div>;
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 32 }}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: 16 }}>Orders</h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 2px 12px #0001",
        }}
      >
        <thead>
          <tr style={{ background: "#f7f7fa", textAlign: "left" }}>
            <th style={{ padding: 12 }}>ID</th>
            <th style={{ padding: 12 }}>Customer</th>
            <th style={{ padding: 12 }}>Status</th>
            <th style={{ padding: 12 }}>Total</th>
            <th style={{ padding: 12 }}>Updated</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: 12 }}>{o.id}</td>
              <td style={{ padding: 12 }}>{o.customer || "-"}</td>
              <td style={{ padding: 12 }}>{o.status || "-"}</td>
              <td style={{ padding: 12 }}>${o.total || 0}</td>
              <td style={{ padding: 12 }}>
                {o.updated ? new Date(o.updated).toLocaleString() : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
