import { lazy } from "react";

// project imports
import Loadable from "../ui-component/Loadable";
import MinimalLayout from "../layout/MinimalLayout";
// landing & contact-us routing
const PagesLanding = Loadable(lazy(() => import("../views/pages/landing")));
// routes

const AppECommProductDetails = Loadable(
  lazy(() => import("../views/application/e-commerce/ProductDetails"))
);

const AppOrderDetails = Loadable(
  lazy(() => import("../views/application/e-commerce/Checkout/OrderDetails"))
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
      path: "/components/autocomplete",
      element: <PagesLanding />,
    },
    {
      path: "/myorder",
      element: <AppOrderDetails />,
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
