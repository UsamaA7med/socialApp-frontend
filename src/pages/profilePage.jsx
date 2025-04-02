import { Avatar, Button, Image, Link } from "@heroui/react";
import { MdDateRange } from "react-icons/md";
import EditProfile from "../components/common/editProfileModal";
import { useDispatch, useSelector } from "react-redux";
import ProfilePostsList from "../components/profile/profilePostsList";
import {
  getFollowers,
  getFollowing,
  toggleFollow,
} from "../store/profileSlice/thunk";
import { useNavigate } from "react-router-dom";
import DeleteUserModal from "../components/profile/deleteUserModal";
import { getUser } from "../store/authSlice/thunk";
import CreatePost from "../components/home/createPost";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profileSlice);
  const { posts } = useSelector((state) => state.postsSlice);
  const myPosts = posts.filter((post) => post.user._id === profile._id);
  const navigate = useNavigate();
  const formattedDate = new Date(profile.createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
  });
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-1/2 h-full flex justify-center">
        <div className="w-full h-full relative min-h-72 min-w-72">
          <div className="w-full h-full overflow-hidden">
            <Image
              className="object-contain rounded-xl "
              src={profile.coverImage.url}
            />
          </div>
          <div>
            <Avatar
              className="w-28 h-28 z-10 md:-bottom-14 md:left-3 bottom-10 left-1/3 absolute "
              src={profile.profileImage.url}
            />
          </div>
        </div>
      </div>
      <div className="md:mt-20 md:pl-3 w-1/2 justify-between flex flex-col gap-3 md:flex-row items-start">
        <div className="flex flex-col items-center gap-5 md:gap-0 md:flex-row w-full justify-between">
          <div className="flex max-w-96 flex-col gap-1">
            <p className="font-semibold text-2xl">{profile.fullname}</p>
            <p className="text-lg text-gray-500">@{profile.username}</p>
            <p className="">{profile.bio}</p>
            <p className="text-lg text-gray-500 flex items-center gap-1">
              <MdDateRange />
              {formattedDate}
            </p>
            <div className="flex gap-3  text-gray-500 ">
              <Link
                onPress={() => {
                  dispatch(getFollowing(profile._id)).then((data) => {
                    if (!data.error) {
                      navigate(`/following/${profile._id}`);
                    }
                  });
                }}
                underline="hover"
                color="foreground"
                className="flex gap-1 hover:cursor-pointer"
              >
                {profile.following.length}{" "}
                <span className="text-gray-500">Following</span>
              </Link>
              <Link
                onPress={() => {
                  dispatch(getFollowers(profile._id)).then((data) => {
                    if (!data.error) {
                      navigate(`/followers/${profile._id}`);
                    }
                  });
                }}
                underline="hover"
                color="foreground"
                className="flex gap-1 hover:cursor-pointer"
              >
                {profile.followers.length}{" "}
                <span className="text-gray-500">Followers</span>
              </Link>
            </div>
          </div>
          <div>
            {user._id === profile._id ? (
              <div className="flex flex-col gap-2">
                <EditProfile />
                <DeleteUserModal />
              </div>
            ) : (
              <Button
                className={
                  profile.followers.includes(user._id)
                    ? "bg-transparent text-foreground border-default-200"
                    : ""
                }
                color="primary"
                radius="full"
                size="sm"
                variant={
                  profile.followers.includes(user._id) ? "bordered" : "solid"
                }
                onPress={() => {
                  dispatch(toggleFollow(profile._id)).then((data) => {
                    if (!data.error) {
                      dispatch(getUser());
                    }
                  });
                }}
              >
                {profile.followers.includes(user._id) ? "Unfollow" : "Follow"}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5 mt-10">
        {user._id === profile._id && (
          <div className="w-full flex justify-center">
            <CreatePost />
          </div>
        )}
        <ProfilePostsList posts={myPosts} />
      </div>
    </div>
  );
};

export default ProfilePage;
