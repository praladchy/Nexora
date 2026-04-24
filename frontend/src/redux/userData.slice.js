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
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
