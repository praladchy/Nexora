import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./baseQueryInterceptor";

export const serviceAggregateSlice = createApi({
  reducerPath: "serviceAggregateApi",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["ServiceAggregate"],

  endpoints: (builder) => ({

    // GET /service/productAggregate
    getProductAggregate: builder.query({
      query: () => ({
        url: "service/productAggregate",
        method: "GET",
      }),
      providesTags: ["ServiceAggregate"],
    }),

    // GET /service/orderAggregate
    getOrderAggregate: builder.query({
      query: () => ({
        url: "service/orderAggregate",
        method: "GET",
      }),
      providesTags: ["ServiceAggregate"],
    }),

    // GET /service/categoryAggregate
    getCategoryAggregate: builder.query({
      query: () => ({
        url: "service/categoryAggregate",
        method: "GET",
      }),
      providesTags: ["ServiceAggregate"],
    }),

    // GET /service/dateAggregate
    getDataAggregate: builder.query({
      query: () => ({
        url: "service/dateAggregate",
        method: "GET",
      }),
      providesTags: ["ServiceAggregate"],
    }),


    
  }),
});

export const {
  // Admin / Vendor / Owner
  useGetProductAggregateQuery,
  useGetOrderAggregateQuery,
  useGetCategoryAggregateQuery,
  useGetDataAggregateQuery,

  
} = serviceAggregateSlice;