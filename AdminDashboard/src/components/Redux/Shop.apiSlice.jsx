import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./baseQueryInterceptor";

export const shopSlice = createApi({
  reducerPath: "shopApi",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["Shop"],
  // baseUrl: "http://localhost:5000/api/",

  endpoints: (builder) => ({
    createShop: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/createShop",
          body: data,
        };
      },
      invalidatesTags: ["Shop"],
    }),
    getShop: builder.query({
      query: () => ({
        url: "/getShops",
        method: "GET",
      }),
      providesTags: ["Shop"],
    }),
    getShopById: builder.query({
      query: (shopId) => ({
        url: `/getShop/${shopId}`,
        method: "GET",
      }),
      providesTags: ["Shop"],
    }),
    updateShop: builder.mutation({
      query: ({ shopId, data }) => ({
        url: `/updateShop/${shopId}`,

        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Shop"],
    }),

    deleteShop: builder.mutation({
      query: (shopId) => ({
        url: `/deleteShop/${shopId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Shop"],
    }),
  }),
});
export const {
  useCreateShopMutation,
  useGetShopQuery,
  useGetShopByIdQuery,
  useUpDateShopMutation,
  useDeleteShopMutation,
  useGetShopsQuery,
} = shopSlice;
