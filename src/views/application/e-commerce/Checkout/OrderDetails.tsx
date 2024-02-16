
// material-ui
import { useTheme } from "@mui/material/styles";
import {
    Button,
    Container,
    Grid,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

// third-party
// import CurrencyFormat from "react-currency-format";

// project imports
import { gridSpacing } from "../../../../store/constant";

// assets
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import FormatPrice from "../../../../ui-component/FormatPrice";
import useAuth from "../../../../hooks/useAuth";
import { useMutation } from "@apollo/client";
import { GET_ORDERS } from "../../../../utils/mutations/orderMutation";
import { useEffect } from "react";
import Avatar from "../../../../ui-component/extended/Avatar";

const OrderDetails = () => {
    const theme = useTheme();
    const { user }: any = useAuth()
    const [getOrders, { data }] = useMutation(GET_ORDERS)

    const getOrder = async () => {
        await getOrders({ variables: { findOrderByUserId: user?._id } })
    }
    console.log(data?.findOrderByUser?.orders);

    useEffect(() => {
        getOrder()
    }, [])
    return (
        <Container sx={{ marginTop: 15, marginBottom: 5 }}>
            <Grid item container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650, backgroundColor: "powderblue" }} aria-label="simple table">
                            <TableHead
                                sx={{
                                    borderTop: "1px solid",
                                    color:
                                        theme.palette.mode === "dark"
                                            ? theme.palette.dark.light + 15
                                            : "purple",
                                }}
                            >
                                <TableRow>
                                    <TableCell>OrderId</TableCell>
                                    <TableCell align="center">Method</TableCell>
                                    <TableCell align="left">productName</TableCell>
                                    <TableCell align="left">Total Price</TableCell>
                                    <TableCell align="right">Order Date</TableCell>
                                    <TableCell align="right">Payment Status</TableCell>
                                    <TableCell align="right">OrderType</TableCell>
                                    <TableCell align="right">Action </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.findOrderByUser?.orders.map((row: any, index: number) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" align="center">
                                                <Grid container alignItems="center" spacing={2}>
                                                    <Grid item>
                                                        <Stack spacing={0}>
                                                            <Typography variant="subtitle1">
                                                                {row._id}
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="center">
                                                <Grid container alignItems="center" spacing={2}>
                                                    <Grid item>
                                                    </Grid>
                                                    <Grid item>
                                                        <Stack spacing={0}>
                                                            <Typography variant="subtitle1">
                                                                {row.method = "cod" ? "Cash On Delivery" : "QR"}
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="center">
                                                <Grid container alignItems="center" spacing={2}>
                                                    <Grid item>
                                                        <Stack spacing={0}>
                                                            <Avatar
                                                                size="md"
                                                                variant="rounded"
                                                            // src={`${row.image[0].url}`}
                                                            />
                                                            <Typography variant="subtitle1">
                                                                {row.productName}
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Stack>
                                                    <Typography variant="subtitle1">
                                                        <FormatPrice price={row.total} />
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{ textDecoration: "line-through" }}
                                                    >
                                                        <FormatPrice price={row.total} />
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="center">
                                                <Grid container alignItems="center" spacing={2}>
                                                    <Grid item>
                                                    </Grid>
                                                    <Grid item>
                                                        <Stack spacing={0}>
                                                            <Typography variant="subtitle1">
                                                                {row.method}
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="center">
                                                <Grid container alignItems="center" spacing={2}>
                                                    <Grid item>
                                                    </Grid>
                                                    <Grid item>
                                                        <Stack spacing={0}>
                                                            <Typography variant="subtitle1">
                                                                pending
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="center">
                                                <Grid container alignItems="center" spacing={2}>
                                                    <Grid item>
                                                    </Grid>
                                                    <Grid item>
                                                        <Stack spacing={0}>
                                                            <Typography variant="subtitle1">
                                                                {row.method}
                                                            </Typography>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button variant="outlined" color="error" endIcon={<DeleteTwoToneIcon sx={{ color: "red" }} />}>Cancel</Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Container >

    );
};

export default OrderDetails;
