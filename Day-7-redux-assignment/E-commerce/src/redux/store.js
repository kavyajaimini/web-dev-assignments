
import { configureStore } from '@reduxjs/toolkit';
import products from './slices/productSlice';
import user from './slices/userSlice';
import orders from './slices/orderSlice';
import audit from './slices/auditSlice';
import ui from './slices/uiSlice';
import auditLogger from './middleware/auditLogger';


const store = configureStore({
  reducer: { products, user, orders, audit, ui },
  middleware: g => g().concat(auditLogger)
});

export default store;
