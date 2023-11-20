import { useContext } from "react";
import { PostContext } from "../../context/PostContext";
import PostCard from "./PostCard";

const ListPosts = () => {
  const { posts } = useContext(PostContext);

  return (
    <div className="flex flex-col my-5 gap-5">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default ListPosts;
