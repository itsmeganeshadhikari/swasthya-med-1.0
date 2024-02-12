import React from "react";
import { useDispatch } from "react-redux";

// material-ui
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  RadioGroup,
  Radio,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  CardMedia,
  Card,
} from "@mui/material";

// third-party
// import CurrencyFormat from 'react-currency-format';

// project imports
import OrderSummary from "./OrderSummary";
import AddressCard from "./AddressCard";
import PaymentSelect from "./PaymentSelect";
import PaymentOptions from "./PaymentOptions";
// import PaymentCard from "./PaymentCard";
import AddPaymentCard from "./AddPaymentCard";
import OrderComplete from "./OrderComplete";
import SubCard from "../../../../ui-component/cards/SubCard";
import Avatar from "../../../../ui-component/extended/Avatar";
import {
  SNACKBAR_OPEN,
  SET_PAYMENT_METHOD
} from "../../../../store/actions";
import { gridSpacing } from "../../../../store/constant";

// assets
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { CartCheckoutStateProps } from "../../../../types/cart";
import { PaymentOptionsProps } from "../types";
import FormatPrice from "../../../../ui-component/FormatPrice";

// const prodImage = require.context("../../../../assets/images/e-commerce", true);
import qr from "../../../../assets/images/e-commerce/qr.jpg";
import useAuth from "../../../../hooks/useAuth";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "../../../../utils/mutations/orderMutation";
// ==============================|| CHECKOUT PAYMENT - MAIN ||============================== //

interface PaymentProps {
  checkout: CartCheckoutStateProps;
  onBack: () => void;
  onNext: () => void;
  handleShippingCharge: (type: string) => void;
}

const Payment = ({
  checkout,
  onBack,
  onNext,
  handleShippingCharge,
}: PaymentProps) => {
  const dispatch = useDispatch();

  const [type, setType] = React.useState(checkout.payment.type);
  const [payment, setPayment] = React.useState(checkout.payment.method);
  const [rows, setRows] = React.useState(checkout.products);
  const [cards] = React.useState(checkout.payment.card);
  const { user } = useAuth()
  const productsId: any[] = []
  const [createOrder] = useMutation(CREATE_ORDER);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [complete, setComplete] = React.useState(false)

  React.useEffect(() => {
    setRows(checkout.products);
  }, [checkout.products]);

  const handlePaymentMethod = (value: string) => {
    setPayment(value);
    dispatch({ type: SET_PAYMENT_METHOD, method: value });
  };

  const completeHandler = async () => {
    if (payment === "card" && (cards === "" || cards === null)) {
      dispatch({
        type: SNACKBAR_OPEN,
        open: false,
        message: "Select Payment Card",
        variant: "alert",
        alertSeverity: "error",
      });
    }
    if (checkout.billing == null) {
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: "Select Delivery Address",
        variant: "alert",
        alertSeverity: "error",
      });
    }
    checkout.products.map((e) => {
      productsId.push(e.id)
    })
    const response = await createOrder({
      variables: {
        createOrderInput: {
          user: user?._id,
          method: checkout.payment.method,
          type: checkout.payment.type,
          total: checkout.total,
          subTotal: checkout.subtotal,
          discount: checkout.discount,
          address: checkout.billing?._id,
          product: productsId
        }
      }
    })
    if (response.data) {
      onNext();
      setComplete(true);
    }
    if (response.errors) {
      dispatch({
        type: SNACKBAR_OPEN,
        open: false,
        message: "Select Payment Card",
        variant: "alert",
        alertSeverity: "error",
      });
    }
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} md={6} lg={7} xl={8}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Stack>
              <Typography variant="subtitle1">Delivery Options</Typography>
              <FormControl>
                <RadioGroup
                  row
                  aria-label="delivery-options"
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value);
                    handleShippingCharge(e.target.value);
                  }}
                  name="delivery-options"
                >
                  <Grid
                    container
                    spacing={gridSpacing}
                    alignItems="center"
                    sx={{ pt: 2 }}
                  >
                    <Grid item xs={12} sm={6} md={12} lg={6}>
                      <SubCard content={false}>
                        <Box sx={{ p: 2 }}>
                          <FormControlLabel
                            value="free"
                            control={<Radio />}
                            label={
                              <Stack spacing={0.25}>
                                <Typography variant="subtitle1">
                                  Standard Delivery (Free)
                                </Typography>
                                <Typography variant="caption">
                                  Delivered with in 1-2 days
                                </Typography>
                              </Stack>
                            }
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
                          />
                        </Box>
                      </SubCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={12} lg={6}>
                      <SubCard content={false}>
                        <Box sx={{ p: 2 }}>
                          <FormControlLabel
                            value="fast"
                            control={<Radio />}
                            label={
                              <Stack spacing={0.25}>
                                <Typography variant="subtitle1">
                                  Fast Delivery (Rs.100)
                                </Typography>
                                <Typography variant="caption">
                                  Contact  us: 9863421980
                                </Typography>
                              </Stack>
                            }
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
                          />
                        </Box>
                      </SubCard>
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Payment Options</Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormControl>
              <RadioGroup
                aria-label="delivery-options"
                value={payment}
                onChange={(e) => handlePaymentMethod(e.target.value)}
                name="delivery-options"
              >
                <Grid container spacing={gridSpacing} alignItems="center">
                  {PaymentOptions.map((item: PaymentOptionsProps, index) => (
                    <Grid item xs={12} key={index}>
                      <PaymentSelect item={item} />
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{ opacity: payment === "card" ? 1 : 0.1 }}
          >
            <SubCard
              title="Scan QR to Pay and Upload Transaction"
            >
              <Grid container spacing={gridSpacing}>

                <Grid item xs={12} xl={10}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="350"
                      image={qr}
                      alt="QR"
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} xl={12}>
                  <Button
                    variant="contained"
                    size="medium"
                    startIcon={<AddTwoToneIcon />}
                    onClick={handleClickOpen}
                  >
                    Upload Transaction (Image/Statment)
                  </Button>
                </Grid>

              </Grid>
              <AddPaymentCard open={open} handleClose={handleClose} />
            </SubCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} lg={5} xl={4}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Stack>
              <Typography variant="subtitle1" sx={{ pb: 2 }}>
                Cart Items
              </Typography>
              <TableContainer>
                <Table sx={{ minWidth: 280 }} aria-label="simple table">
                  <TableBody>
                    {rows.map((row, index) => {
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            <Grid container alignItems="center" spacing={2}>
                              <Grid item>
                                <Avatar
                                  size="md"
                                  variant="rounded"
                                  src={
                                    row.image[0].url
                                  }
                                />
                              </Grid>
                              <Grid item>
                                <Stack spacing={0}>
                                  <Typography variant="subtitle1">
                                    {row.name}
                                  </Typography>
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={1}
                                  >
                                    <Typography
                                      variant="subtitle2"
                                      sx={{ fontWeight: 500 }}
                                    >
                                      Size:
                                      <Typography
                                        variant="caption"
                                        component="span"
                                      >
                                        {row.size}
                                      </Typography>
                                    </Typography>
                                  </Stack>
                                </Stack>
                              </Grid>
                            </Grid>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="subtitle1">
                              <FormatPrice
                                price={row.offerPrice * row.quantity}
                              />
                            </Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Grid>
          <Grid item xs={12} mt={5}>
            <OrderSummary
              totalPrice={checkout.total}
              totalQuantity={checkout.total}
            />
          </Grid>
          <Grid item xs={12}>
            <AddressCard
              deleteAddress={() => { }}
              single
              change
              address={checkout.billing}
              onBack={onBack}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Button
              variant="text"
              startIcon={<KeyboardBackspaceIcon />}
              onClick={onBack}
            >
              Back
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={completeHandler}>
              Complete Order
            </Button>
            <OrderComplete open={complete} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Payment;
