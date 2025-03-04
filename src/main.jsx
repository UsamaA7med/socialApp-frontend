import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HeroUIProvider } from "@heroui/react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";

createRoot(document.getElementById("root")).render(
  <HeroUIProvider>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </HeroUIProvider>
);
