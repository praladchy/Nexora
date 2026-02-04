// productApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  tagTypes: ["product"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/" }),
  endpoints: (builder) => ({
    createproduct: builder.mutation({
      query: ({ shopid, data }) => ({
        url: `auth/products/${shopid}/createproduct`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),

    getproducts: builder.query({
      query: () => ({
        url: `auth/products/getproducts`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    upDateproduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateproduct/${id}`,
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
        url: `/deleteproduct/${id}`,
        method: "DELETE",
      }),
    }),
    providesTags: ["product"],
  }),
});

export const {
  useCreateproductMutation,
  useGetproductsQuery,
  useUpDateproductMutation,
  useDeleteproductMutation,
} = productApi;
