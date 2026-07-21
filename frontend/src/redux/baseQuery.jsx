// baseQuery.js
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000/api",
  
  baseUrl: "https://nexaura11.onrender.com/api",
  // baseUrl: "https://nexora-production-83ec.up.railway.app/api",


  credentials: "include", // for refresh cookie
  prepareHeaders: (headers, { getState }) => {

    const token = getState().auth.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
