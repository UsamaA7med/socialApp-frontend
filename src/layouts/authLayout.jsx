import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="container min-h-screen mx-auto">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
