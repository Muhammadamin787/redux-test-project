import { Pagination, Spin } from "antd"
import { useFetchPostsQuery } from "../../../app/services/postApi"
import PostCardList from "./PostCardList"
import { useEffect, useState } from "react"
import { useAppDispatch } from "../../../hooks/useToolkitHooks"
import { setPosts } from "../../../app/features/post/postSlice"
import { IPostResponse, TypePaginationParams } from "../../../types"

const defaultData: IPostResponse = {
     posts: [],
     limit: 10,
     skip: 1,
     total: 0
}

const PostsPageBody = () => {

     // Helper Hooks 
     const dispatch = useAppDispatch()

     // States
     const [paginationParams, setPaginationParams] = useState<TypePaginationParams>({
          pageNumber: defaultData.skip,
          pageSize: defaultData.limit
     });

     // Queries
     const { data = defaultData, isLoading, isFetching } = useFetchPostsQuery(paginationParams)
     const { posts, total } = data

     // Effects
     useEffect(() => {
          if (posts) dispatch(setPosts(posts))
     }, [posts, dispatch])

     // Functions 
     const onChangePagination = (pageNumber: number) => {
          setPaginationParams(prev => ({
               ...prev,
               pageNumber,
          }))
     }

     const onShowSizeChange = (_current: number, pageSize: number) => {
          setPaginationParams(prev => ({
               ...prev,
               pageSize,
          }))
     }

     return (
          <div className="posts-main">
               <Spin spinning={!isLoading && isFetching}>
                    <div className="posts-body">
                         <PostCardList isLoading={isLoading} />
                    </div>
               </Spin>
               <Pagination
                    // size="small"
                    total={total}
                    pageSizeOptions={[10, 20, 50, 100]}
                    pageSize={paginationParams.pageSize}
                    current={paginationParams.pageNumber}
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
          </div>
     )
}

export default PostsPageBody