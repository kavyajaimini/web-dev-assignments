import React, { useState } from "react";
import LocalStorage from "./components/LocalStorage";
import Debounce from "./components/Debounce";
import Previous from "./components/Previous";
import Toggle from "./components/Toggle";
import Fetch from "./components/Fetch";
import Counter from "./components/Counter";

const comp = [
  "LocalStorage",
  "Debounce",
  "Fetch",
  "Counter",
  "Previous",
  "Toggle",
];

function App() {
  const [active, setActive] = useState("LocalStorage");

  const renderComp = () => {
    switch (active) {
      case "LocalStorage":
        return <LocalStorage />;
      case "Debounce":
        return <Debounce />;
      case "Previous":
        return <Previous />;
      case "Toggle":
        return <Toggle />;
      case "Fetch":
        return <Fetch />;
      case "Counter":
        return <Counter />;
      default:
        return <LocalStorage />;
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#3b4cccff" }}>
        React-Hooks
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", marginBottom: "20px" }}>
        {comp.map((demo) => (
          <button
            key={demo}
            onClick={() => setActive(demo)}
            style={{
              margin: "8px",
              padding: "10px 16px",
              backgroundColor: active === demo ? "#3b4cccff" : "#ffffff",
              color: active === demo ? "white" : "#3b4cccff",
              border: "2px solid #3b4cccff",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "14px",
              transition: "all 0.2s ease-in-out",
              cursor: "pointer",
              boxShadow: active === demo ? "0 4px 10px rgba(0,0,0,0.1)" : "none",
            }}
          >
            {demo}
          </button>
        ))}
      </div>
      <div style={{ marginTop: "20px" }}>{renderComp()}</div>
    </div>
  );
}

export default App;
