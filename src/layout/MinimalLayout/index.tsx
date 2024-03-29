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
  marginBottom: 30
}));

const SecondWrapper = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    paddingTop: 15,
  },
  [theme.breakpoints.down("sm")]: {
    paddingTop: 100,
    paddingBottom: 100,
  },
  paddingTop: 30
}));

const MinimalLayout = () => (
  <>
    <HeaderWrapper id="home">
      <AppBar />
    </HeaderWrapper>
    <SecondWrapper>
      <Outlet />
    </SecondWrapper>
    {/* <Customization /> */}
    <Footer />
  </>
);

export default MinimalLayout;
