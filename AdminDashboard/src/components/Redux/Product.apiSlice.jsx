// productApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./baseQueryInterceptor";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["product"],
  // baseUrl: "http://localhost:5000/api/",

  endpoints: (builder) => ({
    createproduct: builder.mutation({
      query: ( data ) => ({
        url: `/product/createproduct`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    getproducts: builder.query({
      query: () => ({
        url: `/product/getproducts`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getproduct: builder.query({
      query: (id) => ({
        url: `/product/getproduct/${id}`,
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
    upDateproduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/updateProduct/${id}`,
        method: "PATCH",
        body: data,
        
      }),
      invalidatesTags: ["product"],
    }),
    deleteproduct: builder.mutation({
      query: (id) => ({
        url: `/product/deleteProduct/${id}`,
        method: "DELETE",
      }), 
      providesTags: ["product"],
    }),
  }),
});

export const {
  useCreateproductMutation,
  useGetproductsQuery,
  useGetproductQuery,
  useGetproductsByShopQuery,
  useGetproductsByCategoryQuery,
  useUpDateproductMutation,
  useDeleteproductMutation,
} = productApi;
