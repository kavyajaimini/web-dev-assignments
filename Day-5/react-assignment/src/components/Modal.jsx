import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import './Modal.css';

const Modal = ({ show, onClose, children }) => {
    const [submit, setSubmit] = useState(false);
  if (!show) return null;

  const handleClick=(e)=>{
    if(e.target.className === "modalContainer"){
        onClose();
    }
  };
  const handleSubmit=()=>{
    setSubmit(true);
    setTimeout(()=>{
        setSubmit(false);
    },2000);
  };
  return ReactDOM.createPortal(
    <div className="modalContainer" onClick={handleClick}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header className="modal_header">
          <h2 className="modal_header-title">Are you sure you want to Submit this?</h2>
          <button className="close" onClick={onClose}>
            x
          </button>
        </header>

        <main className="modal_content">{children}</main>
        <footer className="modal_footer">
          <button className="modal-close" onClick={onClose}>
            Cancel
          </button>
          <button className="submit" onClick={handleSubmit}>Submit</button>
        </footer>

        {submit && <div className="toast">Submitted Successfully!</div>}
      </div>

    </div>,
    document.getElementById("modal-root")
  );
};
export default Modal;
