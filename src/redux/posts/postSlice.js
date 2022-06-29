import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "https://bloggy-api.herokuapp.com",
  }),

  tagTypes: ["Posts"],

  endpoints: (builder) => ({
    fetchPosts: builder.query({
      query: () => "/posts",
      providesTags: ["Posts"],
    }),

    fetchPostById: builder.query({
      query: (id) => `/posts/${id}?_embed=comments`,
      providesTags: ["Posts"],
    }),

    updatePost: builder.mutation({
      query: ({ id, ...rest }) => {
        return {
          url: `/posts/${id}`,
          method: "PUT",
          body: rest,
        };
      },
      invalidatesTags: ["Posts"],
    }),

    createPost: builder.mutation({
      query({ title, body }) {
        return {
          url: "/posts",
          method: "POST",
          body: {
            title,
            body,
          },
        };
      },
      invalidatesTags: ["Posts"],
    }),

    deletePost: builder.mutation({
      query(id) {
        return {
          url: `/posts/${id}`,
          method: "DELETE",
        };
      },

      invalidatesTags: ["Posts"],
    }),

    createComment: builder.mutation({
      query({ postId, body }) {
        return {
          url: "/comments",
          method: "POST",
          body: {
            postId,
            body,
          },
        };
      },
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useFetchPostsQuery,
  useFetchPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useCreateCommentMutation,
} = postApi;
