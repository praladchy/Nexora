import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/auth/shop",
    credentials: "include", // IMPORTANT for cookies/JWT
  }),
  tagTypes: ["Shop"],
  endpoints: (builder) => ({
    createShop: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/createShop",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
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
    getShopById: builder.query({
      query: (id) => ({
        url: ` /getShop/${id}`,
        method: "GET",
        providesTags: ["Shop"],
      }),
    }),
    upDateShop: builder.mutation({
      query: ({ id, data }) => ({
        url: `/updateShop/${id}`,

        method: "PATCH",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Shop"],
    }),

    deleteShop: builder.mutation({
      query: (id) => ({
        url: `/deleteShop/${id}`,
        method: " DELETE",
      }),
    }),
  }),
});
export const {
  useCreateShopMutation,
  useGetShopQuery,
  useGetShopByIdQuery,
  useUpDateShopMutation,
  useDeleteShopMutation,
} = shopSlice;
