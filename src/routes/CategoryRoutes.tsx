import { lazy } from "react";

// project imports
import Loadable from "../ui-component/Loadable";
import CategoryLayout from "../layout/CategoryLayout";
// application e-commerce pages
const CategoryProduct = Loadable(
    lazy(() => import("../views/application/e-commerce/Products/CategoryProduct"))
);

// ==============================|| MAIN ROUTING ||============================== //

const CategoryRoutes = {
    path: "/",
    element: (
        <CategoryLayout />
    ),
    children: [
        {
            path: "/products?/:productName",
            element: <CategoryProduct />,
        }
    ],
};

export default CategoryRoutes;
