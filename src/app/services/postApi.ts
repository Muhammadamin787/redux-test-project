import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IComment, ICommentResponse, IPost, IPostResponse, TypePaginationParams } from '../../types'

export const postApi = createApi({
     reducerPath: "postsApi",
     tagTypes: ["posts", "comments"],
     baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
     endpoints: (builder) => ({

          fetchPosts: builder.query<IPostResponse, TypePaginationParams>({
               query: ({ pageNumber, pageSize }) => `/posts?skip=${pageNumber}&limit=${pageSize}`,
               providesTags: ["posts"],
          }),

          savePost: builder.mutation<IPost, IPost>({
               query: (body) => ({
                    url: body.id ? "/posts/" + body.id : "/posts/add",
                    method: body.id ? "PUT" : "POST",
                    body
               }),
               // invalidatesTags: ["posts"]
          }),

          deletePost: builder.mutation<object, IPost["id"]>({
               query: (postId) => ({
                    url: "/posts/" + postId,
                    method: "DELETE",
               }),
               invalidatesTags: ["posts"],
          }),

          fetchComments: builder.query<IComment[], IPost["id"]>({
               query: (postId) => `posts/${postId}/comments`,
               providesTags: ["comments"],
               transformResponse: ({ comments }: ICommentResponse) => comments
          })
     })
})

export const {
     // Posts
     useFetchPostsQuery,
     useSavePostMutation,
     useDeletePostMutation,
     // Comments
     useFetchCommentsQuery,
} = postApi