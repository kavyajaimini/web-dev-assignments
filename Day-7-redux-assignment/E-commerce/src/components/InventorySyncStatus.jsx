import React from "react";
import { useSelector } from "react-redux";

export default function InventorySyncStatus({ lastSync }) {
  const online = useSelector((s) => s.ui?.online ?? true);
  const sync = lastSync || new Date().toLocaleString();
  return (
    <div
      style={{
        padding: "8px 16px",
        background: online ? "#e0ffe0" : "#ffe0e0",
        borderRadius: 6,
        display: "inline-block",
        margin: "8px 0",
      }}
    >
      <b>Status:</b> {online ? "Online" : "Offline"}
      <span style={{ marginLeft: 16 }}>
        <b>Last Sync:</b> {sync}
      </span>
    </div>
  );
}
