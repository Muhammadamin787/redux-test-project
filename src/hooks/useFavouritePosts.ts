import { selectorFilteredUserIds, selectorPosts } from "../app/selectors";
import { IPost } from '../types';
import { byUserId } from "../utils/helpers";
import { useAppSelector } from "./useToolkitHooks";

export function usePostsFilteredByUsers(givenPosts?: IPost[]): IPost[] {

     // Selectors
     const postsFromStore = useAppSelector(selectorPosts)
     const filteredUserIds = useAppSelector(selectorFilteredUserIds)

     const posts = givenPosts || postsFromStore

     return !filteredUserIds.length ? posts : posts.filter(post => byUserId(post, filteredUserIds))
}