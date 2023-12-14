import { setFavouritePosts, setSelectedPosts } from "../../../app/features/post/postSlice";
import { selectorFavouritePosts, selectorSelectedPosts } from "../../../app/selectors";
import { useAppDispatch, useAppSelector } from "../../../hooks/useToolkitHooks";
import HeaderApplyButtons from "./HeaderApplyButtons";
import type { IPost } from "../../../types";


const PostHeaderApplyButtons = () => {

     // Helper Hooks
     const dispatch = useAppDispatch()

     // Selector
     const selectedPosts = useAppSelector(selectorSelectedPosts)
     const favouritePosts = useAppSelector(selectorFavouritePosts)

     // Functions
     const setSelectedPost = (posts: IPost[]) => {
          dispatch(setSelectedPosts(posts))
     }

     const onSetFavouritePosts = (posts: IPost[]) => {
          dispatch(setFavouritePosts([...favouritePosts, ...posts]))
     }

     return (
          <HeaderApplyButtons<IPost>
               selectedItems={selectedPosts}
               setSelectedItems={setSelectedPost}
               setFavouriteItems={onSetFavouritePosts}
          />
     )
}

export default PostHeaderApplyButtons;