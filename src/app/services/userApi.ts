import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../types";

export const usersApi = createApi({
     reducerPath: "usersApi",
     baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
     endpoints: (builder) => ({

          fetchUsers: builder.query<IUser[], void>({
               query: () => "/users?limit=100",
               transformResponse: ({ users }: { users: IUser[] }) => users
          }),

          saveUsers: builder.mutation<IUser[], void>({
               query: () => "/users"
          })

     })
})

export const {
     useFetchUsersQuery
} = usersApi