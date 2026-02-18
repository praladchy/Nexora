import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../Redux/userData.slice.js"
import { shopSlice } from "./Shop.apiSlice.jsx";
import { authApi } from "./auth.slice.js";
import { productApi } from "./Product.apiSlice.jsx";

export const Store = configureStore({
  reducer: {
    auth: authReducer,   /*this is name of reducer use any name you want only manditory name of slice name */
    [authApi.reducerPath]: authApi.reducer,
    [shopSlice.reducerPath]: shopSlice.reducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopSlice.middleware, productApi.middleware,authApi.middleware),

  /*this middleware is used to store temporary data in the redux store when the data fetch from the api fetch only update data from api not all data fetch */
});
setupListeners(Store.dispatch);
/*this function is used to fetch data when action or dispatch the data or reconect from internet*/
