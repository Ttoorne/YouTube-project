import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API } from "../helpers/consts";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  tagTypes: ["videos"],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos/",
      providesTags: ["videos"],
    }),
    addVideo: builder.mutation({
      query: (newVideo) => ({
        url: "/videos/",
        method: "POST",
        body: newVideo,
      }),
      invalidatesTags: ["videos"],
    }),
    updateVideo: builder.mutation({
      query: ({ id, editedVideo }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: editedVideo,
      }),
      invalidatesTags: ["videos"],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["videos"],
    }),
    getVideoDetails: builder.query({
      query: (id) => `/videos/${id}`,
      providesTags: (result, error, id) => [{ type: "videos", id: id }],
    }),
    // Добавьте другие мутации из ProductContextProvider здесь...
  }),
});

export const {
  useGetVideosQuery,
  useAddVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
  useGetVideoDetailsQuery,
} = apiSlice;
