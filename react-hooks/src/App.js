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
      <h1>React-Hooks</h1>
      <div>
        {[
          "LocalStorage",
          "Debounce",
          "Fetch",
          "Counter",
          "Previous",
          "Toggle",
        ].map((demo) => (
          <button
            key={demo}
            onClick={() => setActive(demo)}
            style={{
              marginRight: '10px',
              padding: '8px 12px',
              backgroundColor: active === demo ? '#3b4cccff' : '#f0f0f0',
              border: '1px solid #ccc',
              borderRadius: "4px",
              color : active === demo ? 'white' : 'black',
              cursor : 'pointer',
            }}
          >
            {demo}
          </button>
        ))}
      </div>
      <div>{renderComp()}</div>
    </div>
  );
}
export default App;
