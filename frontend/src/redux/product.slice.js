// productApi.js

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseQueryWithInterceptor } from "./baseQueryInterceptor";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["product"],
  // baseUrl: "http://localhost:5000/api/",

  endpoints: (builder) => ({
    

    getproducts: builder.query({
      query: () => ({
        url: `/product/getproducts`,
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
        url: `/product/getProducts/${shopId}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getproductsByCategory: builder.query({
      query: (categoryId) => ({
        url: `/product/getProducts/${categoryId}`,
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
