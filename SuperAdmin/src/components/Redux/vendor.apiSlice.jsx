import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./baseQueryInterceptor";

export const vendorSlice = createApi({
  reducerPath: "vendorApi",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["Vendor"],
  // baseUrl: "http://localhost:5000/api/",
  endpoints: (builder) => ({
    vendorUserCreate: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "vendor/create",
        body: data,
      }),
      invalidatesTags: ["Vendor"],
    }),
    vendorCreate: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "vendor/user/create",
        body: data,
      }),
      invalidatesTags: ["Vendor"],
    }),
    vendorAdminCreate: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/vendor/admin/create",
        body: data,
      }),
      invalidatesTags: ["Vendor"],
    }),
    getVendors: builder.query({
      query: () => ({
        url: "/vendor/get",
        method: "GET",
      }),
      providesTags: ["Vendor"],
    }),
    getVendorAdmins: builder.query({
      query: () => ({
        url: "/vendor/admin/vendorAdmins",
        method: "GET",
      }),
      providesTags: ["Vendor"],
    }),
    getVendorById: builder.query({
      query: (id) => ({
        url: `/vendor/get/${id}`,
        method: "GET",
      }),
      providesTags: ["Vendor"],
    }),
    updateVendor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/vendor/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Vendor"],
    }),
    deleteVendor: builder.mutation({
      query: (id) => ({
        url: `/vendor/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vendor"],
    }),
    emailVerification: builder.mutation({
      query: (data) => ({
        url: "vendor/create/emailOtpSend",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vendor"],
    }),
    emailVerificationOtp: builder.mutation({
      query: (data) => ({
        url: "vendor/create/emailVerify",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vendor"],
    }),
    phoneVerification: builder.mutation({
      query: (data) => ({
        url: "vendor/create/phoneOtpSend",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vendor"],
    }),
    phoneVerificationOtp: builder.mutation({
      query: (data) => ({
        url: "vendor/create/phoneOtpVerify",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Vendor"],
    }),
  }),
});
export const {
  useVendorUserCreateMutation,
  useVendorCreateMutation,
  useVendorAdminCreateMutation,
  useGetVendorsQuery,
  useGetVendorByIdQuery,
  useUpdateVendorMutation,
  useDeleteVendorMutation,
  useEmailVerificationMutation,
  useEmailVerificationOtpMutation,
  usePhoneVerificationMutation,
  usePhoneVerificationOtpMutation,
  useGetVendorAdminsQuery,
} = vendorSlice;