// project imports
import Header from "./Header";
import Loadable from "../../../ui-component/Loadable";
import { lazy } from "react";

// =============================|| LANDING MAIN ||============================= //

const AppECommProducts = Loadable(
  lazy(() => import("../../../views/application/e-commerce/Products"))
);

const Landing = () => (
  <>
    <Header />
    <AppECommProducts />
  </>
);

export default Landing;
