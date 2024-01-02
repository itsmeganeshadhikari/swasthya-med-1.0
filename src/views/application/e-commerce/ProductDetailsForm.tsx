// material-ui
import {
  Button,
  Grid,
  Stack,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
} from "@mui/material";

// project imports
import AnimateButton from "../../../ui-component/extended/AnimateButton";

// third-party
import { useFormik } from "formik";
import * as yup from "yup";
import WysiwygEditor from "../../forms/plugins/WysiwugEditor";
import InputLabel from "../../../ui-component/extended/Form/InputLabel";

const validationSchema = yup.object({
  productName: yup.string().required("Product Name is required"),
  subDescription: yup.string().required("Description is required"),
});

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

export type ProductDetailsData = {
  productImagePreview: string;
  productName?: string;
  subDescription?: string;
  description?: string;
  productImage: string;
  productCode: string;
  productSize: string;
  sku: string;
  category: string;
  quantity: number;
};

export interface ProductDetailsForm {
  productDetailsData: ProductDetailsData;
  setProductDetailsData: (d: ProductDetailsData) => void;
  handleNext: () => void;
  setErrorIndex: (i: number | null) => void;
}

const ProductDetailsForm = ({
  productDetailsData,
  setProductDetailsData,
  handleNext,
  setErrorIndex,
}: ProductDetailsForm) => {
  const formik = useFormik({
    initialValues: {
      productImagePreview: productDetailsData.productImagePreview,
      productName: productDetailsData.productName,
      subDescription: productDetailsData.subDescription,
      description: productDetailsData.description,
      productImage: productDetailsData.productImage,
      productCode: productDetailsData.productCode,
      productSize: productDetailsData.productSize,
      sku: productDetailsData.sku,
      category: productDetailsData.category,
      quantity: productDetailsData.quantity,
    },
    validationSchema,
    onSubmit: (values) => {
      setProductDetailsData({
        productImagePreview: values.productImagePreview,
        productName: values.productName,
        subDescription: values.subDescription,
        description: values.description,
        productImage: values.productImage,
        productCode: values.productCode,
        productSize: values.productSize,
        sku: values.sku,
        category: values.category,
        quantity: values.quantity,
      });
      handleNext();
    },
  });

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Product Details
      </Typography>
      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="productName"
              name="productName"
              label="Name *"
              value={formik.values.productName}
              defaultValue={formik.values.productName}
              onChange={formik.handleChange}
              error={
                formik.touched.productName && Boolean(formik.errors.productName)
              }
              helperText={
                formik.touched.productName && formik.errors.productName
              }
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="subDescription"
              name="subDescription"
              label="Sub Desctiption *"
              value={formik.values.subDescription}
              defaultValue={formik.values.subDescription}
              onChange={formik.handleChange}
              error={
                formik.touched.subDescription &&
                Boolean(formik.errors.subDescription)
              }
              helperText={
                formik.touched.subDescription && formik.errors.subDescription
              }
              fullWidth
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <WysiwygEditor />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="file"
              fullWidth
              name="productImage"
              onChange={(event: any) => {
                const url = URL.createObjectURL(event.target.files[0]);
                const reader = new FileReader();
                reader.readAsDataURL(event.target.files[0]);

                reader.onload = () => {
                  if (reader.readyState == 2) {
                    formik.setFieldValue("productImage", reader.result);
                    formik.setFieldValue("productImagePreview", url);
                  }
                };
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="productCode"
              name="productCode"
              label="Code"
              value={formik.values.productCode}
              fullWidth
              autoComplete="0016"
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="productSize"
              label="Size"
              name="productSize"
              value={formik.values.productSize}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="sku"
              name="sku"
              label="Sku"
              value={formik.values.sku}
              autoComplete="product serial no"
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl sx={{ m: 1 }} fullWidth>
              <InputLabel id="category-select">Category</InputLabel>
              <Select
                labelId="category-select"
                id="category"
                name="category"
                defaultValue={formik.values.category}
                onChange={formik.handleChange}
                label="Category"
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="Skin">Skin</MenuItem>
                <MenuItem value="Baby">Baby</MenuItem>
                <MenuItem value="Surgical">Surgical</MenuItem>
              </Select>
              {formik.errors.category && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                  {formik.errors.category}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              id="quantity"
              name="quantity"
              label="Quantity"
              placeholder="0"
              fullWidth
              autoComplete="product quantity"
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button
                  variant="contained"
                  sx={{ my: 3, ml: 1 }}
                  type="submit"
                  onClick={() => setErrorIndex(0)}
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
};

export default ProductDetailsForm;
