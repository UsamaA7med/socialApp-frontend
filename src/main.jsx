import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";

import store from "./store/store.js";
import Providers from "./providers.jsx";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Providers>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </Providers>
);
