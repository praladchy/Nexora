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
          url: "shop/createShop",
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
    getShopsActive: builder.query({
      query: () => ({
        url: "/shop/getActiveShops",
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
    assignOwner: builder.mutation({
      query: ({shopId,userId}) => ({
        url: `shop/assignOwner/${shopId}/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Shop"],
    }),
    assignAdmin: builder.mutation({                                                     
      query: ({shopId,userId}) => ({
        url: `shop/assignAdmin/${shopId}/${userId}`,

        method: "PATCH",
      }),
      invalidatesTags: ["Shop"],
    }),
    removeOwner: builder.mutation({
      query: ({shopId,userId}) => ({
        url: `shop/removeOwner/${shopId}/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Shop"],
    }),
    removeAdmin: builder.mutation({
      query: ({shopId,userId}) => ({
        url: `shop/removeAdmin/${shopId}/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Shop"],
    }),

  }),
});
export const {  
  useCreateShopMutation,
  useGetShopQuery,
  useGetShopByIdQuery,
  useUpdateShopMutation,
  useDeleteShopMutation,
  useGetShopsActiveQuery,
  useAssignOwnerMutation,
  useAssignAdminMutation,
  useRemoveOwnerMutation,
  useRemoveAdminMutation,
  
} = shopSlice;
