import { Select } from "antd";
import { memo, useEffect, useState } from "react";
import { setFilteredUserIds, setUsers } from "../../../app/features/user/userSlice";
import { useFetchUsersQuery } from "../../../app/services/userApi";
import { useAppDispatch } from "../../../hooks/useToolkitHooks";
import type { IUser, TypeOption } from "../../../types";
import { isInclude, makeUserOptions } from "../../../utils/helpers";

const FilterUsers = () => {

     // Helper Hooks
     const dispatch = useAppDispatch();

     // States
     const [userOptions, setUserOptions] = useState<TypeOption[]>([]);

     // Queries
     const { data: users, isLoading } = useFetchUsersQuery()

     // Effects
     useEffect(() => {
          if (users) {
               dispatch(setUsers(users))
               setUserOptions(makeUserOptions(users))
          }
     }, [users])

     // Functions
     const onSelectUser = (filteredUsers: IUser["id"][]) => {
          dispatch(setFilteredUserIds(filteredUsers))
     };

     const filterOption = (input: string, option: TypeOption | undefined) => {
          return isInclude(option?.label ?? '', input)
     };

     return (
          <div className="head-filters">
               <Select
                    showSearch
                    allowClear
                    mode="multiple"
                    loading={isLoading}
                    placeholder="Выберите пользователя"
                    optionFilterProp="children"
                    onChange={onSelectUser}
                    style={{ width: "300px" }}
                    filterOption={filterOption}
                    options={userOptions}
               />
          </div>
     )
}

export default memo(FilterUsers)