import { Avatar } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../store/profileSlice/thunk";
import { useNavigate } from "react-router-dom";

const FollowersPage = () => {
  const { followers } = useSelector((state) => state.profileSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-xl font-bold">Followers ({followers.length})</h1>
      <div className="flex flex-col gap-5">
        {followers.map((follower) => {
          return (
            <div
              key={follower._id}
              className="flex items-center gap-5 cursor-pointer"
              onClick={() => {
                dispatch(getProfile(follower._id));
                navigate(`/profile/${follower._id}`);
              }}
            >
              <Avatar src={follower.profileImage.url} size="lg" />
              <div className="flex flex-col">
                <h2>{follower.fullname}</h2>
                <h2 className="text-gray-400">@{follower.username}</h2>
                <p className="text-gray-500">
                  {follower.bio.length > 50
                    ? follower.bio.substring(0, 25) + "..."
                    : follower.bio}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FollowersPage;
