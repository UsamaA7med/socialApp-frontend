import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/mainLayout";
import App from "../App";
import NotificaionsPage from "../pages/notifiacionsPage";
import NotFoundPage from "../pages/notFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "/notifications", element: <NotificaionsPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;
