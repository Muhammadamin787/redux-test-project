/** @format */

import { useQueries } from "@tanstack/react-query";
import { Pagination, Spin } from "antd";
import { memo, useDeferredValue, useEffect, useRef, useState } from "react";
import { todosURL, usersURL } from "../../api/auth";
import { getPageable, getRequest } from "../../api/requests";
import PageHead from "../../components/header/Header";
import { useFilters } from "../../context/filterContext";
import useSessionStorage from "../../hooks/useSessionStorage";
import TodoCard from "./components/TodoCard";
import TodoModal from "./components/TodoModal";
import "./todosPage.scss";

const TodosPage = () => {

     // Hooks
     const [selectedTodos, setSelectTodos] = useState([]);
     const [isRefetch, setRefetch] = useState(false);
     const [filters, setFilters] = useFilters();
     const deferredSearchKey = useDeferredValue(filters.searchKey);
     const [sessionStorage, setSessionStorage] = useSessionStorage(
          "pageParams",
          {
               pageNumber: 10,
               pageSize: 10,
          }
     );
     const [params, setParams] = useState(sessionStorage);
     const firstUpdate = useRef(true);

     useEffect(() => {
          refetchTodos();
     }, [isRefetch]);

     useEffect(() => {
          setSessionStorage(params);
          if (firstUpdate.current) {
               setFilters({
                    ...filters,
                    sortBy: {
                         property: "completed",
                         order: "asc",
                    },
               });
          }
          firstUpdate.current = false;
     }, []);

     // Queries
     const [userResponse, todosResponse] = useQueries({
          queries: [
               {
                    queryKey: ["users"],
                    queryFn: () => getRequest(usersURL),
               },
               {
                    queryKey: ["todos"],
                    queryFn: () =>
                         getPageable(todosURL, params.pageNumber, params.pageSize),
                    select: (response) => ({
                         todos: response.data
                              .map((item, index) => ({
                                   ...item,
                                   key: ++index,
                              }))
                              .reverse(),
                         total: response.headers["x-total-count"],
                         keepPreviousData: true,
                    }),
               },
          ],
     });

     const { data: users } = userResponse;
     const {
          data,
          refetch: refetchTodos,
          isLoading: initialLoading,
          isFetching: isFetchingTodos,
     } = todosResponse;

     const onChangePagination = (pageNumber) => {
          setParams((prev) => ({
               ...prev,
               pageNumber,
          }));
          setRefetch(true);
     };

     const onShowSizeChange = (_, pageSize) => {
          setParams((prev) => ({
               ...prev,
               pageSize,
          }));
     };

     const filter = (post) => {
          let isTrue = true;
          if (filters.filterUsers?.length) {
               if (!filters.filterUsers.includes(post.userId)) {
                    isTrue = false;
               }
          }
          if (deferredSearchKey && post.title) {
               if (
                    !post.title
                         .toUpperCase()
                         ?.includes(deferredSearchKey.toUpperCase())
               ) {
                    isTrue = false;
               }
          }
          return isTrue;
     };

     const sort = (prev, next) => {
          const { property, order } = filters.sortBy || {};
          if (order === "asc") {
               return prev[property] > next[property] ? 1 : -1;
          } else {
               return prev[property] < next[property] ? 1 : -1;
          }
     };

     const TodosList = () => {
          const postList = data?.todos || new Array(6).fill({});
          return postList
               .filter(filter)
               .sort(sort)
               .map((todo, key) => (
                    <TodoCard
                         selectedTodos={selectedTodos}
                         setSelectTodos={setSelectTodos}
                         isLoading={initialLoading}
                         avatarId={key}
                         todo={todo}
                         key={key}
                    />
               ));
     };
     return (
          <div className="todos-page">
               <PageHead
                    title="Задачи"
                    pageName="todos"
                    selectedItems={selectedTodos}
                    setSelectItems={setSelectTodos}
                    hideFilters={{ usersFilter: true, favouritesFilter: true }}
                    showSorters={{
                         completedSorter: true,
                    }}
                    showApplyButtons={{
                         applyDeleteButton: true,
                    }}
               />
               <div className="todos-main">
                    <Spin spinning={!initialLoading && isFetchingTodos}>
                         <div className="todos-body">
                              <TodosList />
                         </div>
                    </Spin>
               </div>
               <Pagination
                    size="small"
                    total={data?.total}
                    pageSizeOptions={[10, 20, 50, 100]}
                    pageSize={params.pageSize}
                    current={params.pageNumber}
                    onChange={onChangePagination}
                    defaultPageSize={10}
                    onShowSizeChange={onShowSizeChange}
                    style={{
                         textAlign: "center",
                         margin: "20px 0",
                    }}
                    showSizeChanger
                    showQuickJumper
               />
               <TodoModal users={users} />
          </div>
     );
};
export default memo(TodosPage);
