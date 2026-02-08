import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./baseQueryInterceptor";
export const authApi = createApi({
  reducerPath: "auth",
  baseQuery:  baseQueryWithInterceptor,
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "auth/user/login",
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "auth/user/register",
        method: "POST",
        body: data,
      }),
    }),
    verification:builder.mutation({
      query: (data) => ({
        url: "auth/user/verify-otp",
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
    refreshToken:builder.query({
     query:()=>({
      url:"auth/refresh",
      method:"GET",
     }) 
    })
    
  }),
});
export const { useLoginMutation, useRegisterMutation,useVerificationMutation,useReSendOtpMutation,useRefreshTokenQuery } = authApi;
