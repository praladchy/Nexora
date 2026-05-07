import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./userData.slice.js";
import { authApi } from "./auth.slice.js";
import { productApi } from "./product.slice.js";
import { cartApi } from "./cart.slice.js";
import { whishlistApi } from "./whishList.js";
import { orderApi } from "./order.slice.js";
export const store = configureStore({
  reducer: {
    auth: authReducer,   /*this is name of reducer use any name you want only manditory name of slice name */
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]:productApi.reducer,  
    [cartApi.reducerPath]:cartApi.reducer,
    [whishlistApi.reducerPath]:whishlistApi.reducer,
    [orderApi.reducerPath]:orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat( authApi.middleware, productApi.middleware ,cartApi.middleware, whishlistApi.middleware,orderApi.middleware), /*this is used to add middleware for api slice and this is used to fetch data from api and store in redux store and this is used to update data in redux store when data fetch from api */

  /*this middleware is used to store temporary data in the redux store when the data fetch from the api fetch only update data from api not all data fetch */
});
setupListeners(store.dispatch);
/*this function is used to fetch data when action or dispatch the data or reconect from internet*/
