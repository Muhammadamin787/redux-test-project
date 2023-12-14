/** @format */
import PostModal from "../../app/features/post/postModal/PostModal";
import PostsPageBody from "./components/PostsBody";
import PostHeader from "./components/postsHeader/PostsHeader";
import "./postsPage.scss";

const PostsPage = () => {
     return (
          <section className="posts-page">
               <PostHeader />
               <PostsPageBody />
               <PostModal />
          </section>
     );
};
export default PostsPage;
