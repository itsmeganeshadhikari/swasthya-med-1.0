import { Grid } from "@mui/material";
import ProductCard from "../../../../ui-component/cards/ProductCard";
// import { Products as ProductsTypo } from "../types";

const ProductCategory = ({ products }: any) => {
  return (
    <>
      {products.map((product: any, index: any) => (
        <Grid key={index} item xs={11} sm={5} md={3} lg={2}>
          <ProductCard
            id={product.id}
            image={product.image.url}
            name={product.productName}
            description={product.subDescription}
            offerPrice={product.offerPrice}
            salePrice={product.salePrice}
            rating={product.rating}
            color={product.colors ? product.colors[0] : undefined}
          />
        </Grid>
      ))}
    </>
  );
};

export default ProductCategory;
