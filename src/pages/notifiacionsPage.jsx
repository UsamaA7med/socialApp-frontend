import { Avatar } from "@heroui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/authSlice/thunk";

const NotificaionsPage = () => {
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
    <div className="flex flex-col gap-5">
      {user.notifications.map((notification) => {
        return (
          <div key={notification._id} className="flex gap-2 items-start">
            <Avatar
              radius="full"
              size="sm"
              src={notification.from.profileImage.url}
            />
            <div>
              <h5 className="text-small font-semibold leading-none text-default-600">
                {notification.from.username}
              </h5>
              <p className="text-small tracking-tight text-default-400">
                {notification.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NotificaionsPage;
