import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "./store"

// Post Reducer Selectors
export const selectorIsFavouritesActive = (state: RootState) => state.postReducer.isFavouritesActive
export const selectorFavouritePosts = (state: RootState) => state.postReducer.favouritePosts
export const selectorSelectedPosts = (state: RootState) => state.postReducer.selectedPosts
export const selectorPostsModal = (state: RootState) => state.postReducer.postsModal
export const selectorPostsSearch = (state: RootState) => state.postReducer.search
export const selectorPosts = (state: RootState) => state.postReducer.posts

// Post Reducer Memoized Selectors
export const selectorActivePosts = createSelector(
     [selectorPosts, selectorFavouritePosts, selectorIsFavouritesActive],
     (posts, favourites, isFavouritesActive) => {
          return isFavouritesActive ? favourites : posts
     }
)

// User Reducer Selectors
export const selectorFilteredUserIds = (state: RootState) => state.userReducer.filteredUserIds
export const selectorUsers = (state: RootState) => state.userReducer.users
