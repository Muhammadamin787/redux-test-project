import { IPost } from '../types';
import { usePostsFilteredByUsers } from "./usePostsFilteredByUsers";
import { useSearchedPosts } from "./useSearchedPosts";

export function useFilteredPosts(): IPost[] {

     // Helper Hooks
     const searchedPosts = useSearchedPosts()
     const filtered = usePostsFilteredByUsers(searchedPosts)

     return filtered
}