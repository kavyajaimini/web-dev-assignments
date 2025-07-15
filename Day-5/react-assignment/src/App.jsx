import React, { useEffect, useState } from "react";
import Modal from "./components/Modal";
import AutoComplete from "./components/AutoComplete";

function App(){
  const [isModalOpen, setModalOpen] = useState(false);
  const [productSuggestions, setProductSuggestions] = useState([]);


  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        const title = data.products.map((item)=>item.title);
        setProductSuggestions(title);
      }
      catch(err){
        console.error("Failed to fetch product!",err);
      }
    };
    fetchData();
  },[]);
  return ( <div style={{padding: "2rem", textAlign:"center", margin:"0 auto" }}>
    <h1 style={{fontSize: "2rem", fontWeight:"500",marginBottom:"1.5rem"}}>Modal Functionality</h1>
    <button style={{padding: "12px 25px",marginTop:"20px", borderRadius: "8px" ,cursor: "pointer", backgroundColor: "turquoise"}} onClick={()=> setModalOpen(true) }>Open the Modal</button>
    <h1 style={{marginTop:"3rem", fontSize: "2rem", marginBottom: "1rem" }}>AutoComplete Functionality</h1>
    <Modal show={isModalOpen} onClose={()=> setModalOpen(false)}>
      <p>So, this is a modal content which is reusable.</p>
    </Modal>
    <div style={{display: "flex", justifyContent:"center"}}>
      <AutoComplete data={productSuggestions}/>
    </div>
  </div>
  );
}
export default App;