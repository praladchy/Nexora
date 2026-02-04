import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { shopSlice } from "./Shop.apiSlice.jsx";
import { productApi } from "./Product.slice.jsx";
import userData from "./userData.slice.js";
import { authApi } from "./auth.slice.js";
export const Store = configureStore({
  reducer: {
    user: userData,
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
