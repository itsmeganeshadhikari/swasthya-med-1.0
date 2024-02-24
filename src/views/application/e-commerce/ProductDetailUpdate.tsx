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
import { useMutation } from "@apollo/client";
import { GET_PRODUCTS_ID } from "../../../utils/mutations/productMutation";
import { useParams } from "react-router-dom";

const validationSchema = yup.object({
    productName: yup.string().required("Product Name is required"),
    subDescription: yup.string().required("Description is required"),
});

// ==============================|| FORM WIZARD - VALIDATION  ||============================== //

export type ProductDetailsData = {
    productName?: string;
    subDescription?: string;
    description?: string;
    productImage?: string;
    productSize?: string;
    category?: string;
    subcategory?: string;
    quantity?: number;
};

export interface ProductDetailsForm {
    productDetailsData: ProductDetailsData;
    setProductDetailsData: (d: ProductDetailsData) => void;
    handleNext: () => void;
    setErrorIndex: (i: number | null) => void;
}

const ProductDetailsUpdateForm = ({
    productDetailsData,
    setProductDetailsData,
    handleNext,
    setErrorIndex,
}: ProductDetailsForm) => {
    const { id } = useParams()
    const [getProducById, { data }] = useMutation(GET_PRODUCTS_ID)

    const theme = useTheme();
    const [text, setText] = useState(
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    );
    const handleChange = (value: string) => {
        setText(value);
    };

    const getProductsById = async () => {
        await getProducById({ variables: { input: id } });
    }

    useEffect(() => {
        getProductsById()
    }, []);

    const formik = useFormik({
        initialValues: {
            productName: productDetailsData?.productName,
            subDescription: productDetailsData?.subDescription,
            description: productDetailsData?.description,
            productSize: productDetailsData?.productSize,
            category: productDetailsData?.category,
            subcategory: productDetailsData?.subcategory,
            quantity: productDetailsData?.quantity,
        },
        validationSchema,
        onSubmit: (values) => {
            setProductDetailsData({
                productName: values.productName,
                subDescription: values.subDescription,
                description: text,
                productSize: values.productSize,
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
                            value={data?.getProduct.product.productName}
                            defaultValue={data?.getProduct.product.productName}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.productName && Boolean(formik.errors.productName)
                            }
                            fullWidth
                            autoComplete="given-name"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="subDescription"
                            name="subDescription"
                            value={data?.getProduct.product.subDescription}
                            defaultValue={data?.getProduct.product.subDescription}
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
                                        <ReactQuillDemo value={data?.getProduct.product.description} onChange={handleChange} />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="productSize"
                            name="productSize"
                            value={formik.values.productSize}
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
                                <MenuItem value="baby">Baby</MenuItem>
                                <MenuItem value="skin">Skin</MenuItem>
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
                    {productDetailsData?.subcategory ? <Grid item xs={12} sm={6}>
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
                                <MenuItem value="supplement">Supplement</MenuItem>
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
                            placeholder="0"
                            value={formik.values.quantity}
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

export default ProductDetailsUpdateForm;
