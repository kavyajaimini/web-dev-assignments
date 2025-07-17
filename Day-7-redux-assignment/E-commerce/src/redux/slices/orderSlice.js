import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    offlineQueue: [],
    lastAudit: [],
  },
  reducers: {
    addOrder(state, { payload }) {
      state.items.push(payload);
      state.lastAudit.push({ type: 'add', id: payload.id, time: Date.now() });
    },
    updateOrder(state, { payload }) {
      const o = state.items.find(x => x.id === payload.id);
      if (o) {
        Object.assign(o, payload);
        state.lastAudit.push({ type: 'update', id: o.id, time: Date.now() });
      }
    },
    removeOrder(state, { payload }) {
      state.items = state.items.filter(x => x.id !== payload);
      state.lastAudit.push({ type: 'remove', id: payload, time: Date.now() });
    },
    queueOffline(state, { payload }) {
      state.offlineQueue.push(payload);
    },
    flushOffline(state) {
      state.offlineQueue = [];
    }
  }
});

export const { addOrder, updateOrder, removeOrder, queueOffline, flushOffline } = orderSlice.actions;
export default orderSlice.reducer;
