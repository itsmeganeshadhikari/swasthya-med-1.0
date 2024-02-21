import React from 'react';

// material-ui
import {
    Button,
    CardContent,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Skeleton,
    Stack,
    Theme,
    useMediaQuery
} from '@mui/material';

// project imports

import MainCard from '../../../../ui-component/cards/MainCard';
import Accordion from '../../../../ui-component/extended/Accordion';
import { gridSpacing } from '../../../../store/constant';
import { ProductsFilter } from '../types';
// ==============================|| PRODUCT GRID - CATEGORIES FILTER ||============================== //

const Categories = ({ categories, handelFilter }: { categories: string[]; handelFilter: (type: string, params: string) => void }) => {
    const [isCategoriesLoading, setCategoriesLoading] = React.useState(true);
    React.useEffect(() => {
        setCategoriesLoading(false);
    }, []);

    return (
        <Grid container spacing={1}>
            {isCategoriesLoading ? (
                <Grid item xs={12}>
                    <Skeleton variant="rectangular" width="100%" height={96} />
                </Grid>
            ) : (
                <>
                    <Grid item xs={6}>
                        <FormControlLabel
                            control={<Checkbox checked={categories.some((item) => item === 'all')} />}
                            onChange={() => handelFilter('categories', 'all')}
                            label="All"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={categories.some((item) => item === 'electronics')} />}
                            onChange={() => handelFilter('categories', 'electronics')}
                            label="Baby"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={categories.some((item) => item === 'fashion')} />}
                            onChange={() => handelFilter('categories', 'fashion')}
                            label="Skin"
                        />
                    </Grid>
                </>
            )}
        </Grid>
    );
};

// ==============================|| PRODUCT GRID - PRICE FILTER ||============================== //

const Price = ({ price, handelFilter }: { price: string; handelFilter: (type: string, params: string) => void }) => {
    const [isPriceLoading, setPriceLoading] = React.useState(true);
    React.useEffect(() => {
        setPriceLoading(false);
    }, []);

    return (
        <>
            {isPriceLoading ? (
                <Skeleton variant="rectangular" width="100%" height={172} />
            ) : (
                <FormControl component="fieldset">
                    <RadioGroup
                        row
                        aria-label="layout"
                        value={price}
                        onChange={(e) => handelFilter('price', e.target.value)}
                        name="row-radio-buttons-group"
                    >
                        <Grid container spacing={0.25}>
                            <Grid item xs={6} lg={12} xl={12}>
                                <FormControlLabel
                                    value="0-10"
                                    control={<Radio />}
                                    label="Below $10"
                                    sx={{
                                        '& .MuiSvgIcon-root': { fontSize: 28 },
                                        '& .MuiFormControlLabel-label': { color: 'grey.900' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} lg={12} xl={12}>
                                <FormControlLabel
                                    value="0-10"
                                    control={<Radio />}
                                    label="Below $10"
                                    sx={{
                                        '& .MuiSvgIcon-root': { fontSize: 28 },
                                        '& .MuiFormControlLabel-label': { color: 'grey.900' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} lg={12} xl={12}>
                                <FormControlLabel
                                    value="0-10"
                                    control={<Radio />}
                                    label="Below $10"
                                    sx={{
                                        '& .MuiSvgIcon-root': { fontSize: 28 },
                                        '& .MuiFormControlLabel-label': { color: 'grey.900' }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} lg={12} xl={12}>
                                <FormControlLabel
                                    value="0-10"
                                    control={<Radio />}
                                    label="Below $10"
                                    sx={{
                                        '& .MuiSvgIcon-root': { fontSize: 28 },
                                        '& .MuiFormControlLabel-label': { color: 'grey.900' }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </RadioGroup>
                </FormControl>
            )}
        </>
    );
}

// ==============================|| PRODUCT GRID - FILTER ||============================== //

const ProductFilter = ({
    filter,
    handelFilter
}: {
    filter: ProductsFilter;
    handelFilter: (type: string, params: string, rating?: number) => void;
}) => {
    const matchDownLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('xl'));

    const filterData = [
        {
            id: 'categories',
            defaultExpand: true,
            title: 'Categories',
            content: <Categories categories={filter.categories} handelFilter={handelFilter} />
        },
        {
            id: 'price',
            defaultExpand: true,
            title: 'Price',
            content: <Price price={filter.price} handelFilter={handelFilter} />
        }
    ];

    return (
        <MainCard border={!matchDownLG} content={false} sx={{ overflow: 'visible' }}>
            <CardContent sx={{ p: 1, height: matchDownLG ? '100vh' : 'auto' }}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Accordion data={filterData} />
                    </Grid>
                    <Grid item xs={12} sx={{ m: 1 }}>
                        <Stack direction="row" justifyContent="center" alignItems="center">
                            <Button variant="contained" fullWidth color="error" onClick={() => handelFilter('reset', '')}>
                                Clear All
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </MainCard>
    );
};

export default ProductFilter;
