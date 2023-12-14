import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { IPost, TypePostsModal } from '../../../types'

interface TypeInitialState {
     posts: IPost[]
     search: string
     filteredPosts: IPost[]
     selectedPosts: IPost[]
     favouritePosts: IPost[]
     isFavouritesActive: boolean
     postsModal: TypePostsModal
}

export const initialState: TypeInitialState = {
     posts: [],
     search: '',
     filteredPosts: [],
     selectedPosts: [],
     favouritePosts: [],
     isFavouritesActive: false,
     postsModal: {
          isOpen: false,
          post: undefined
     },
}

const postSlice = createSlice({
     name: "posts",
     initialState,
     reducers: {

          // Posts
          setPosts: (state, { payload }: PayloadAction<IPost[]>) => {
               state.posts = payload
          },
          setPostSearch: (state, { payload }: PayloadAction<string>) => {
               state.search = payload
          },
          setFilteredPosts: (state, { payload }: PayloadAction<IPost[]>) => {
               state.filteredPosts = payload
          },
          setSelectedPosts: (state, { payload }: PayloadAction<IPost[]>) => {
               state.selectedPosts = payload
          },
          setFavouritesActive: (state, { payload }: PayloadAction<boolean>) => {
               state.isFavouritesActive = payload
          },
          setFavouritePosts: (state, { payload }: PayloadAction<IPost[]>) => {
               state.favouritePosts = payload
          },
          setDeletePostFromCache: (state, { payload: postId }: PayloadAction<number>) => {
               state.posts = state.posts.filter(post => post.id !== postId)
          },

          // Modal
          setAddPost: (state, { payload }: PayloadAction<IPost>) => {
               const post: IPost = {
                    ...payload,
                    id: (state.posts[0].id || 0) + 1
               }
               state.posts = [post, ...state.posts]
          },
          setPostsModal: (state, { payload }: PayloadAction<TypePostsModal>) => {
               state.postsModal = payload
          },
          setOpenPostsModal: (state) => {
               state.postsModal = { ...state.postsModal, isOpen: true }
          },
          setClosePostsModal: (state, { payload }: { payload: { clear?: boolean } | undefined }) => {
               if (payload?.clear) {
                    state.postsModal = { isOpen: false }
               } else {
                    state.postsModal = { ...state.postsModal, isOpen: false }
               }
          },
     }
})

export const {
     setPosts,
     setPostSearch,
     setFilteredPosts,
     setSelectedPosts,
     setFavouritePosts,
     setFavouritesActive,
     setDeletePostFromCache,

     // Modal
     setAddPost,
     setPostsModal,
     setOpenPostsModal,
     setClosePostsModal
} = postSlice.actions;

export default postSlice.reducer;