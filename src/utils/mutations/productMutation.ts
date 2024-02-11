import { gql } from "@apollo/client";

const CREATE_PRODUCT = gql`
  mutation Product($input: CreateProductDTO!) {
  product(input: $input) {
    product {
      _id
      category
      description
      productCode
      offerPrice
      productName
      productSize
      quantity
      regularPrice
      salePrice
      stock
      subDescription
      image {
        public_id
        url
      }
    }
    message
  }
}
`

const GET_PRODUCTS_ID = gql`
mutation GetProduct($input: String!) {
  getProduct(input: $input) {
  product {
    _id
    productName
    subDescription
    description
    productCode
    productSize
    sku
    category
    quantity
    regularPrice
    salePrice
    offerPrice
    image {
      public_id
      url
    }
    rating
    stock 
  }  
  }
}
`
export { CREATE_PRODUCT, GET_PRODUCTS_ID }