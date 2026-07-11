import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import  { persistReducer } from "redux-persist";
import authReducer from "../redux/userData.slice.js"
const persistConfig = {
  key: "root",
  storage,
};

export const persistedReducer = persistReducer(
  persistConfig,
  authReducer
);

 

