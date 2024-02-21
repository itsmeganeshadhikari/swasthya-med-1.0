import React, { ReactElement } from "react";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
  AppBar as MuiAppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
  Grid,
  Badge,
} from "@mui/material";

// project imports
// import Logo from "../../ui-component/Logo";

// assets
import {
  IconMenuOrder,
  IconUpload,
} from "@tabler/icons-react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchSection from "../../layout/MainLayout/Header/SearchSection";
import LogoSection from "../../layout/MainLayout/LogoSection";
import ProfileSection from "../../layout/MainLayout/Header/ProfileSection";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import { useSelector } from "react-redux";
import { DefaultRootStateProps } from "../../types";
import { CartProductStateProps } from "../../types/cart";
import { sum } from "lodash";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import PerfectScrollbar from 'react-perfect-scrollbar';
import CategoryMenu from "../../layout/MainLayout/Sidebar/MenuList/CategoryMenu";

// elevation scroll
export interface ElevationScrollProps {
  children: ReactElement;
  window?: Window | Node;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 3,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

function ElevationScroll(props: ElevationScrollProps) {
  const { children, window } = props;
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window!,
  });
  const darkBorder =
    theme.palette.mode === "dark"
      ? theme.palette.dark.dark
      : theme.palette.grey[200];

  return React.cloneElement(children, {
    elevation: trigger ? 2 : 0,
    style: {
      backgroundColor: "rgb(216 216 216)",
      borderBottom: trigger ? "none" : "1px solid",
      borderColor: trigger ? "" : darkBorder,
      color: theme.palette.text.dark,
      height: '20vh',
      paddingTop: '15px',
    },
  });
}

// ==============================|| MINIMAL LAYOUT APP BAR ||============================== //

const AppBar = ({ ...others }) => {
  const { user, isLoggedIn, logout } = useAuth();
  const cart = useSelector((state: DefaultRootStateProps) => state.cart);
  const totalQuantity = sum(
    cart.checkout.products.map((item: CartProductStateProps) => item.quantity)
  );

  const [drawerToggle, setDrawerToggle] = React.useState<boolean>(false);
  /** Method called on multiple components with different event types */
  const drawerToggler = (open: boolean) => (event: any) => {
    if (
      event.type! === "keydown" &&
      (event.key! === "Tab" || event.key! === "Shift")
    ) {
      return;
    }
    setDrawerToggle(open);
  };

  return (
    <ElevationScroll {...others}>
      <MuiAppBar>
        <Container>
          <Toolbar>
            <Typography component="div" sx={{ flexGrow: 1, textAlign: "left" }}>
              <LogoSection />
            </Typography>
            <Grid mr={2}>
              <Grid item xs={12} md={5}>
                <SearchSection />
              </Grid>
            </Grid>
            <Stack
              direction="row"
              sx={{ display: { xs: "none", sm: "block" } }}
              spacing={2}
            >
              <Button
                color="secondary"
                variant="contained"
                component={Link}
                to="/"
                target="_blank"
                disabled
                startIcon={<IconUpload />}
              >
                Upload Prescription
              </Button>
              <Button
                color="secondary"
                component={Link}
                to="/checkout"
                startIcon={
                  <StyledBadge
                    showZero
                    badgeContent={totalQuantity}
                    color="error"
                  >
                    <ShoppingCartTwoToneIcon sx={{ color: "secondary" }} />
                  </StyledBadge>
                }
              >
                Cart
              </Button>
              <Button color="secondary" variant="outlined" component={Link} to="/" target="_blank" disabled>
                About us
              </Button>
              {isLoggedIn ? (
                <ProfileSection />
              ) : (
                <Button
                  component={Link}
                  to="/login"
                  disableElevation
                  variant="contained"
                  color="secondary"
                >
                  Account
                </Button>
              )}
            </Stack>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton
                color="inherit"
                onClick={drawerToggler(true)}
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerToggle}
                onClose={drawerToggler(false)}
              >
                <Box
                  sx={{
                    width: "auto",
                  }}
                  role="presentation"
                  onClick={drawerToggler(false)}
                  onKeyDown={drawerToggler(false)}
                >
                  <List>
                    <ListItemButton component="a">
                      <Button color="inherit" fullWidth variant="outlined" component={Link} to="/" target="_blank" sx={{ padding: '20px' }}>
                        <LogoSection />
                      </Button>
                    </ListItemButton>
                    <ListItemButton component="a">
                      {isLoggedIn ? (
                        <div>
                          <Button color="secondary" variant="text" component={Link} to="/login" target="_blank">
                            {user?.email}
                          </Button>
                          <Button color="secondary" variant="outlined" component="a" target="_blank" onClick={logout} sx={{ marginX: '5px' }}>
                            Logout
                          </Button>
                        </div>
                      ) : (
                        <Button
                          component={Link}
                          to="/login"
                          fullWidth
                          disableElevation
                          variant="contained"
                          color="secondary"
                        >
                          Login
                        </Button>
                      )}
                    </ListItemButton>
                    <ListItemButton component="a">
                      <Button
                        color="secondary"
                        fullWidth
                        variant="contained"
                        component={Link}
                        to="/myorder"
                        target="_blank"
                        startIcon={<IconMenuOrder />}
                      >
                        My orders
                      </Button>
                    </ListItemButton>
                    <ListItemButton component="a">
                      <Button
                        color="secondary"
                        fullWidth
                        variant="contained"
                        component={Link}
                        to="/"
                        target="_blank"
                        disabled
                        startIcon={<IconUpload />}
                      >
                        Upload Prescription
                      </Button>
                    </ListItemButton>
                    <ListItemButton component="a">
                      <Button fullWidth color="secondary" variant="contained" component={Link} to="/" target="_blank" disabled>
                        About us
                      </Button>
                    </ListItemButton>
                    <ListItemButton component="a">
                      <Button
                        color="secondary"
                        component={Link}
                        to="/checkout"
                        fullWidth
                        variant="contained"
                        startIcon={
                          <StyledBadge
                            showZero
                            badgeContent={totalQuantity}
                            color="error"
                          >
                            <ShoppingCartTwoToneIcon sx={{ color: "secondary" }} />
                          </StyledBadge>
                        }
                      >
                        Cart
                      </Button>
                    </ListItemButton>
                    <ListItemButton component="a">
                      <Button fullWidth color="secondary" variant="contained" component={Link} to="/register" target="_blank">
                        Sign up
                      </Button>
                    </ListItemButton>
                  </List>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
        <Container>
          <Grid xs={4}>
            <BrowserView>
              <PerfectScrollbar
                component="div"
                style={{
                  top: 92,
                  height: '42vh',
                  width: "12.2%",
                  position: 'absolute',
                }}
              >
                <CategoryMenu />
              </PerfectScrollbar>
            </BrowserView>
            <MobileView>
              <Box sx={{ px: 2 }}>
                <CategoryMenu />
              </Box>
            </MobileView>
          </Grid>
        </Container>
      </MuiAppBar>
    </ElevationScroll>
  );
};

export default AppBar;
