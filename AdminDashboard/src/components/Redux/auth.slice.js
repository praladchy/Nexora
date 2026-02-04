import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/auth",
    credentials: "include",
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "user/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "user/register",
        method: "POST",
        body: data,
      }),
    }),
    verification:builder.mutation({
      query: (data) => ({
        url: "user/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    reSendOtp:builder.mutation({
      query: (data) => ({
        url: "user/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    
  }),
});
export const { useLoginMutation, useRegisterMutation,useVerificationMutation,useReSendOtpMutation } = authApi;
