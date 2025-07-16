
import React, { useState, useEffect } from "react";
import useCounter from "./hooks/useCounter";
import useToggle from "./hooks/useToggle";
import usePrevious from "./hooks/usePrevious";
import useLocalStorage from "./hooks/useLocalStorage";
import useDebounce from "./hooks/useDebounce";
import useFetch from "./hooks/useFetch";
import Modal from "./components/Modal";
import Accordion from "./components/Accordion";
import AutoComplete from "./components/AutoComplete";
import InfiniteScroll from "./components/InfiniteScroll";
import "./Dashboard.css";

const schedule = [
  { time: "9:00 AM", subject: "Data Structures", instructor: "Prof.Mehta" },
  { time: "11:00 AM", subject: "Operating Systems", instructor: "Dr.RK Singh" },
  { time: "2:00 PM", subject: "DBMS", instructor: "Ms.Richa" },
];

const Dashboard = () => {
  const { count: attendance, increment, decrement, reset } = useCounter(92);
  const prevAttendance = usePrevious(attendance);
  const [dark, toggleDark] = useToggle(false);
  const [note, setNote] = useLocalStorage("student-note", "");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 600);
  const { data, loading, error } = useFetch(
    debouncedSearch ? `https://api.github.com/users/${debouncedSearch}` : null
  );


  const [isModalOpen, setModalOpen] = useState(false);
  const [productSuggestions, setProductSuggestions] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const limit = 10;
  const totalProducts = 100;

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => setProductSuggestions(data.products.map(item => item.title)))
      .catch(() => {});
  }, []);

  const fetchMoreProducts = async () => {
    if (loadingProducts) return;
    setLoadingProducts(true);
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
      setLoadingProducts(false);
    }
  };

  useEffect(() => { fetchMoreProducts(); }, []);


  const links = [
    "Dashboard",
    "My Courses",
    "Assignments",
    "Progress",
    "Messages"
  ];

  return (
    <div className={`dashboard${dark ? " dark" : ""}`}>
      <aside className="sidebar">
        <h2 className="logo">EduWeb</h2>
        <nav>
          <ul>
            {links.map(link => (
              <li key={link}><a href="#">{link}</a></li>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="main">
        <header className="header">
          <div className="welcome">Hey, <strong>Student</strong></div>
          <button
            className={`theme-toggle-btn${!dark ? " light" : ""}`}
            onClick={toggleDark}
            style={{ marginLeft: "auto" }}
          >
            {dark ? "☀️ " : "🌙"}
          </button>
        </header>
        <section className="content">
          {[
            { title: "Active Courses", value: 2, },
            { title: "Assignments Due", value: 2, },
            {
              title: "Attendance",
              value: attendance + "%",
              extra: (
                <>
                  <div style={{ fontSize: 12, color: "#888" }}>
                    {prevAttendance !== undefined && `Last: ${prevAttendance}%`}
                  </div>
                  <div className="dashboard-counter-btns" style={{ marginTop: 8 }}>
                    <button onClick={increment}>+1</button>
                    <button onClick={decrement}>-1</button>
                    <button onClick={reset}>Reset</button>
                  </div>
                </>
              ),
            },
            { title: "CGPA", value: 8.0 },
          ].map(card => (
            <div className="card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.value}</p>
              <span>{card.icon}</span>
              {card.extra}
            </div>
          ))}
        </section>
        <section className="extra-content">
          <div className="summary-box">
            <h2>Welcome back, Student!</h2>
            <p>Don't forget to complete your assignments and check your schedule.</p>
          </div>
          <div className="schedule-table">
            <h3>Today’s Classes</h3>
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Subject</th>
                  <th>Instructor</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((row, i) => (
                  <tr key={i}>
                    <td>{row.time}</td>
                    <td>{row.subject}</td>
                    <td>{row.instructor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="extra-content">
          <div className="summary-box">
            <button className="features-modal-btn" onClick={() => setModalOpen(true)}>
              Quick Info
            </button>
            <Modal show={isModalOpen} onClose={() => setModalOpen(false)}>
              <p>Stay on track! Check your assignments.</p>
            </Modal>
          </div>
          <div className="summary-box">
            <h3>Course FAQs</h3>
            <Accordion />
          </div>
          <div className="summary-box">
            <h3>Find a Course</h3>
            <AutoComplete data={productSuggestions} />
          </div>
          <div className="summary-box">
            <h3>My Notes</h3>
            <textarea
              className="dashboard-note"
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={3}
              placeholder="Homework, reminders, ..."
            />
            <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
              (Auto-saved)
            </div>
          </div>
          <div className="summary-box">
            <h3>Find a Classmate</h3>
            <input
              className="dashboard-search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Type a username..."
            />
            {debouncedSearch && (
              <div style={{ marginTop: 12 }}>
                {loading && <span>Loading...</span>}
                {error && <span style={{ color: "tomato" }}>{error}</span>}
                {data && !data.message && (
                  <div className="dashboard-user">
                    <img src={data.avatar_url} alt="avatar" width={40} />
                    <div>
                      <div><strong>{data.login}</strong></div>
                      <div style={{ fontSize: 13 }}>{data.name || "No name"}</div>
                      <a href={data.html_url} target="_blank" rel="noopener noreferrer">Profile ↗</a>
                    </div>
                  </div>
                )}
                {data && data.message && (
                  <span style={{ color: "tomato" }}>User not found</span>
                )}
              </div>
            )}
          </div>
        </section>
        <section className="extra-content">
          <div className="summary-box">
            <h3>Explore More Courses</h3>
            <div className="features-infinite-scroll">
              <InfiniteScroll fetchMoreData={fetchMoreProducts} hasMore={hasMore} loading={loadingProducts}>
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
          </div>
        </section>
        <footer className="footer">
          <p>&copy; 2025 EduWeb</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
