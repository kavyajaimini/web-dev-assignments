import React from 'react';
import { useSelector } from 'react-redux';

export default function NetworkStatusBanner() {
  const online = useSelector((state) => state.ui.online);

  if (online) return null;

  return (
    <div
      style={{
        background: '#ffe0e0',
        color: '#900',
        padding: '10px 20px',
        textAlign: 'center',
        fontWeight: 'bold',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      }}
    >
    You are offline. Changes won't sync.
    </div>
  );
}
