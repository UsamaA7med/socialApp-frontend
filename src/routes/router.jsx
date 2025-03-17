import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/mainLayout";
import App from "../App";
import NotificaionsPage from "../pages/notifiacionsPage";
import NotFoundPage from "../pages/notFoundPage";
import ProfilePage from "../pages/profilePage";
import SignupPage from "../pages/signupPage";
import AuthLayout from "../layouts/authLayout";
import LoginPage from "../pages/loginPage";
import CheckAuth from "../components/common/checkAuth";
import MyProfilePage from "../pages/profilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <CheckAuth>
        <MainLayout />
      </CheckAuth>
    ),
    children: [
      { index: true, element: <App /> },
      { path: "notifications", element: <NotificaionsPage /> },
      { path: "profile/:id", element: <ProfilePage /> },
    ],
  },
  {
    path: "/auth/",
    element: (
      <CheckAuth>
        <AuthLayout />
      </CheckAuth>
    ),
    children: [
      { path: "signup", element: <SignupPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
