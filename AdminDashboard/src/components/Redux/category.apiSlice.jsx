import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./baseQueryInterceptor";

export const categorySlice = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["category"],
  // baseUrl: "http://localhost:5000/api/",

  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: () => ({
        method: "POST",
        url: "/createCategory",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    getCategory: builder.query({
      query: () => ({
        url: `/getCategory`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getCategoryByShop: builder.query({
      query: () => ({
        url: `/shop/${shopId}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getCategoryBySlug: builder.query({
      query: () => ({
        url: `/${slug}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: () => ({
        url: `/updateCategory/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: () => ({
        url: `/deleteCategory/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});
export const {
  useGetCategoryQuery,
  useGetCategoryByShopQuery,
  useGetCategoryBySlugQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categorySlice;
