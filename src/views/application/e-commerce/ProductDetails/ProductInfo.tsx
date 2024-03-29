import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { Link as RouterLink } from "react-router-dom";

// material-ui
import {
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

// third-party
// third-party
import {
  useFormik,
  Form,
  FormikProvider,
  useField,
  FieldHookConfig,
} from "formik";
import * as yup from "yup";

// project imports
import Chip from "../../../../ui-component/extended/Chip";
import Avatar from "../../../../ui-component/extended/Avatar";
import { Products } from "../types";
import { ADD_PRODUCTS, SNACKBAR_OPEN } from "../../../../store/actions";

// assets
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarTwoToneIcon from "@mui/icons-material/StarTwoTone";
import StarBorderTwoToneIcon from "@mui/icons-material/StarBorderTwoTone";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import useAuth from "../../../../hooks/useAuth";

// product size
// const sizeOptions = [8, 10, 12, 14, 16, 18, 20];

const validationSchema = yup.object({
  color: yup.string().required("Color selection is required"),
  size: yup.number().required("Size selection is required."),
});

// ==============================|| COLORS OPTION ||============================== //

const Increment = (props: string | FieldHookConfig<any> | any) => {
  const [field, , helpers] = useField(props);

  const { value } = field;
  const { setValue } = helpers;
  return (
    <ButtonGroup
      size="large"
      variant="text"
      color="inherit"
      sx={{ border: "1px solid", borderColor: "grey.400" }}
    >
      <Button
        key="three"
        disabled={value <= 1}
        onClick={() => setValue(value - 1)}
        sx={{ pr: 0.75, pl: 0.75, minWidth: "0px !important" }}
      >
        <RemoveIcon fontSize="inherit" />
      </Button>
      <Button key="two" sx={{ pl: 0.5, pr: 0.5 }}>
        {value}
      </Button>
      <Button
        key="one"
        disabled={value >= props.quantity}
        onClick={() => setValue(value + 1)}
        sx={{ pl: 0.75, pr: 0.75, minWidth: "0px !important" }}
      >
        <AddIcon fontSize="inherit" />
      </Button>
    </ButtonGroup>
  );
};

// ==============================|| PRODUCT DETAILS - INFORMATION ||============================== //

const ProductInfo = ({ product }: { product: Products }) => {
  const dispatch = useDispatch();
  console.log(product._id);

  const history = useNavigate();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: product._id,
      name: product.productName,
      image: product.image,
      salePrice: product.salePrice,
      offerPrice: product.offerPrice,
      color: "",
      size: "",
      quantity: 1,
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch({ type: ADD_PRODUCTS, product: values });
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: "Submit Success",
        variant: "alert",
        alertSeverity: "success",
      });
      history("/e-commerce/checkout");
    },
  });

  const { values, handleSubmit } = formik;

  const addCart = () => {
    if (isLoggedIn) {
      console.log(values);
      values.color = values.color ? values.color : "primaryDark";
      values.size = values.size ? values.size : "8";
      dispatch({ type: ADD_PRODUCTS, product: values });
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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Chip
                size="small"
                label={
                  product.stock && product.quantity >= 1
                    ? "In Stock"
                    : "Out of Stock"
                }
                chipcolor={
                  product.stock && product.quantity >= 1 ? "success" : "error"
                }
                sx={{ borderRadius: "4px", textTransform: "capitalize" }}
              />
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h3">{product?.productName}</Typography>
                <Chip
                  size="small"
                  label="New"
                  chipcolor="primary"
                  variant="outlined"
                />
              </Stack>
            </Grid>
          </Grid>
          <Avatar
            variant="rounded"
            sx={{ bgcolor: "grey.200", color: "grey.800" }}
          >
            <FavoriteBorderIcon />
          </Avatar>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">{product?.subDescription}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Rating
            name="simple-controlled"
            value={product.rating}
            icon={<StarTwoToneIcon fontSize="inherit" />}
            emptyIcon={<StarBorderTwoToneIcon fontSize="inherit" />}
            precision={0.1}
            readOnly
          />
          <Typography variant="caption">({product.salePrice}+)</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h2" color="primary">
            Rs {product?.offerPrice}
          </Typography>
          <Typography variant="body1" sx={{ textDecoration: "line-through" }}>
            Rs {product?.salePrice}
          </Typography>
          <Typography variant="caption">(Inclusive of all taxes)</Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={10}>
                <Table>
                  <TableBody
                    sx={{ "& .MuiTableCell-root": { borderBottom: "none" } }}
                  >
                    <TableRow>
                      <TableCell>
                        <Typography variant="body2">Quantity</Typography>
                      </TableCell>
                      <TableCell align="left">
                        <Increment
                          name="quantity"
                          quantity={product.quantity}
                          stock={product.stock}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      disabled={product.quantity < 1}
                      color="primary"
                      variant="contained"
                      size="large"
                      startIcon={<ShoppingCartTwoToneIcon />}
                      onClick={addCart}
                    >
                      Add to Cart
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      disabled={product.quantity < 1}
                      component={Link}
                      to="/checkout"
                      color="secondary"
                      variant="contained"
                      size="large"
                      onClick={addCart}
                    >
                      Buy Now
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Grid>
    </Grid>
  );
};

export default ProductInfo;
