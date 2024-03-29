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
import MainCard from "../../../ui-component/cards/MainCard";
import { gridSpacing } from "../../../store/constant";
import LinkIcon from "@mui/icons-material/Link";
import ReactQuillDemo from "../../forms/plugins/Wysiwug/ReactQuill";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_PRODUCT } from "../../../utils/mutations/productMutation";

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
  subcategory: string;
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
  const [newProduct, setNewProduct] = useState('');
  const [getProduct] = useLazyQuery(GET_ALL_PRODUCT)

  const theme = useTheme();
  const [text, setText] = useState(
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  );
  const handleChange = (value: string) => {
    setText(value);
  };

  const getProducts = async () => {
    const data = await getProduct()
    if (data?.data.productlist?.products.length > 0) {
      const lastProductLength = data?.data.productlist.products.length - 1;
      const codeNo = parseInt(data?.data.productlist.products[lastProductLength].productCode) + 1;
      setNewProduct(codeNo + '-swasthya');
    } else {
      setNewProduct('1-swasthya');
    }
  }
  useEffect(() => {
    getProducts()
  }, [newProduct]);

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
      subcategory: productDetailsData.subcategory,
      quantity: productDetailsData.quantity,
    },
    validationSchema,
    onSubmit: (values) => {
      setProductDetailsData({
        productImagePreview: values.productImagePreview[0],
        productName: values.productName,
        subDescription: values.subDescription,
        description: text,
        productImage: values.productImage,
        productCode: newProduct,
        productSize: values.productSize,
        sku: newProduct,
        category: values.category,
        subcategory: values.subcategory,
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
                    <ReactQuillDemo value={text} onChange={handleChange} />
                  </Stack>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              multiple
              name="productImage"
              accept="image/*"
              onChange={(event: any) => {
                const fileList = event.target.files
                const result: (string | ArrayBuffer | null)[] = []
                const urls: string[] = []
                const files: File[] = Array.from(fileList);
                files.map((file: File) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  const url = URL.createObjectURL(file);
                  reader.onload = () => {
                    if (reader.readyState == 2) {
                      result.push(reader.result)
                      urls.push(url)
                    }
                  };
                })
                formik.setFieldValue("productImage", result);
                formik.setFieldValue("productImagePreview", urls);
              }
              }
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
              value={newProduct + '-med'}
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
                <MenuItem value="skin">Skin</MenuItem>
                <MenuItem value="baby">Baby</MenuItem>
                <MenuItem value="surgical">Surgical</MenuItem>
                <MenuItem value="nutritional">Nutritional</MenuItem>
                <MenuItem value="medicine">Medicine</MenuItem>
              </Select>
              {formik.errors.category && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {formik.values.category == 'baby' ? <Grid item xs={12} sm={6}>
            <FormControl sx={{ m: 1 }} fullWidth>
              <InputLabel id="category-select">Sub category</InputLabel>
              <Select
                labelId="category-select"
                id="subcategory"
                name="subcategory"
                defaultValue={formik.values.subcategory}
                onChange={formik.handleChange}
                label="Sub category"
              >
                <MenuItem value="milk">Milk</MenuItem>
                <MenuItem value="skin">Skin</MenuItem>
                <MenuItem value="suplement">Supplement</MenuItem>
                <MenuItem value="daiper">Daiper</MenuItem>
              </Select>
              {formik.errors.category && (
                <FormHelperText
                  error
                  id="standard-weight-helper-text-email-login"
                >
                </FormHelperText>
              )}
            </FormControl>
          </Grid> : ""}
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
