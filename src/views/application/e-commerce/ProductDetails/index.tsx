import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { Box, Grid, Stack, Tab, Tabs } from "@mui/material";

// project imports
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import ProductReview from "./ProductReview";
import MainCard from "../../../../ui-component/cards/MainCard";
import FloatingCart from "../../../../ui-component/cards/FloatingCart";
import Chip from "../../../../ui-component/extended/Chip";
import { Products } from "../types";
import { DefaultRootStateProps } from "../../../../types";
import { RESET_CART } from "../../../../store/actions";
import { gridSpacing } from "../../../../store/constant";
import ProductDescription from "./ProductDescription";
import { useMutation } from "@apollo/client";
import { GET_PRODUCTS_ID } from "../../../../utils/mutations/productMutation";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-details-tabpanel-${index}`}
      aria-labelledby={`product-details-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `product-details-tab-${index}`,
    "aria-controls": `product-details-tabpanel-${index}`,
  };
}

const ProductDetails = () => {
  const { id } = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: DefaultRootStateProps) => state.cart);
  const [getProducts] = useMutation(GET_PRODUCTS_ID);
  // product description tabs
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [product, setProduct] = React.useState<Products | null>(null);
  const getProductData = async () => {
    const response = await getProducts({ variables: { input: id } })
    console.log(response);

    setProduct(response.data?.getProduct.product);
    if (id === "default") {
      history(`/e-commerce/product-details/1`);
    }
  };

  React.useEffect(() => {
    getProductData();
    // clear cart if complete order
    if (cart.checkout.step > 2) {
      dispatch({ type: RESET_CART });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // <Container>
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      spacing={gridSpacing}
    >
      <Grid item xs={12} lg={10} marginTop={12}>
        <MainCard>
          {product && (
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} md={6}>
                <ProductImages product={product} />
              </Grid>
              <Grid item xs={12} md={6}>
                <ProductInfo product={product} />
              </Grid>
              <Grid item xs={12}>
                <Tabs
                  value={value}
                  indicatorColor="primary"
                  onChange={handleChange}
                  aria-label="product description tabs example"
                  variant="scrollable"
                >
                  <Tab
                    component={Link}
                    to="#"
                    label="Description"
                    {...a11yProps(0)}
                  />
                  <Tab
                    component={Link}
                    to="#"
                    label={
                      <Stack direction="row" alignItems="center">
                        Reviews
                        <Chip
                          label={String(product.salePrice)}
                          size="small"
                          chipcolor="secondary"
                          sx={{ ml: 1.5 }}
                        />
                      </Stack>
                    }
                    {...a11yProps(1)}
                  />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <ProductDescription product={product} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <ProductReview product={product} />
                </TabPanel>
              </Grid>
            </Grid>
          )}
        </MainCard>
      </Grid>
      {/* <Grid item xs={12} lg={10} sx={{ mt: 3 }}>
        <Typography variant="h2">Related Products</Typography>
      </Grid>
      <Grid item xs={11} lg={10}>
        <RelatedProducts id={id} />
      </Grid> */}
      <FloatingCart />
    </Grid>
    // </Container>
  );
};

export default ProductDetails;
