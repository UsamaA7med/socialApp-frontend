import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { checkAuth } from "../../store/authSlice/thunk";
import { Spinner } from "@heroui/react";

const CheckAuth = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector(
    (state) => state.authSlice
  );
  const dispatch = useDispatch();
  const location = useLocation().pathname;

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  }
  if (isAuthenticated && location.includes("auth")) {
    return <Navigate to={"/"} />;
  }
  if (!isAuthenticated && !location.includes("auth")) {
    return <Navigate to={"/auth/login"} />;
  }
  return <>{children}</>;
};

export default CheckAuth;
