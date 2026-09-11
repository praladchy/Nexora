import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./baseQueryInterceptor";

export const serviceAggregateSlice = createApi({
  reducerPath: "serviceAggregateApi",
  baseQuery: baseQueryWithInterceptor,

  tagTypes: ["ServiceAggregate"],

  endpoints: (builder) => ({

    // =========================================================
    // ADMIN / VENDOR / OWNER
    // =========================================================

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
    getDateAggregate: builder.query({
      query: () => ({
        url: "service/dateAggregate",
        method: "GET",
      }),
      providesTags: ["ServiceAggregate"],
    }),


    // =========================================================
    // SUPER ADMIN - GLOBAL
    // =========================================================

    // GET /service/productAggregateForSuperAdmin
    getProductAggregateForSuperAdmin: builder.query({
      query: () => ({
        url: "service/productAggregateForSuperAdmin",
        method: "GET",
      }),
      providesTags: ["ServiceAggregate"],
    }),

    // GET /service/orderAggregateForSuperAdmin
    getOrderAggregateForSuperAdmin: builder.query({
      query: () => ({
        url: "service/orderAggregateForSuperAdmin",
        method: "GET",
      }),
      providesTags: ["ServiceAggregate"],
    }),

    // GET /service/categoryAggregateForSuperAdmin
    getCategoryAggregateForSuperAdmin: builder.query({
      query: () => ({
        url: "service/categoryAggregateForSuperAdmin",
        method: "GET",
      }),
      providesTags: ["ServiceAggregate"],
    }),

    // GET /service/dateAggregateForSuperAdmin
    getDateAggregateForSuperAdmin: builder.query({
      query: () => ({
        url: "service/dateAggregateForSuperAdmin",
        method: "GET",
      }),
      providesTags: ["ServiceAggregate"],
    }),


    // =========================================================
    // SUPER ADMIN - SHOP
    // =========================================================

    // GET /service/productAggregateForShop/:shopId
    getProductAggregateForSuperAdminForShop: builder.query({
      query: (shopId) => ({
        url: `service/productAggregateForShop/${shopId}`,
        method: "GET",
      }),
      providesTags: ["ServiceAggregate"],
    }),

    // GET /service/productAggregateForShopCategory/:shopId/:categoryId
    getProductAggregateForSuperAdminForShopCategory: builder.query({
      query: ({ shopId, categoryId }) => ({
        url: `service/productAggregateForShopCategory/${shopId}/${categoryId}`,
        method: "GET",
      }),
      providesTags: ["ServiceAggregate"],
    }),

    // GET /service/orderAggregateForShop/:shopId
    getOrderAggregateForShop: builder.query({
      query: (shopId) => ({
        url: `service/orderAggregateForShop/${shopId}`,
        method: "GET",
      }),
      providesTags: ["ServiceAggregate"],
    }),

    // GET /service/categoryAggregateForSuperAdminForShop/:shopId
    getCategoryAggregateForSuperAdminForShop: builder.query({
      query: (shopId) => ({
        url: `service/categoryAggregateForSuperAdminForShop/${shopId}`,
        method: "GET",
      }),
      providesTags: ["ServiceAggregate"],
    }),

    // GET /service/dateAggregateForSuperAdminForShop/:shopId
    getDateAggregateForSuperAdminForShop: builder.query({
      query: (shopId) => ({
        url: `service/dateAggregateForSuperAdminForShop/${shopId}`,
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
  useGetDateAggregateQuery,

  // Super Admin - Global
  useGetProductAggregateForSuperAdminQuery,
  useGetOrderAggregateForSuperAdminQuery,
  useGetCategoryAggregateForSuperAdminQuery,
  useGetDateAggregateForSuperAdminQuery,

  // Super Admin - Shop
  useGetProductAggregateForSuperAdminForShopQuery,
  useGetProductAggregateForSuperAdminForShopCategoryQuery,
  useGetOrderAggregateForShopQuery,
  useGetCategoryAggregateForSuperAdminForShopQuery,
  useGetDateAggregateForSuperAdminForShopQuery,

} = serviceAggregateSlice;