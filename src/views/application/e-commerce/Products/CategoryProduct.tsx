import React, { useEffect } from "react";

// material-ui
import { styled, useTheme } from "@mui/material/styles";
import { Box, CardContent, Container, Grid } from "@mui/material";

// third party

// project imports
import FloatingCart from "../../../../ui-component/cards/FloatingCart";
import { appDrawerWidth, gridSpacing } from "../../../../store/constant";
import ProductCategory from "./ProductCategory";
import { useMutation } from "@apollo/client";
import { GET_PRODUCTS_BY_NAME } from "../../../../utils/mutations/productMutation";
import { useParams } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar';
import ProductFilter from "./ProductFilter";
import { ProductsFilter } from "../types";
// product list container
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -appDrawerWidth,
    [theme.breakpoints.down("xl")]: {
        paddingRight: 0,
        marginRight: 0,
    },
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    }),
}));

// ==============================|| E-COMMERCE - PRODUCT GRID //

const CategoryProduct = () => {
    const theme = useTheme();
    const { productName }: any = useParams();
    const [getProducts, { data, error }] = useMutation(GET_PRODUCTS_BY_NAME)

    const getProductFilterList = async () => {
        await getProducts({ variables: { input: productName } })
    }

    if (error) {
        console.log("error");
    }
    const [, setLoading] = React.useState(true);
    // filter
    const initialState: ProductsFilter = {
        search: '',
        sort: 'low',
        gender: [],
        categories: ['all'],
        colors: [],
        price: '',
        rating: 0
    };

    const [filter, setFilter] = React.useState(initialState);

    React.useEffect(() => {
        setLoading(false);
    }, []);

    const handelFilter = (type: string, params: string, rating?: number) => {
        setLoading(true);
        switch (type) {
            case 'gender':
                if (filter.gender.some((item) => item === params)) {
                    setFilter({ ...filter, gender: filter.gender.filter((item) => item !== params) });
                } else {
                    setFilter({ ...filter, gender: [...filter.gender, params] });
                }
                break;
            case 'categories':
                if (filter.categories.some((item) => item === params)) {
                    setFilter({ ...filter, categories: filter.categories.filter((item) => item !== params) });
                } else if (filter.categories.some((item) => item === 'all') || params === 'all') {
                    setFilter({ ...filter, categories: [params] });
                } else {
                    setFilter({ ...filter, categories: [...filter.categories, params] });
                }

                break;
            case 'colors':
                if (filter.colors.some((item) => item === params)) {
                    setFilter({ ...filter, colors: filter.colors.filter((item) => item !== params) });
                } else {
                    setFilter({ ...filter, colors: [...filter.colors, params] });
                }
                break;
            case 'price':
                setFilter({ ...filter, price: params });
                break;
            case 'search':
                setFilter({ ...filter, search: params });
                break;
            case 'sort':
                setFilter({ ...filter, sort: params });
                break;
            case 'rating':
                setFilter({ ...filter, rating: rating! });
                break;
            case 'reset':
                setFilter(initialState);
                break;
            default:
            // no options
        }
    };

    let product: React.ReactElement | React.ReactElement[] = <></>

    if (data?.productName.products.length > 0) {
        product = <ProductCategory products={data?.productName.products} />;
    } else {
        product =
            <Grid xs={11} md={10} lg={10} xl={10} sx={{ marginLeft: { lg: 60 } }}>
                <CardContent sx={{ p: 1, height: 'auto' }}>
                    <Grid container spacing={1}>
                        <Grid item xs={7}>
                            <h1>Not Found</h1>
                        </Grid>
                    </Grid>
                </CardContent>
            </Grid>
    }

    useEffect(() => {
        getProductFilterList()
    }, [productName])
    return (
        <Container>
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                spacing={gridSpacing}
                sx={{
                    mt: { xs: 2, sm: 3, md: 5 },
                    mb: { xs: 2.5, md: 5 },
                }}
            >
                <Grid item xs={12} xl={9}>
                    <Grid
                        container
                        spacing={gridSpacing}
                        sx={{
                            [theme.breakpoints.down("lg")]: { pr: 0, textAlign: "center" },
                            padding: { xs: 5, sm: 2 },
                        }}
                    >
                        <Box sx={{ display: "flex" }}>
                            <Main>
                                <Grid container
                                    spacing={1}
                                    justifyContent="center"
                                    sx={{ overflowX: "auto" }}>
                                    <Grid item xs={11} md={3} lg={2} xl={2}>
                                        <PerfectScrollbar component="div">
                                            <ProductFilter filter={filter} handelFilter={handelFilter} />
                                        </PerfectScrollbar>
                                    </Grid>
                                    <Grid container
                                        spacing={1}
                                        height={{ xs: '60vh', lg: '80vh', xl: '70vh' }}

                                        marginTop={1}
                                        sx={{ overflowX: "auto" }}
                                        item xs={11} md={9} lg={10} xl={10}>
                                        {product}
                                    </Grid>
                                </Grid>

                            </Main>
                        </Box>
                    </Grid>
                </Grid>
                <FloatingCart />
            </Grid>
        </Container >
    );
};

export default CategoryProduct;
