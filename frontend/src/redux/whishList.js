import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./baseQueryInterceptor";

export const whishlistApi = createApi({
  reducerPath: "whishlistApi",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["whishlist"],

  endpoints: (builder) => ({
    addToWhishList: builder.mutation({
      query: (productId) => ({
        url: `/whishList/addToWhishList`,
        method: "POST",
        body: productId,
      }),
      invalidatesTags: ["whishlist"],
    }),
    getWhishList: builder.query({
      query: () => ({
        url: `/whishList/getWhishList`,
        method: "GET",
      }),
      providesTags: ["whishlist"],
    }),
    removeFromWhishList: builder.mutation({
      query: (productId) => ({
        url: `/whishList/removeFromWhishList/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["whishlist"],
    }),
  }),
});

export const { useAddToWhishListMutation, useGetWhishListQuery, useRemoveFromWhishListMutation } = whishlistApi;