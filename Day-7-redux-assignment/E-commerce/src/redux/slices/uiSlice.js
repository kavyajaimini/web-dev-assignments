import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    loading: false,
    notification: null,
    dialog: null,
    online: true,
  },
  reducers: {
    setOnlineStatus(state, action) {
      state.online = action.payload;
    },
    notify(state, action) {
      state.notification = action.payload;
    },
    clearNotification(state) {
      state.notification = null;
    },
    showDialog(state, action) {
      state.dialog = action.payload;
    },
    closeDialog(state) {
      state.dialog = null;
    },
  },
});

export const {
  setOnlineStatus,
  notify,
  clearNotification,
  showDialog,
  closeDialog,
} = uiSlice.actions;

export default uiSlice.reducer;
