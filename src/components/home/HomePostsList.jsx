import HomePost from "./HomePost";

const HomePostsList = ({ posts }) => {
  return (
    <div className="flex flex-col gap-10 justify-center items-center w-full">
      {posts.map((post) => (
        <HomePost key={post._id} post={post} userx={post.user} />
      ))}
    </div>
  );
};

export default HomePostsList;
