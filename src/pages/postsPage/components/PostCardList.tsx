import PostCard from "../../../app/features/post/PostCard";
import { useFilteredPosts } from "../../../hooks/useFilteredPosts";

type PostListProps = {
     isLoading: boolean
}
const placeholderPosts = new Array(6).fill({})

const PostCardList = ({ isLoading }: PostListProps) => {

     // Helper Hooks   
     const searchedPosts = useFilteredPosts()
     const posts = isLoading ? placeholderPosts : searchedPosts

     if (!posts.length) return <h2 className="not-found-text">Нет данных</h2>

     return posts.map((post, key) => (
          <PostCard
               isLoading={isLoading}
               avatarId={key}
               post={post}
               key={key} />
     ));
}

export default PostCardList