import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./baseQueryInterceptor";

export const serviceAggregateSlice = createApi({
  reducerPath: "serviceAggregateApi",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["ServiceAggregate"],
  // baseUrl: "http://localhost:5000/api/",
  endpoints: (builder) => ({
    getProductAggregate: builder.query({
      query: () => ({
        url: "service/productAggregate",
        method: "GET",
      }),
    }),

    getOrderAggregate: builder.query({
      query: () => ({
        url: "service/orderAggregate",
        method: "GET",
      }),
    }),
    getCategoryAggregate: builder.query({
      query: () => ({
        url: "service/categoryAggregate",
        method: "GET",
      }),
    }),
    getDataAggregate: builder.query({
      query: () => ({
        url: "service/dateAggregate",
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetProductAggregateQuery,
  useGetOrderAggregateQuery,
  useGetCategoryAggregateQuery,
  useGetDataAggregateQuery,
} = serviceAggregateSlice;
