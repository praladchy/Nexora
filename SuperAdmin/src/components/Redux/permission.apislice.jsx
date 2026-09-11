// productApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithInterceptor } from "./baseQueryInterceptor";

export const permissionApi = createApi({
  reducerPath: "permissionApi",
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ["permission"],
  endpoints: (builder) => ({
    createPermission: builder.mutation({
      query: (data) => ({
        url: "/permission/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["permission"],
    }),

    getPermission: builder.query({
      query: () => ({
        url: "/permission/get",
        method: "GET",
      }),
      providesTags: ["permission","User"],
    }),
    getActivePermission: builder.query({
      query: () => ({
        url: "/permission/gets/active",
        method: "GET",
      }),
      providesTags: ["permission"],
    }),

    getPermissionById: builder.query({
      query: (id) => ({
        url: `/permission/get/${id}`,
        method: "GET",
      }),
      providesTags: ["permission"],
    }),

    assignPermission: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/permission/assign/${id}/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["permission", "User"],
    }),
    removePermission: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/permission/remove/${id}/${userId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["permission", "User"],
    }),
    updatePermission: builder.mutation({
      query: ({ data, id }) => ({
        url: `/permission/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["permission", "User"],
    }),
    deletePermission: builder.mutation({
      query: (id) => ({
        url: `/permission/delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["permission", "User"],
    }),
  }),
});

export const {
  useCreatePermissionMutation,
  useGetPermissionQuery,
  useGetActivePermissionQuery,
  useGetPermissionByIdQuery,
  useAssignPermissionMutation,
  useRemovePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} = permissionApi;
