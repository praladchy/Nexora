import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./baseQueryInterceptor";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["order"],

  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: `/order/createOrder`,  
        method: "POST",
        body: orderData,
  }),
  inValidatesTags: ["order"],
}),
    getOrdersForUser: builder.query({
      query: () => ({
        url: `/order/getOrdersForUser`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    getOrders: builder.query({
      query: () => ({
        url: `/order/getOrders`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    updateOrder: builder.mutation({
      query: ({ orderId, updateData }) => ({
        url: `/order/updateOrder/${orderId}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["order"],
    }),
    deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/order/updateOrder/${orderId}`,    
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
  }),   
});

export const { useCreateOrderMutation, useGetOrdersForUserQuery, useGetOrdersQuery, useUpdateOrderMutation, useDeleteOrderMutation } = orderApi;