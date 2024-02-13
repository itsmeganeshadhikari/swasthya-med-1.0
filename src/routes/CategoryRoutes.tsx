import { lazy } from "react";

// project imports
import Loadable from "../ui-component/Loadable";
import CategoryLayout from "../layout/CategoryLayout";
// application e-commerce pages
const AppECommProducts = Loadable(
    lazy(() => import("../views/application/e-commerce/Products"))
);

// ==============================|| MAIN ROUTING ||============================== //

const CategoryRoutes = {
    path: "/",
    element: (
        <CategoryLayout />
    ),
    children: [
        {
            path: "/categories/family-care",
            element: <AppECommProducts />,
        }
    ],
};

export default CategoryRoutes;
