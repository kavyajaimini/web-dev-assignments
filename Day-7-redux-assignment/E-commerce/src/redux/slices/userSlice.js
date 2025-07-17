
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    name: '',
    tenant: 'default',
    loggedIn: false
  },
  reducers: {
    login(state, { payload }) {
      state.id = payload.id;
      state.name = payload.name;
      state.tenant = payload.tenant || 'default';
      state.loggedIn = true;
    },
    logout(state) {
      state.id = null;
      state.name = '';
      state.loggedIn = false;
    },
    switchTenant(state, { payload }) {
      state.tenant = payload;
    }
  }
});

export const { login, logout, switchTenant } = userSlice.actions;
export default userSlice.reducer;
