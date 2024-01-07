import React, { ReactElement } from "react";
import { Link as RouterLink } from "react-router-dom";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import {
  AppBar as MuiAppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
  IconBook,
  IconHome2,
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
      backgroundColor: "whiteSmoke",
      borderBottom: trigger ? "none" : "1px solid",
      borderColor: trigger ? "" : darkBorder,
      color: theme.palette.text.dark,
    },
  });
}

// ==============================|| MINIMAL LAYOUT APP BAR ||============================== //

const AppBar = ({ ...others }) => {
  const { isLoggedIn } = useAuth();
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
                color="inherit"
                component={Link}
                href="/"
                target="_blank"
                startIcon={<IconUpload />}
              >
                Upload Prescription
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/checkout"
                target="_blank"
                startIcon={
                  <StyledBadge
                    showZero
                    badgeContent={totalQuantity}
                    color="error"
                  >
                    <ShoppingCartTwoToneIcon sx={{ color: "grey.800" }} />
                  </StyledBadge>
                }
              >
                Cart
              </Button>
              <Button color="inherit" component={Link} href="/" target="_blank">
                About us
              </Button>

              {isLoggedIn ? (
                <ProfileSection />
              ) : (
                <Button
                  component={Link}
                  href="/login"
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
                anchor="top"
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
                    <Link
                      style={{ textDecoration: "none" }}
                      href="#"
                      target="_blank"
                    >
                      <ListItemButton component="a">
                        <ListItemIcon>
                          <IconHome2 />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                      </ListItemButton>
                    </Link>
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/"
                      target="_blank"
                    >
                      <ListItemButton component="a">
                        <ListItemIcon>
                          <IconUpload />
                        </ListItemIcon>
                        <ListItemText primary="Upload Prescription" />
                      </ListItemButton>
                    </Link>
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/"
                      target="_blank"
                    >
                      <ListItemButton component="a">
                        <ListItemIcon>
                          <IconBook />
                        </ListItemIcon>
                        <ListItemText primary="About us" />
                      </ListItemButton>
                    </Link>
                    <Link
                      style={{ textDecoration: "none" }}
                      href="/checkout"
                      target="_blank"
                    >
                      <ListItemButton component="a">
                        <ListItemIcon>
                          <ShoppingCartTwoToneIcon />
                        </ListItemIcon>
                        <ListItemText primary="Cart" />
                      </ListItemButton>
                    </Link>
                  </List>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </ElevationScroll>
  );
};

export default AppBar;
