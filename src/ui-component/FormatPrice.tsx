const FormatPrice = ({ price }: any) => {
  return new Intl.NumberFormat("in-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 3,
  }).format(price / 1000);
};

export default FormatPrice;
