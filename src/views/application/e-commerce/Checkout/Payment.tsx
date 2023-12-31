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
import ColorOptions from "../ColorOptions";
import PaymentOptions from "./PaymentOptions";
// import PaymentCard from "./PaymentCard";
import AddPaymentCard from "./AddPaymentCard";
import OrderComplete from "./OrderComplete";
import SubCard from "../../../../ui-component/cards/SubCard";
import Avatar from "../../../../ui-component/extended/Avatar";
import {
  SNACKBAR_OPEN,
  SET_PAYMENT_METHOD,
  SET_PAYMENT_CARD,
} from "../../../../store/actions";
import { gridSpacing } from "../../../../store/constant";

// assets
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { CartCheckoutStateProps } from "../../../../types/cart";
import { PaymentOptionsProps } from "../types";
import FormatPrice from "../../../../ui-component/FormatPrice";

// const prodImage = require.context("../../../../assets/images/e-commerce", true);
import qr from "../../../../assets/images/e-commerce/qrcode.png";
import axios from "../../../../utils/axios";
import { useSearchParams } from "react-router-dom";
// product color select
function getColor(color: string) {
  return ColorOptions.filter((item) => item.value === color);
}

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
  const [cards, setCards] = React.useState(checkout.payment.card);

  const [searchParams] = useSearchParams();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [complete, setComplete] = React.useState(false);
  React.useEffect(() => {
    if (searchParams.size > 0) {
      //verify transaction api
      const response = axios.post("/api/khalti/lookup", {
        pidx: `${searchParams.get("pidx")}`,
      });
    }
    // if (checkout.step > 2) {
    //   setComplete(true);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setRows(checkout.products);
  }, [checkout.products]);

  const cardHandler = (card: string) => {
    if (payment === "card") {
      setCards(card);
      dispatch({ type: SET_PAYMENT_CARD, card });
    }
  };

  const handlePaymentMethod = (value: string) => {
    setPayment(value);
    dispatch({ type: SET_PAYMENT_METHOD, method: value });
  };

  const completeHandler = async () => {
    if (payment === "Khalti") {
      const resData = await axios.post("/api/khalti/", {
        return_url: "http://localhost:5173/checkout/",
        website_url: "http://localhost:5173/",
        amount: 1300,
        purchase_order_id: "test12",
        purchase_order_name: "test",
        customer_info: {
          name: "Ashim Upadhaya",
          email: "example@gmail.com",
          phone: "9811496763",
        },
        amount_breakdown: [
          {
            label: "Mark Price",
            amount: 1000,
          },
          {
            label: "VAT",
            amount: 300,
          },
        ],
        product_details: [
          {
            identity: "1234567890",
            name: "Khalti logo",
            total_price: 1300,
            quantity: 1,
            unit_price: 1300,
          },
        ],
      });
      window.location.href = resData.data.data.payment_url;
    }
    if (payment === "card" && (cards === "" || cards === null)) {
      dispatch({
        type: SNACKBAR_OPEN,
        open: true,
        message: "Select Payment Card",
        variant: "alert",
        alertSeverity: "error",
      });
    } else {
      onNext();
      setComplete(true);
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
                                  Contact tor your time: 9863421980
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
            sx={{ opacity: payment === "card" ? 1 : 0.4 }}
          >
            <SubCard
              title="Add Your Card"
              secondary={
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<AddTwoToneIcon />}
                  onClick={handleClickOpen}
                >
                  Add Card
                </Button>
              }
            >
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} xl={12}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="250"
                      image={qr}
                      alt="Paella dish"
                    />
                  </Card>
                </Grid>
                <Grid item xs={12} xl={12}>
                  <Typography variant="h5" ml={2} color="primary">
                    Scan QR to Pay
                  </Typography>
                </Grid>
              </Grid>
              <AddPaymentCard open={open} handleClose={handleClose} />
            </SubCard>
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
                <Button variant="contained" onClick={completeHandler}>
                  Complete Order
                </Button>
                <OrderComplete open={complete} />
              </Grid>
            </Grid>
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
                      const colorsData = row.color
                        ? getColor(row.color)
                        : false;
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
                                    row.image
                                    // ? prodImage(`./${row.image}`).default
                                    // : ""
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
                                      Size:{" "}
                                      <Typography
                                        variant="caption"
                                        component="span"
                                      >
                                        {row.size}
                                      </Typography>
                                    </Typography>
                                    <Typography
                                      variant="caption"
                                      sx={{ fontSize: "1rem" }}
                                    >
                                      |
                                    </Typography>
                                    <Typography
                                      variant="subtitle2"
                                      sx={{ fontWeight: 500 }}
                                    >
                                      Color:
                                      <Typography
                                        variant="caption"
                                        component="span"
                                      >
                                        {colorsData
                                          ? colorsData[0].label
                                          : "Multicolor"}
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
          <Grid item xs={12}>
            <OrderSummary
              totalPrice={checkout.total}
              totalQuantity={checkout.total}
            />
          </Grid>
          <Grid item xs={12}>
            <AddressCard
              deleteAddress={() => {}}
              single
              change
              address={checkout.billing}
              onBack={onBack}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Payment;
