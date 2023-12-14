import { selectorActivePosts, selectorPostsSearch } from "../app/selectors";
import { isInclude } from "../utils/helpers";
import { IPost } from '../types';
import { useAppSelector } from "./useToolkitHooks";

export function useSearchedPosts(givenPosts?: IPost[]): IPost[] {

     // Selectors
     const postsFromStore = useAppSelector(selectorActivePosts)
     const keyword = useAppSelector(selectorPostsSearch)

     const posts = givenPosts || postsFromStore

     return keyword === "" ? posts : posts.filter(post => isInclude(post.title, keyword))
}