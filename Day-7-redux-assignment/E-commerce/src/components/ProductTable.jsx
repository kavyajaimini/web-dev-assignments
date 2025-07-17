import VirtualList from "./VirtualList.jsx";
import { useDispatch } from "react-redux";

export default function ProductTable({ products }) {
  const items = Array.isArray(products) ? products : [];
  const dispatch = useDispatch();
  const changeStock = (id, diff, curr) => {
    const stock = Math.max(0, curr + diff);
    dispatch({ type: "products/updateStock", payload: { id, stock } });
  };
  return (
    <div className="product-table-container">
      <div className="product-table-header">
        <span className="product-total">Total: {items.length}</span>
      </div>
      <div className="product-table-flex">
        <div className="product-table-row product-table-head">
          <div>ID</div>
          <div>Name</div>
          <div>Category</div>
          <div>Price</div>
          <div>Stock</div>
        </div>
        <VirtualList
          items={items}
          rowHeight={44}
          height={600}
          renderRow={(p) => (
            <div key={p.id} className="product-table-row">
              <div>{p.id}</div>
              <div>{p.name}</div>
              <div>{p.category}</div>
              <div>${p.price}</div>
              <div className="stock-controls">
                <button
                  onClick={() => changeStock(p.id, -1, p.stock)}
                  disabled={p.stock <= 0}
                >
                  -
                </button>
                <span>{p.stock}</span>
                <button onClick={() => changeStock(p.id, 1, p.stock)}>+</button>
              </div>
            </div>
          )}
        />
      </div>
      <style>{`
        .product-table-container {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 8px #0001;
          padding: 24px 32px;
          margin: 0 auto;
          max-width: 900px;
        }
        .product-table-header {
          margin-bottom: 12px;
          font-size: 1.1rem;
          font-weight: 500;
        }
        .product-table-flex {
          display: flex;
          flex-direction: column;
        }
        .product-table-row {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #eee;
          min-height: 44px;
        }
        .product-table-row > div {
          flex: 1;
          padding: 0 8px;
          text-align: left;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .product-table-head {
          font-weight: bold;
          background: #f7f7fa;
          border-bottom: 2px solid #e0e0e0;
        }
        .stock-controls {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .stock-controls button {
          background: #f2f4f8;
          border: none;
          border-radius: 4px;
          width: 28px;
          height: 28px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background 0.2s;
        }
        .stock-controls button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .stock-controls button:hover:not(:disabled) {
          background: #e3e8ef;
        }
      `}</style>
    </div>
  );
}
