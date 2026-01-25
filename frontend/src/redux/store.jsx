import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user.slice";

const store = configureStore({
  reducer: {
    userStore: userReducer,
  },
});

export default store;
