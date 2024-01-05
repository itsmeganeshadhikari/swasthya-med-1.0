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
// import ReactDraftWysiwyg from "./Wysiwug/ReactDraftWysiwyg";
import SecondaryAction from "../../../ui-component/cards/CardSecondaryAction";
import InputLabel from "../../../ui-component/extended/Form/InputLabel";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import axiosServices from "../../../utils/axios";
import MainCard from "../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../store/constant";
import LinkIcon from "@mui/icons-material/Link";
import ReactQuillDemo from "../../forms/plugins/Wysiwug/ReactQuill";

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
  productCode: string | any;
  productSize: string;
  sku: string | any;
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
  const [newProduct, setNewProduct] = useState("");
  const theme = useTheme();
  const [text, setText] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  );
  const handleChange = (value: string) => {
    setText(value);
  };

  const getProducts = async () => {
    const response = await axiosServices.get("/api/product");
    if (response.data.length > 0) {
      const lastProductLength = response?.data.length - 1;
      const codeNo = response?.data[lastProductLength].productCode + 1;
      setNewProduct(codeNo);
    } else {
      setNewProduct("101");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

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
        description: text,
        productImage: values.productImage,
        productCode: newProduct,
        productSize: values.productSize,
        sku: newProduct,
        category: values.category,
        quantity: values.quantity,
      });
      handleNext();
    },
  });
  console.log(text);

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
            <MainCard
              title="Product Descriptions"
              secondary={
                <SecondaryAction
                  icon={<LinkIcon fontSize="small" />}
                  link="/dashboard"
                />
              }
            >
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                  <Stack
                    spacing={gridSpacing}
                    sx={{
                      "& .quill": {
                        bgcolor:
                          theme.palette.mode === "dark"
                            ? "dark.main"
                            : "grey.50",
                        borderRadius: "12px",
                        "& .ql-toolbar": {
                          bgcolor:
                            theme.palette.mode === "dark"
                              ? "dark.light"
                              : "grey.100",
                          borderColor:
                            theme.palette.mode === "dark"
                              ? theme.palette.dark.light + 20
                              : "primary.light",
                          borderTopLeftRadius: "12px",
                          borderTopRightRadius: "12px",
                        },
                        "& .ql-container": {
                          borderColor:
                            theme.palette.mode === "dark"
                              ? `${theme.palette.dark.light + 20} !important`
                              : "primary.light",
                          borderBottomLeftRadius: "12px",
                          borderBottomRightRadius: "12px",
                          "& .ql-editor": {
                            minHeight: 135,
                          },
                        },
                      },
                    }}
                  >
                    {/* <Typography variant="subtitle1">React Quill</Typography> */}
                    <ReactQuillDemo value={text} onChange={handleChange} />
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
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
              disabled
              value={newProduct}
              defaultValue={newProduct}
              onChange={formik.handleChange}
              fullWidth
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
              value={newProduct + "11"}
              defaultValue={newProduct}
              disabled
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
