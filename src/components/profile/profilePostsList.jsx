import ProfilePost from "./ProfilePost";

const ProfilePostsList = ({ posts }) => {
  return (
    <div className="flex flex-col gap-10 justify-center items-center w-full">
      {posts.map((post) => (
        <ProfilePost key={post._id} post={post} />
      ))}
    </div>
  );
};

export default ProfilePostsList;
