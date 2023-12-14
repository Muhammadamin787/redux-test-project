// API Types 
export interface IPagination {
     total: number
     limit: number
     skip: number
}
export interface IPostResponse extends IPagination {
     posts: IPost[]
}
export interface ICommentResponse extends IPagination {
     comments: IComment[]
}

// Post types
export interface IPost {
     id: number
     body: string
     title: string
     userId: number
}

export interface IComment {
     id: number
     body: string
     postId: IPost["id"],
     user: {
          id: number,
          username: string
     }
}

export type TypePostsModalData = Omit<IPost, "id"> & { id?: number }
export type TypePostsModal = {
     isOpen: boolean,
     post?: TypePostsModalData | undefined
}

// User types
export interface IUser {
     id: number
     firstName: string
}

// Other types
export type TypePaginationParams = {
     pageNumber: number
     pageSize: number
}

export type TypeOption = {
     label: string
     value: number
}