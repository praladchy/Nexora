import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
  },
  reducers: {
      setCredentials: (state, action) => {
      state.user = action.payload.safeuser;
      state.accessToken = action.payload.accessToken;
    },
    setCart: (state, action) => {
      state.cart=action.payload.cart
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setCredentials, setCart, logout } = authSlice.actions;
export default authSlice.reducer;
