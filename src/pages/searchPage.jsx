import { Avatar, Input } from "@heroui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getsearchUsers } from "../store/authSlice/thunk";
import { getProfile } from "../store/profileSlice/thunk";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const [searchValue, setSearchValue] = useState(null);
  const { searchUsers } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (searchValue !== "") {
      dispatch(getsearchUsers({ keyword: searchValue }));
    }
  }, [dispatch, searchValue]);
  console.log(searchUsers);
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Input
          placeholder="Type to search..."
          onValueChange={(value) => setSearchValue(value)}
        />
      </div>
      <div className="flex flex-col gap-5">
        <p className="font-bold text-xl">Latest search</p>
        {searchUsers.map((ele) => {
          return (
            <div
              key={ele._id}
              onClick={() => {
                dispatch(getProfile(ele._id)).then(() => {
                  window.scrollTo({
                    behavior: "smooth",
                    top: 0,
                  });
                  navigate(`/profile/${ele._id}`);
                });
              }}
              className="flex cursor-pointer items-center gap-5"
            >
              <Avatar size="lg" src={ele.profileImage.url} />
              <div>
                <h2 className="font-bold">{ele.fullname}</h2>
                <h2>@{ele.username}</h2>
                <p className="text-gray-500">
                  {ele.bio.length > 20
                    ? ele.bio.substring(0, 20) + "..."
                    : ele.bio}
                </p>
                <div className="flex gap-5">
                  <p className="text-gray-500">
                    Followers: {ele.followers.length}
                  </p>
                  <p className="text-gray-500">
                    Following: {ele.following.length}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchPage;
