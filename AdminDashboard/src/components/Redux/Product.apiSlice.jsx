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
      query: ({ data }) => ({
        url: `/createproduct`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    getproducts: builder.query({
      query: () => ({
        url: `/getproducts`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getproduct: builder.query({
      query: (id) => ({
        url: `/getproducts/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getproductsByShop: builder.query({
      query: (shopId) => ({
        url: `/getProducts/${shopId}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getproductsByCategory: builder.query({
      query: (categoryId) => ({
        url: `/getProducts/${categoryId}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    upDateproduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateProduct/${id}`,
        method: "PATCH",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["product"],
    }),
    deleteproduct: builder.mutation({
      query: (id) => ({
        url: `/deleteProduct/${id}`,
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
  useUpdateproductMutation,
  useDeleteproductMutation,
} = productApi;
