import React from "react";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";

// third party
import { motion } from "framer-motion";

// project imports
import FloatingCart from "../../../../ui-component/cards/FloatingCart";
import { appDrawerWidth, gridSpacing } from "../../../../store/constant";
import ProductCategory from "./ProductCategory";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../../../utils/querys/userQuery";
// import { useQuery } from "@tanstack/react-query";
// import axiosServices from "../../../../utils/axios";

// product list container
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -appDrawerWidth,
  [theme.breakpoints.down("xl")]: {
    paddingRight: 0,
    marginRight: 0,
  },
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

// ==============================|| E-COMMERCE - PRODUCT GRID //

const Products = () => {
  const theme = useTheme();
  const { data, error } = useQuery(GET_PRODUCTS);

  if (error) {
    console.log("error");
  }
  const skinProduct = data?.productlist.products.filter((e: any) => e.category == "Skin");
  const babyProducts = data?.productlist.products.filter((e: any) => e.category == "Baby");
  // const trendingProducts = data?.productlist.products.filter((e: any) => e.category == "Baby");
  // const topBrandProducts = data?.productlist.products.filter((e: any) => e.category == "Skin");
  // let topBrand: React.ReactElement | React.ReactElement[] = <></>;
  let derma: React.ReactElement | React.ReactElement[] = <></>;
  // let trending: React.ReactElement | React.ReactElement[] = <></>;
  let baby: React.ReactElement | React.ReactElement[] = <></>;

  // if (topBrandProducts) {
  //   topBrand = <ProductCategory products={topBrandProducts} />;
  // }

  // if (trendingProducts) {
  //   trending = <ProductCategory products={trendingProducts} />;
  // }

  if (babyProducts) {
    baby = <ProductCategory products={babyProducts} />;
  }

  if (skinProduct) {
    derma = <ProductCategory products={skinProduct} />;
  }

  return (
    <Container>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        spacing={gridSpacing}
        sx={{
          mt: { xs: 2, sm: 3, md: 5 },
          mb: { xs: 2.5, md: 5 },
        }}
      >
        {/* <Grid item xs={12} p={0}>
          <Divider sx={{ my: 0, borderColor: "black" }} />
        </Grid>
        <Grid item xs={12} xl={9}>
          <Grid
            container
            spacing={gridSpacing}
            sx={{
              [theme.breakpoints.down("lg")]: { pr: 0, textAlign: "center" },
              padding: { xs: 5, sm: 2 },
            }}
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
              <Main>
                <Grid item xs={12} md={4} mb={2}>
                  <Grid item xs={12}>
                    <motion.div
                      initial={{ opacity: 0, translateY: 550 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 30,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontSize: {
                            xs: "1.25rem",
                            sm: "1.2rem",
                            md: "1.2rem",
                          },
                          fontWeight: 500,
                          lineHeight: 1.2,
                          color: theme.palette.secondary.main,
                        }}
                      >
                        Top Brand Products
                      </Typography>
                    </motion.div>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={gridSpacing}
                  height={295}
                  marginTop={1}
                  sx={{ overflowX: "auto" }}
                >
                  {topBrand}
                </Grid>
              </Main>
            </Box>
          </Grid>
        </Grid> */}
        {/* <Grid item xs={12} p={0}>
          <Divider sx={{ my: 0, borderColor: "black" }} />
        </Grid>
        <Grid item xs={12} xl={9}>
          <Grid
            container
            spacing={gridSpacing}
            sx={{
              [theme.breakpoints.down("lg")]: { pr: 0, textAlign: "center" },
              padding: { xs: 5, sm: 2 },
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Main>
                <Grid item xs={12} md={5} mb={2}>
                  <Grid item xs={12}>
                    <motion.div
                      initial={{ opacity: 0, translateY: 550 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 30,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontSize: {
                            xs: "1.25rem",
                            sm: "1.2rem",
                            md: "1.2rem",
                          },
                          fontWeight: 500,
                          lineHeight: 1.2,
                          color: theme.palette.secondary.main,
                        }}
                      >
                        Trending Products
                      </Typography>
                    </motion.div>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={gridSpacing}
                  height={300}
                  marginTop={1}
                  sx={{ overflowX: "auto" }}
                >
                  {trending}
                </Grid>
              </Main>
            </Box>
          </Grid>
        </Grid> */}
        <Grid item xs={12} p={0}>
          <Divider sx={{ my: 0, borderColor: "black" }} />
        </Grid>
        <Grid item xs={12} xl={9}>
          <Grid
            container
            spacing={gridSpacing}
            sx={{
              [theme.breakpoints.down("lg")]: { pr: 0, textAlign: "center" },
              padding: { xs: 5, sm: 2 },
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Main>
                <Grid item xs={12} md={5} mb={2}>
                  <Grid item xs={12}>
                    <motion.div
                      initial={{ opacity: 0, translateY: 550 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 30,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontSize: {
                            xs: "1.25rem",
                            sm: "1.2rem",
                            md: "1.2rem",
                          },
                          fontWeight: 500,
                          lineHeight: 1.2,
                          color: theme.palette.secondary.main,
                        }}
                      >
                        Baby Suplements
                      </Typography>
                    </motion.div>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={gridSpacing}
                  height={300}
                  marginTop={1}
                  sx={{ overflowX: "auto" }}
                >
                  {baby}
                </Grid>
              </Main>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} p={0}>
          <Divider sx={{ my: 0, borderColor: "black" }} />
        </Grid>
        <Grid item xs={12} xl={9}>
          <Grid
            container
            spacing={gridSpacing}
            sx={{
              [theme.breakpoints.down("lg")]: { pr: 0, textAlign: "center" },
              padding: { xs: 5, sm: 2 },
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Main>
                <Grid item xs={12} md={5} mb={2}>
                  <Grid item xs={12}>
                    <motion.div
                      initial={{ opacity: 0, translateY: 550 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 30,
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontSize: {
                            xs: "1.25rem",
                            sm: "1.2rem",
                            md: "1.2rem",
                          },
                          fontWeight: 500,
                          lineHeight: 1.2,
                          color: theme.palette.secondary.main,
                        }}
                      >
                        Skin and Care
                      </Typography>
                    </motion.div>
                  </Grid>
                </Grid>
                <Grid
                  container
                  spacing={gridSpacing}
                  height={300}
                  marginTop={1}
                  sx={{ overflowX: "auto" }}
                >
                  {derma}
                </Grid>
              </Main>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12} p={0}>
          <Divider sx={{ my: 0, borderColor: "black" }} />
        </Grid>
        <FloatingCart />
      </Grid>
    </Container>
  );
};

export default Products;
