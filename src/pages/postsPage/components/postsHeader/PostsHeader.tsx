import { setFavouritesActive, setOpenPostsModal, setPostSearch } from "../../../../app/features/post/postSlice";
import { selectorIsFavouritesActive, selectorPostsSearch } from "../../../../app/selectors";
import FavouritesSwitcher from "../../../../components/header/components/FavouritesSwitcher";
import FilterUsers from "../../../../components/header/components/FilterUsers";
import HeaderTitle from "../../../../components/header/HeadTitle";
import HeaderSearch from "../../../../components/header/HeaderSearch";
import PostHeaderApplyButtons from "../../../../components/header/headerApplyButtons/PostHeaderApplyButtons";
import { useAppDispatch } from "../../../../hooks/useToolkitHooks";
import HeaderLayout from "../headerLayout/HeaderLayout";
import HeaderSection from "../headerLayout/HeaderSection";
import "./postsHeader.scss";

const PostHeader = () => {

     // Helper Hooks
     const dispatch = useAppDispatch();

     // Functions
     const toggleDrawer = () => {
          dispatch(setOpenPostsModal())
     };

     const onSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
          dispatch(setPostSearch(event.target.value))
     };

     const onSwitch = (isActive: boolean) => {
          dispatch(setFavouritesActive(isActive))
     };

     return (
          <HeaderLayout>
               <div className="header-section">
                    <HeaderTitle title="Посты" onClick={toggleDrawer} />
                    <HeaderSearch onSearch={onSearch} searchSelector={selectorPostsSearch} />
                    <FilterUsers />
                    <FavouritesSwitcher onSwitch={onSwitch} selector={selectorIsFavouritesActive} />
                    <PostHeaderApplyButtons />
               </div>
          </HeaderLayout>
     )
}

export default PostHeader