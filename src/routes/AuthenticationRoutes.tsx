import { lazy } from "react";

// project imports
import Loadable from "../ui-component/Loadable";
import MinimalLayout from "../layout/MinimalLayout";
import GuestGuard from "../utils/route-guard/GuestGuard";

// login option 3 routing
const AuthLogin3 = Loadable(
  lazy(() => import("../views/pages/authentication/authentication3/Login3"))
);
const AuthRegister3 = Loadable(
  lazy(() => import("../views/pages/authentication/authentication3/Register3"))
);
const AuthForgotPassword3 = Loadable(
  lazy(
    () =>
      import("../views/pages/authentication/authentication3/ForgotPassword3")
  )
);
const AuthCheckMail3 = Loadable(
  lazy(() => import("../views/pages/authentication/authentication3/CheckMail3"))
);
const AuthResetPassword3 = Loadable(
  lazy(
    () => import("../views/pages/authentication/authentication3/ResetPassword3")
  )
);

// landing & contact-us routing
const PagesLanding = Loadable(lazy(() => import("../views/pages/landing")));
// routes

const AppECommProductDetails = Loadable(
  lazy(() => import("../views/application/e-commerce/ProductDetails"))
);
// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/landing",
      element: <PagesLanding />,
    },
    {
      path: "/product-details/:id",
      element: (
        <>
          <AppECommProductDetails />
        </>
      ),
    },
  ],
};

export default AuthenticationRoutes;
