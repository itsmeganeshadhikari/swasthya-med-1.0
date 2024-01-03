import { lazy } from "react";

// project imports
import MainLayout from "../layout/MainLayout";
import Loadable from "../ui-component/Loadable";
import AuthGuard from "../utils/route-guard/AuthGuard";
import RoleGuard from "../utils/route-guard/RoleGuard";
// application e-commerce pages
const AppECommProducts = Loadable(
  lazy(() => import("../views/application/e-commerce/Products"))
);
const AppECommProductDetails = Loadable(
  lazy(() => import("../views/application/e-commerce/ProductDetails"))
);
const AppECommProductList = Loadable(
  lazy(() => import("../views/application/e-commerce/ProductList"))
);
const AppECommCheckout = Loadable(
  lazy(() => import("../views/application/e-commerce/Checkout"))
);

const AppECommProductEntry = Loadable(
  lazy(() => import("../views/application/e-commerce/ProductEntry"))
);
const FrmWysiwugEditor = Loadable(
  lazy(() => import("../views/forms/plugins/WysiwugEditor"))
);

const FrmFormsWizard = Loadable(
  lazy(() => import("../views/forms/forms-wizard"))
);

const SamplePage = Loadable(lazy(() => import("../views/sample-page")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: (
    <AuthGuard>
      <RoleGuard>
        <MainLayout />
      </RoleGuard>
    </AuthGuard>
  ),
  children: [
    {
      path: "/sample-page",
      element: <SamplePage />,
    },
    {
      path: "/e-commerce/products",
      element: <AppECommProducts />,
    },
    {
      path: "/e-commerce/product-details/:id",
      element: <AppECommProductDetails />,
    },
    {
      path: "/e-commerce/product-list",
      element: <AppECommProductList />,
    },
    {
      path: "/e-commerce/checkout",
      element: <AppECommCheckout />,
    },
    {
      path: "/forms/frm-wysiwug",
      element: <FrmWysiwugEditor />,
    },
    {
      path: "/forms/forms-wizard",
      element: <FrmFormsWizard />,
    },
    {
      path: "/e-commerce/product-entry",
      element: <AppECommProductEntry />,
    },
  ],
};

export default MainRoutes;
