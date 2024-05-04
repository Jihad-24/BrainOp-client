import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import ErrorPage from "../pages/ErrorPage";
import ForgotPassword from "../pages/ForgotPassword ";
import Login from "../pages/Login";
import PostListing from "../pages/PostRelated/PostListing";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        index: true,
        path: "/",
        element: <Register></Register>,
      },
      {
        path: "/postlisting",
        element: (
          <PrivateRoute>
            <PostListing></PostListing>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/forgot",
    element: <ForgotPassword></ForgotPassword>,
  },
]);

export default router;
