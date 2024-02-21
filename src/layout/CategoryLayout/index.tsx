import { Outlet } from "react-router-dom";

// project imports
import AppBar from "../../ui-component/extended/AppBar";
import Footer from "../../views/pages/landing/Footer";
import { styled } from "@mui/material";
// ==============================|| MINIMAL LAYOUT ||============================== //

const HeaderWrapper = styled("div")(({ theme }) => ({
  overflowX: "hidden",
  overflowY: "clip",
  [theme.breakpoints.down("md")]: {
    paddingTop: 20,
  },
  paddingTop: 42,
  paddingBottom: 90,
}));

const SecondWrapper = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    paddingTop: 15,
  },
  [theme.breakpoints.down("sm")]: {
    paddingTop: 100,
    paddingBottom: 100,
  },
}));

const CategoryLayout = () => (
  <>
    <HeaderWrapper id="home">
      <AppBar />
    </HeaderWrapper>
    <SecondWrapper>
      <Outlet />
    </SecondWrapper>
    <Footer />
  </>
);

export default CategoryLayout;
