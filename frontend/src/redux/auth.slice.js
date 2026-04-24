import { createApi} from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./baseQueryInterceptor";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["authApi"],
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
    
    
    verification: builder.mutation({
      query: (data) => ({
        url: "auth/user/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
    reSendOtp: builder.mutation({
      query: (data) => ({
        url: "user/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    refreshToken: builder.query({
      query: () => ({
        url: "auth/refresh",
        method: "GET",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/user/logout",
        method: "POST",
      }),
    }),
    getUser: builder.query({
      query: () => ({
        url: "auth/user/gets",
        method: "GET",
      }),
      providesTags: ["authApi"],
    })
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useVerificationMutation,
  useReSendOtpMutation,
  useRefreshTokenQuery,  
  useLogoutMutation,
  useGetUserQuery,
} = authApi;
