import React from "react";
import { useNavigate } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  Divider,
  Grid,
  Stack,
  Typography,
  Zoom,
  ZoomProps,
  useMediaQuery,
} from "@mui/material";

// project imports
import MainCard from "../../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../../store/constant";

// third-party
// third-party
import { Chance } from "chance";

// assets
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import completed from "../../../../assets/images/e-commerce/completed.png";
import { useDispatch } from "react-redux";
import { RESET_CART } from "../../../../store/actions";

const chance = new Chance();

const Transition = React.forwardRef((props: ZoomProps, ref) => (
  <Zoom ref={ref} {...props} />
));

// ==============================|| CHECKOUT CART - DISCOUNT COUPON CODE ||============================== //

const OrderComplete = ({ open }: { open: boolean }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const continueShoping = () => {
    navigate("/", { replace: true });
    dispatch({ type: RESET_CART })
  }
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          p: 0,
        },
      }}
    >
      <MainCard>
        <Grid
          container
          direction="column"
          spacing={gridSpacing}
          alignItems="center"
          justifyContent="center"
          sx={{ my: 3 }}
        >
          <Grid item xs={12}>
            <Typography variant={matchDownMD ? "h2" : "h1"}>
              Thank you for order!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack alignItems="center" spacing={2}>
              <Typography
                align="center"
                variant="h4"
                sx={{ fontWeight: 400, color: "grey.500" }}
              >
                We will send a process notification, before it delivered.
              </Typography>
              <Typography variant="body1" align="center">
                Your order id:
                <Typography
                  variant="subtitle1"
                  component="span"
                  color="primary"
                >
                  {chance.guid()}
                </Typography>
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ m: 3 }}>
            <img
              src={completed}
              alt="Order Complete"
              width="100%"
              style={{ maxWidth: 780 }}
            />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Stack alignItems="center" spacing={1}>
              <Typography variant="caption" align="center">
                If you have any query or questions regarding purchase items,
                then fell to get in contact us
              </Typography>
              <Typography
                variant="subtitle1"
                color="error"
                sx={{ cursor: "pointer" }}
              >
                {chance.phone()}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Grid
              direction={matchDownMD ? "column-reverse" : "row"}
              container
              spacing={3}
              alignItems={matchDownMD ? "" : "center"}
              justifyContent="space-between"
            >
              <Grid item>
                <Button
                  variant="text"
                  onClick={continueShoping}
                  startIcon={<KeyboardBackspaceIcon />}
                >
                  Continue Shopping
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  fullWidth
                  disabled
                  onClick={continueShoping}
                >
                  Download Invoice
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </Dialog>
  );
};

export default OrderComplete;
