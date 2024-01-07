// material-ui
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { ProductPriceData } from "./ProductPriceForm";
import { ProductDetailsData } from "./ProductDetailsForm";

export interface ReviewData {
  productDetailsData: ProductDetailsData;
  productPriceData: ProductPriceData;
}

export default function Review({
  productDetailsData,
  productPriceData,
}: ReviewData) {
  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Product summary
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }} key={productDetailsData.productName}>
          <ListItemText primary="Product Name" />
          <Typography variant="body2">
            {productDetailsData.productName}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }} key={productDetailsData.subDescription}>
          <ListItemText primary="Sub Description" />
          <Typography variant="body2">
            {productDetailsData.subDescription}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }} key={productDetailsData.description}>
          <ListItemText primary="Description" />
          <Grid>
            <Typography variant="subtitle1">
              {productDetailsData.description}
            </Typography>
          </Grid>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Photo" />
          <Box
            component="img"
            sx={{
              height: 150,
              width: 150,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt="The house from the offer."
            src={productDetailsData.productImagePreview}
          />
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Code" />
          <Typography variant="subtitle1">
            {productDetailsData.productCode}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Size" />
          <Typography variant="subtitle1">
            {productDetailsData.productSize}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Category" />
          <Typography variant="subtitle1">
            {productDetailsData.category}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Quantity" />
          <Typography variant="subtitle1">
            {productDetailsData.quantity}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Regular Price" />
          <Typography variant="subtitle1">
            {productPriceData.regularPrice}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Sale Price" />
          <Typography variant="subtitle1">
            {productPriceData.salePrice}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Offer Price" />
          <Typography variant="subtitle1">
            {productPriceData.offerPrice}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="SKU" />
          <Typography variant="subtitle1">{productDetailsData.sku}</Typography>
        </ListItem>
      </List>
    </>
  );
}
