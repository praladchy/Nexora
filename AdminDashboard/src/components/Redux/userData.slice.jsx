import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    isInitialized: false,
    count:null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.safeuser;
      state.accessToken = action.payload.accessToken;
      state.isInitialized = true;
    },
    setNotificationCound:(state,action)=>{
      state.count=action.payload.count
    },
    setInitialized: (state) => {
      state.isInitialized = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
     state.isInitialized = true;
    },
  },
});

export const { setCredentials, logout, setInitialized } = authSlice.actions;
export default authSlice.reducer;
