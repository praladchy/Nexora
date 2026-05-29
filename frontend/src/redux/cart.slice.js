import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./baseQueryInterceptor";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["cart"],

  endpoints: (builder) => ({
    createCart: builder.mutation({
      query: (cartData) => ({
        url: `/cart/addToCart/${cartData.shopId}/${cartData.productId}`,
        method: "POST",
        body: cartData,
      }),
      invalidatesTags: ["cart"],
    }),
    getCart: builder.query({
      query: () => ({
        url: `/cart/getCart`,
        method: "GET",
      }),
      providesTags: ["cart"],
    }),
    updateCart: builder.mutation({
      query: ({ productId,shopId, quantity }) => ({
        url: `/cart/updateCart/${shopId}/${productId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["cart"],
    }),
    removeCart: builder.mutation({
      query: (itemId) => ({
        url: `/cart/removeFromCart/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});
export const { useCreateCartMutation, useGetCartQuery, useUpdateCartMutation, useRemoveCartMutation } =
  cartApi;
  