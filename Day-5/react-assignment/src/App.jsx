

import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Features from "./Features";
import "./App.css";

function App() {
  const [showFeatures, setShowFeatures] = useState(false);

  if (showFeatures) return <Features />;

  return (
    <>
      <Dashboard />
      <button
        onClick={() => setShowFeatures(true)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          padding: '12px 22px',
          borderRadius: 8,
          background: '#0070f3',
          color: '#fff',
          border: 'none',
          fontWeight: 500,
          fontSize: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          cursor: 'pointer',
          zIndex: 1000
        }}
        aria-label="Show Features"
      >
        See All Features
      </button>
    </>
  );
}

export default App;
