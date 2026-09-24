import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./baseQueryInterceptor";

export const notificationApiSlice = createApi({
  reducerPath: "notificationApiSlice",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["N otification"],

  endpoints: (builder) => ({
    getNotification: builder.query({
      query: () => ({
        url: "/notification/getNotification",
        method: "GET",
      }),
    }),
  }),
});
export const {useGetNotificationQuery} = notificationApiSlice;
