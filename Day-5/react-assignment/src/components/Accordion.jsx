import React, { useState } from "react";
import "./Accordion.css";
const data = [
  { title: "Q: How do I submit an assignment?", content: "A: Open your course, go to Assignments, and click Submit." },
  { title: "Q: Where can I find course materials?", content: "A: Course materials are available in the course dashboard." },
  { title: "Q: How do I contact my instructor?", content: "A: You can contact your instructor via the Messages tab." },
  { title: "Q: What should I do if I miss a class?", content: "A: You can catch up by reviewing the recorded lectures." },
  { title: "Q: How do I access my grades?", content: "A: Your grades are available in the Grades section of each course." },
];

function Accordion() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {data.map((item, i) => (
        <div key={i} className="accordion-section">
          <button
            className="accordion-btn"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span>{item.title}</span>
            <span className="accordion-arrow">{open === i ? "▲" : "▼"}</span>
          </button>
          {open === i && (
            <div className="accordion-content">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Accordion;
