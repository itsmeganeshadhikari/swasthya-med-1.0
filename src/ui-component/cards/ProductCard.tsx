import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// material-ui
import {
  Button,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

// project import
import MainCard from "./MainCard";
import SkeletonProductPlaceholder from "../../ui-component/cards/Skeleton/ProductPlaceholder";
import { KeyedObject } from "../../types";
import { ADD_PRODUCTS, SNACKBAR_OPEN } from "../../store/actions";

// assets
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import useAuth from "../../hooks/useAuth";

// const prodImage = require.context('assets/images/e-commerce', true);

// ==============================|| PRODUCT CARD ||============================== //

export interface ProductCardProps extends KeyedObject {
  id?: string | number;
  color?: string;
  name: string;
  image: string | any;
  description?: string;
  offerPrice?: number;
  salePrice?: number;
  rating?: number;
}

const ProductCard = ({
  id,
  color,
  name,
  image,
  description,
  offerPrice,
  salePrice,
  rating,
}: ProductCardProps) => {
  const dispatch = useDispatch();
  const prodProfile = image[0].url;
  const [productRating] = React.useState<number | undefined>(rating);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth()

  const addCart = () => {
    if (isLoggedIn) {
      dispatch({
        type: ADD_PRODUCTS,
        product: {
          id,
          name,
          image,
          salePrice,
          offerPrice,
          color,
          size: 8,
          quantity: 1,
        },
      });
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: "Add To Cart Success",
        variant: "alert",
        alertSeverity: "success",
      });
    } else {
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: "You must login to continue",
        variant: "alert",
        alertSeverity: "error",
      });
      navigate("/login", { replace: true });
    }
  };

  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonProductPlaceholder />
      ) : (
        <MainCard
          content={false}
          boxShadow
          sx={{
            "&:hover": {
              transform: "scale3d(1.02, 1.02, 1)",
              transition: "all .4s ease-in-out",
            }
          }}
        >
          <CardMedia
            sx={{
              height: 120,
              width: 100,
              margin: 'auto'
            }}
            title={name}
            image={prodProfile}
            component={Link}
            to={`/product-details/${id}`}
          />
          <CardContent sx={{ p: 0.5, backgroundColor: "whitesmoke" }}>
            <Grid container>
              <Grid item xs={12}>
                <Tooltip title={name} enterDelay={500} leaveDelay={200}>
                  <Typography
                    component={Link}
                    to={`/product-details/${id}`}
                    variant="subtitle1"
                    sx={{ textDecoration: "none" }}
                  >
                    {name.length <= 22 ? name : name.substring(0, 18) + "..."}
                  </Typography>
                </Tooltip>
              </Grid>
              {description && (
                <Grid item xs={12}>
                  <Tooltip
                    title={description}
                    enterDelay={500}
                    leaveDelay={200}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        overflow: "scroll",
                        height: 20,
                      }}
                    >
                      {description}
                    </Typography>
                  </Tooltip>
                </Grid>
              )}
              <Grid item xs={12} sx={{ pt: "1px !important" }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Rating
                    precision={0.5}
                    name="size-small"
                    value={productRating}
                    size="small"
                    readOnly
                  />
                  <Typography variant="caption">({offerPrice}+)</Typography>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid container spacing={1}>
                    <Grid item>
                      <Typography variant="h4">Rs {offerPrice}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "grey.500",
                          textDecoration: "line-through",
                        }}
                      >
                        Rs {salePrice}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    sx={{ minWidth: 0 }}
                    onClick={addCart}
                  >
                    <ShoppingCartTwoToneIcon fontSize="small" />
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </MainCard>
      )}
    </>
  );
};

export default ProductCard;
