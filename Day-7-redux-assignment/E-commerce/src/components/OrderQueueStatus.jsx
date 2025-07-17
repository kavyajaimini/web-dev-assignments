import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { flushOffline } from "../redux/slices/orderSlice";

export default function OrderQueueStatus() {
  const queue = useSelector((s) => s.orders.offlineQueue);
  const dispatch = useDispatch();
  if (!queue?.length) return null;
  return (
    <div
      style={{
        background: "#ffe0e0",
        padding: "8px 16px",
        borderRadius: 6,
        margin: "8px 0",
        display: "inline-block",
      }}
    >
      <b>Offline Orders:</b> {queue.length}
      <button
        style={{ marginLeft: 12 }}
        onClick={() => dispatch(flushOffline())}
      >
        Flush
      </button>
    </div>
  );
}
