// productApi.js

import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithInterceptor } from "./baseQueryInterceptor";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["product"],
  // baseUrl: "http://localhost:5000/api/",

  endpoints: (builder) => ({
    getproducts: builder.query({
      query: () => ({
        url: `/product`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getproduct: builder.query({
      query: (id) => ({
        url: `/product/getproducts/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getproductsByShop: builder.query({
      query: (shopId) => ({
        url: `/product/shopProducts/${shopId}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getproductsByCategory: builder.query({
      query: (categoryId) => ({
        url: `/product/categoryProducts/${categoryId}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
  }),
});

export const {
  useGetproductsQuery,
  useGetproductQuery,
  useGetproductsByShopQuery,
  useGetproductsByCategoryQuery,
} = productApi;
