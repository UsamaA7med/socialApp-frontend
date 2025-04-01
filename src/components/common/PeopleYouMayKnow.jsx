import { Card, CardFooter, Image, Button } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, suggestedPeople } from "../../store/authSlice/thunk";
import { useEffect } from "react";
import { getProfile, toggleFollow } from "../../store/profileSlice/thunk";
import { useNavigate } from "react-router-dom";

export default function PeopleYouMayKnow() {
  const { user, suggestedUsers } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(suggestedPeople());
  }, [dispatch]);
  if (suggestedUsers.length === 0) {
    return <></>;
  }
  return (
    <div className="w-1/2 min-w-60 p-4  rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">People You May Know</h2>
      <div className="space-y-3 flex  justify-between gap-5 items-center">
        {suggestedUsers.map((userx) => (
          <div
            key={userx._id}
            className="cursor-pointer"
            onClick={() => {
              dispatch(getProfile(userx._id)).then(() => {
                window.scrollTo({
                  behavior: "smooth",
                  top: 0,
                });
                navigate(`/profile/${userx._id}`);
              });
            }}
          >
            <Card isFooterBlurred className="border-none" radius="lg">
              <Image
                alt="Woman listing to music"
                className="object-cover"
                height={200}
                src={userx.profileImage.url}
                width={200}
              />
              <CardFooter className="justify-between">
                <p>@{userx.username}</p>
                <Button
                  className={
                    user.following.includes(userx._id)
                      ? "bg-transparent text-foreground border-default-200"
                      : ""
                  }
                  color="primary"
                  radius="full"
                  size="sm"
                  variant={
                    user.following.includes(userx._id) ? "bordered" : "solid"
                  }
                  onPress={() => {
                    dispatch(toggleFollow(userx._id)).then((data) => {
                      if (!data.error) {
                        dispatch(getUser());
                      }
                    });
                  }}
                >
                  {user.following.includes(userx._id) ? "Unfollow" : "Follow"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
