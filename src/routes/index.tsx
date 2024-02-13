import { useRoutes } from "react-router-dom";
import LoginRoutes from "./LoginRoutes";
import MainRoutes from "./MainRoutes";
import AuthenticationRoutes from "./AuthenticationRoutes";
import MinimalLayout from "../layout/MinimalLayout";
import Loadable from "../ui-component/Loadable";
import { lazy } from "react";
import EcommerceRoutes from "./EcommerceAuthRoutes";
import CategoryRoutes from "./CategoryRoutes";
const PagesLanding = Loadable(lazy(() => import("../views/pages/landing")));

export default function ThemeRoutes() {
  return useRoutes([
    {
      path: "/",
      element: <MinimalLayout />,
      children: [
        {
          path: "/",
          element: <PagesLanding />,
        },
      ],
    },
    EcommerceRoutes,
    AuthenticationRoutes,
    LoginRoutes,
    MainRoutes,
    CategoryRoutes
  ]);
}
