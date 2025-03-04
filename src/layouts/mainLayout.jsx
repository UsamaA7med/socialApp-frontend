import { Outlet } from "react-router-dom";
import NavBar from "../components/common/navbar";

const MainLayout = () => {
  return (
    <div className="w-full min-h-screen">
      <NavBar />
      <div className="container mx-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
