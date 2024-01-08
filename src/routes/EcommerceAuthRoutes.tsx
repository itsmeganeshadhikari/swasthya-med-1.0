import { lazy } from "react";

// project imports
import Loadable from "../ui-component/Loadable";
import MinimalLayout from "../layout/MinimalLayout";
import AuthGuard from "../utils/route-guard/AuthGuard";

const AppECommCheckout = Loadable(
  lazy(() => import("../views/application/e-commerce/Checkout"))
);

const EcommerceRoutes = {
  path: "/",

  element: (
    <AuthGuard>
      <MinimalLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: "/checkout",
      element: <AppECommCheckout />,
    }
  ],
};

export default EcommerceRoutes;
