import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../../types";
import { sortByName } from "../../../utils/helpers";

interface IUserSate {
     users: IUser[],
     filteredUserIds: IUser["id"][]
}

const initialState: IUserSate = {
     users: [],
     filteredUserIds: [],
}

const userSlice = createSlice({
     name: "userApi",
     initialState,
     reducers: {
          setUsers: (state, { payload }: PayloadAction<IUser[]>) => {
               state.users = [...payload].sort(sortByName)
          },
          setFilteredUserIds: (state, { payload }: PayloadAction<IUser["id"][]>) => {
               state.filteredUserIds = payload
          }
     }
})

export const { setUsers, setFilteredUserIds } = userSlice.actions
export default userSlice.reducer;