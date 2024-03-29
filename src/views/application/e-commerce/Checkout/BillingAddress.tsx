import React from "react";

// material-ui
import { Button, Grid, Stack, Typography } from "@mui/material";

// project imports
import AddAddress from "./AddAddress";
import OrderSummary from "./OrderSummary";
import AddressCard from "./AddressCard";
import { gridSpacing } from "../../../../store/constant";

import { sum } from "lodash";

// assets
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AddIcon from "@mui/icons-material/Add";
import { Address } from "../types";
import { CartCheckoutStateProps } from "../../../../types/cart";

// ==============================|| CHECKOUT BILLING ADDRESS - MAIN ||============================== //

interface BillingAddressProps {
  address: Address[];
  checkout: CartCheckoutStateProps;
  onBack: () => void;
  deleteAddress: (id: string | number) => void;
  addAddress: (address: Address) => void;
  editAddress: (address: Address) => void;
  billingAddressHandler: (billingAddress: Address | null) => void;
}

const BillingAddress = ({
  checkout,
  onBack,
  billingAddressHandler,
  address,
  deleteAddress,
  addAddress,
  editAddress,
}: BillingAddressProps) => {
  const [select, setSelect] = React.useState<Address | null>(null);
  const totalQuantity = sum(checkout.products.map((item) => item.quantity));
  const totalPrice = sum(
    checkout.products.map((item) => item.quantity * item.offerPrice)
  );
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = (billingAddress: Address | null) => {
    setOpen(true);
    billingAddress && setSelect(billingAddress!);
  };

  const handleClose = () => {
    setOpen(false);
    setSelect(null);
  };

  let shippingAddress: React.ReactElement | React.ReactElement[] = <></>;
  let addressResult: React.ReactElement | React.ReactElement[] = <></>;
  if (address) {
    addressResult = address.map((data: Address, index: number) => {
      if (data.isDefault) {
        shippingAddress = (
          <AddressCard address={data} deleteAddress={deleteAddress} single />
        );
      }
      return (
        <Grid item xs={12} lg={6} key={index}>
          <AddressCard
            address={data}
            deleteAddress={deleteAddress}
            handleClickOpen={handleClickOpen}
            billingAddressHandler={billingAddressHandler}
          />
        </Grid>
      );
    });
  }

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} md={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="subtitle1">Billing Address</Typography>
              <Button
                size="small"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleClickOpen(null)}
              >
                Add Address
              </Button>
            </Stack>
          </Grid>
          {addressResult}
          <Grid item xs={12}>
            <OrderSummary
              totalPrice={totalPrice}
              totalQuantity={totalQuantity}
            />
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
                <Button
                  variant="contained"
                  onClick={() => billingAddressHandler(null)}
                >
                  Place Order
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}>
        {/* <SubCard sx={{ mb: gridSpacing }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <PersonOutlineTwoToneIcon color="primary" />
                <Typography variant="h3">Delia Pope</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={0.25}>
                <Typography variant="caption">Email</Typography>
                <Typography variant="subtitle1">
                  deliaturewpo@company.com
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={0.25}>
                <Typography variant="caption">Contact</Typography>
                <Typography variant="subtitle1">(980) 473-2942</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={0.25}>
                <Typography variant="caption">No. of order</Typography>
                <Typography variant="subtitle1">19</Typography>
              </Stack>
            </Grid>
          </Grid>
        </SubCard> */}
        {shippingAddress}
      </Grid>
      <AddAddress
        open={open}
        handleClose={handleClose}
        address={select!}
        addAddress={addAddress}
        editAddress={editAddress}
      />
    </Grid>
  );
};

export default BillingAddress;
