import { createSlice } from "@reduxjs/toolkit";

const categoryImages = {
  Electronics: "https://m.media-amazon.com/images/I/71DozMyPCBL.jpg",
  Clothing:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK_j-gbGFRqwGAwhoXIIS_RLlEW78hIEu7GA&s", // fashion :contentReference[oaicite:2]{index=2}
  Books:
    "https://5.imimg.com/data5/SELLER/Default/2023/7/324405559/PW/WV/WJ/1578549/branded-dummy-fake-books-for-display.jpg",
  Home: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWrCmGrRc-lQra9UnYOMwFF2etnt6lr5wBQA&s",
  Toys: "https://www.chemicalsafetyfacts.org/wp-content/uploads/shutterstock_383521510-002-scaled.jpg",
  Sports:
    "https://images.unsplash.com/photo-1486286701208-1d58e9338013?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vdGJhbGx8ZW58MHx8MHx8fDA%3D",
  Beauty:
    "https://assets.vogue.com/photos/62f6a408b2e176a484ef7c6a/3:4/w_748%2Cc_limit/slide_15.jpg",
  Grocery:
    "https://www.shutterstock.com/image-photo/ripe-mango-isolated-on-white-260nw-2500576635.jpg",
  Automotive:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbsnkalcGaW_yCEpJNDoahkkWVwkAno6hFVA&s",
  Garden:
    "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1747403361-81X0RENBWpL.jpg?crop=0.760xw:0.760xh;0.135xw,0.218xh&resize=980:*",
};

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home",
  "Toys",
  "Sports",
  "Beauty",
  "Grocery",
  "Automotive",
  "Garden",
];

function generateDummyProducts(count = 10000) {
  const products = [];
  for (let i = 1; i <= count; i++) {
    const cat = categories[i % categories.length];
    products.push({
      id: i,
      name: `${cat} Product ${i}`,
      category: cat,
      price: +(Math.random() * 1000).toFixed(2),
      stock: Math.floor(Math.random() * 1000),
      updated: Date.now() - Math.floor(Math.random() * 1e7),
      img: categoryImages[cat],
    });
  }
  return products;
}

const initialState = {
  items: generateDummyProducts(),
  lastAudit: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateStock(state, { payload }) {
      const p = state.items.find((x) => x.id === payload.id);
      if (p) {
        p.stock = payload.stock;
        p.updated = Date.now();
        state.lastAudit.push({ id: p.id, stock: p.stock, time: p.updated });
      }
    },
    addProduct(state, { payload }) {
      state.items.push(payload);
    },
    removeProduct(state, { payload }) {
      state.items = state.items.filter((x) => x.id !== payload);
    },
  },
});

export const { updateStock, addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
