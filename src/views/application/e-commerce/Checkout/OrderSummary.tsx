// material-ui
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

// third-party
// import CurrencyFormat from "react-currency-format";

// project imports
import SubCard from "../../../../ui-component/cards/SubCard";
// import { CartCheckoutStateProps } from "../../../../types/cart";
import FormatPrice from "../../../../ui-component/FormatPrice";

// ==============================|| CHECKOUT CART - ORDER SUMMARY ||============================== //

const OrderSummary = ({ totalPrice }: any) => (
  <SubCard>
    <TableContainer>
      <Table sx={{ minWidth: "auto" }} size="small" aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="subtitle1">Order Summary</Typography>
            </TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>Sub Total</TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1">
                <FormatPrice price={totalPrice} />
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Coupon Discount</TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1">-</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Shipping Charges</TableCell>
            <TableCell align="right">
              <Typography variant="subtitle1">Free Delivery</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ borderBottom: "none" }}>
              <Typography variant="subtitle1">Total</Typography>
            </TableCell>
            <TableCell align="right" sx={{ borderBottom: "none" }}>
              <Typography variant="subtitle1">
                <FormatPrice price={totalPrice} />
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  </SubCard>
);

export default OrderSummary;
