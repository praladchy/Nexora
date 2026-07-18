// baseQuery.js
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://nexaura11.onrender.com/api/",
  credentials: "include", // for refresh cookie
  prepareHeaders: (headers, { getState }) => {

    const token = getState().auth.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
