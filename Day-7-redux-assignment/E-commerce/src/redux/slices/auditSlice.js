
import { createSlice } from '@reduxjs/toolkit';

const auditSlice = createSlice({
  name: 'audit',
  initialState: [],
  reducers: {
    log(state, { payload }) {
      state.push({ ...payload, time: Date.now() });
    },
    clear(state) {
      return [];
    }
  }
});

export const { log, clear } = auditSlice.actions;
export default auditSlice.reducer;
