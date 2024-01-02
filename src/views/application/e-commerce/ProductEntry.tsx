import { Grid } from "@mui/material";
import { gridSpacing } from "../../../store/constant";
import ProductEntryForm from "./ProductEntryForm";

const ProductEntry = () => {
  return (
    <Grid container spacing={gridSpacing} justifyContent="center">
      <Grid item xs={12} md={9} lg={10}>
        <ProductEntryForm />
      </Grid>
    </Grid>
  );
};

export default ProductEntry;
