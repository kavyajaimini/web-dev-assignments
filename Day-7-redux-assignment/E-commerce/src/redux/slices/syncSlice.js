import { createSlice } from '@reduxjs/toolkit';

const syncSlice = createSlice({
  name: 'sync',
  initialState: { queue: [] },
  reducers: {
    addToQueue(state, { payload }) {
      state.queue.push(payload);
    },
    removeFromQueue(state, { payload }) {
      state.queue = state.queue.filter(o => o.id !== payload);
    },
    clearQueue(state) {
      state.queue = [];
    },
  },
});

export const { addToQueue, removeFromQueue, clearQueue } = syncSlice.actions;
export default syncSlice.reducer;
