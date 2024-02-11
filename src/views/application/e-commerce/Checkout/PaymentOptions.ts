// project imports
import { PaymentOptionsProps } from "../types";

// assets
// import esewa from "../../../../assets/images/e-commerce/eswea.png";
// import khalti from "../../../../assets/images/e-commerce/khalti.jpg";
// import phonePay from "../../../../assets/images/e-commerce/phonepay.png";
// import card from "../../../../assets/images/e-commerce/card.png";
import cod from "../../../../assets/images/e-commerce/cod.png";

// ==============================|| CHECKOUT - PAYMENT OPTIONS ||============================== //

const PaymentOptions: PaymentOptionsProps[] = [
  // {
  //   id: 1,
  //   value: "Esewa",
  //   title: "Pay with Esewa",
  //   caption:
  //     "You will be redirected to esewa website to complete your purchase securely.",
  //   image: esewa,
  //   size: {
  //     width: 50,
  //     height: 50,
  //   },
  // },
  // {
  //   id: 2,
  //   value: "Khalti",
  //   title: "Pay with Khalti",
  //   caption:
  //     "You will be redirected to Khalti website to complete your purchase securely.",
  //   image: khalti,
  //   size: {
  //     width: 90,
  //     height: 50,
  //   },
  // },
  {
    id: 1,
    value: "card",
    title: "Scan QR PHONE PAY",
    caption: "We support fone pay",
    image: 'https://fonepay.com/images/logo.png',
    size: {
      width: 150,
      height: 30,
    },
  },
  {
    id: 2,
    value: "cod",
    title: "Cash on Delivery",
    caption: "Pay with cash when your order is delivered.",
    image: cod,
    size: {
      width: 46,
      height: 28,
    },
  },
];

export default PaymentOptions;
