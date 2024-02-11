import { Grid } from "@mui/material";
import ProductCard from "../../../../ui-component/cards/ProductCard";

const ProductCategory = ({ products }: any) => {
  return (
    <>
      {products.map((product: any, index: any) => (
        <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
          <ProductCard
            id={product._id}
            image={product.image}
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
