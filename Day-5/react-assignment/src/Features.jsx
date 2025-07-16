import React, { useEffect, useState } from "react";
import Modal from "./components/Modal";
import Accordion from "./components/Accordion";
import AutoComplete from "./components/AutoComplete";
import InfiniteScroll from "./components/InfiniteScroll";
import "./Features.css";


const Features = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const limit = 10;
  const totalProducts = 100;

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => setProductSuggestions(data.products.map(item => item.title)))
      .catch(() => {});
  }, []);

  const fetchMoreProducts = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const skip = (page - 1) * limit;
      const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
      const data = await res.json();
      setProducts(prev => [...prev, ...data.products]);
      setPage(prev => prev + 1);
      if (products.length + data.products.length >= totalProducts) setHasMore(false);
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMoreProducts(); }, []);

  return (
    <div className="features-container">
      <h2 className="features-title">React Feature Board</h2>
      <button className="features-modal-btn" onClick={() => setModalOpen(true)}>
        Open Modal
      </button>
      <Modal show={isModalOpen} onClose={() => setModalOpen(false)}>
        <p>This is a modal.</p>
      </Modal>

      <section className="features-section">
        <h3>Accordion</h3>
        <Accordion />
      </section>

      <section className="features-section">
        <h3>AutoComplete Functionality</h3>
        <AutoComplete data={productSuggestions} />
      </section>

      <section className="features-section">
        <h3>Infinite Scroll</h3>
        <div className="features-infinite-scroll">
          <InfiniteScroll fetchMoreData={fetchMoreProducts} hasMore={hasMore} loading={loading}>
            <ul className="features-product-list">
              {products.map(product => (
                <li key={product.id} className="features-product-item">
                  <strong>{product.title}</strong>
                  <div className="features-product-desc">{product.description}</div>
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        </div>
      </section>
    </div>
  );
};

export default Features;
