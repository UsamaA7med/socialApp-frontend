import { Avatar, Button } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowing, toggleFollow } from "../store/profileSlice/thunk";
import { getUser } from "../store/authSlice/thunk";

const FollowingPage = () => {
  const { following, profile } = useSelector((state) => state.profileSlice);
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold">Following ({following.length})</h1>
      <div className="flex flex-col gap-5">
        {following.map((follower) => {
          return (
            <div
              key={follower._id}
              className="flex items-center justify-between gap-5"
            >
              <div className="flex gap-5 items-center">
                <Avatar src={follower.profileImage.url} size="lg" />
                <div className="flex-col ">
                  <h2>{follower.fullname}</h2>
                  <h2 className="text-gray-400">@{follower.username}</h2>
                  <p className="text-gray-500">
                    {follower.bio.length > 20
                      ? follower.bio.substring(0, 20) + "..."
                      : follower.bio}
                  </p>
                </div>
              </div>
              {user._id === profile._id && (
                <Button
                  variant="ghost"
                  onPress={() => {
                    dispatch(toggleFollow(follower._id)).then((data) => {
                      if (!data.error) {
                        dispatch(getFollowing(user._id));
                        dispatch(getUser());
                      }
                    });
                  }}
                >
                  unfollow
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FollowingPage;
