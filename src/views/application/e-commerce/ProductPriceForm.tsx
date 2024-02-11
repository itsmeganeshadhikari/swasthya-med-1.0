// material-ui
import { Button, Grid, Stack, TextField, Typography } from "@mui/material";

// project imports
import AnimateButton from "../../../ui-component/extended/AnimateButton";

// third-party
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  regularPrice: yup.string().required("Regular Price is required"),
  salePrice: yup.string().required("Sale price is required"),
});

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

export type ProductPriceData = {
  regularPrice?: number;
  salePrice?: number;
  offerPrice?: number;
};
export interface ProductPriceForm {
  productPriceData: ProductPriceData;
  setProductPriceData: (d: ProductPriceData) => void;
  handleNext: () => void;
  handleBack: () => void;
  setErrorIndex: (i: number | null) => void;
}

export default function ProductPriceForm({
  productPriceData,
  setProductPriceData,
  handleNext,
  handleBack,
  setErrorIndex,
}: ProductPriceForm) {
  const formik = useFormik({
    initialValues: {
      regularPrice: productPriceData.regularPrice,
      salePrice: productPriceData.salePrice,
      offerPrice: productPriceData.offerPrice,
    },
    validationSchema,
    onSubmit: (values) => {
      setProductPriceData({
        regularPrice: values.regularPrice,
        salePrice: values.salePrice,
        offerPrice: values.offerPrice,
      });
      handleNext();
    },
  });

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Product Price
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              type="number"
              id="regularPrice"
              label="Regular Price"
              name="regularPrice"
              defaultValue={formik.values.regularPrice}
              value={formik.values.regularPrice}
              onChange={formik.handleChange}
              error={
                formik.touched.regularPrice &&
                Boolean(formik.errors.regularPrice)
              }
              helperText={
                formik.touched.regularPrice && formik.errors.regularPrice
              }
              fullWidth
              autoComplete="regular price"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="number"
              id="salePrice"
              label="Sales Price"
              name="salePrice"
              defaultValue={formik.values.salePrice}
              value={formik.values.salePrice}
              onChange={formik.handleChange}
              error={
                formik.touched.salePrice && Boolean(formik.errors.salePrice)
              }
              helperText={formik.touched.salePrice && formik.errors.salePrice}
              fullWidth
              autoComplete="sale price"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              type="number"
              id="offerPrice"
              label="Offer Price"
              name="offerPrice"
              defaultValue={formik.values.offerPrice}
              value={formik.values.offerPrice}
              onChange={formik.handleChange}
              error={
                formik.touched.offerPrice && Boolean(formik.errors.offerPrice)
              }
              helperText={formik.touched.offerPrice && formik.errors.offerPrice}
              fullWidth
              autoComplete="offer price"
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                Back
              </Button>
              <AnimateButton>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ my: 3, ml: 1 }}
                  onClick={() => setErrorIndex(1)}
                >
                  Next
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
