import { useDispatch, useSelector } from "react-redux";
import CreatePost from "./components/home/createPost";
import PostsList from "./components/home/HomePostsList";
import { useEffect } from "react";
import { getAllPosts } from "./store/postsSlice/thunk";

function App() {
  const { posts } = useSelector((state) => state.postsSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  return (
    <div className="flex gap-10 flex-col items-center justify-center">
      <CreatePost />
      <PostsList posts={posts} />
    </div>
  );
}

export default App;
