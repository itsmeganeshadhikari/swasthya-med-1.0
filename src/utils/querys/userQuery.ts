import { gql } from "@apollo/client";

const GET_CURRENT_USER = gql`
  query Me {
  me {
    message
    user {
      _id
      email
      firstName
      lastName
      password
      phone
      role
      _id
    }
  }
}
`
const GET_PRODUCTS = gql`
query Productlist{
  productlist {
  products {
    _id
    description
    category
    offerPrice
    productCode
    productName
    quantity
    productSize
    regularPrice
    salePrice
    sku
    stock
    subDescription
    image {
      public_id
      url
    }
    rating
  }
}
}
`
const DELETE_PRODUCT = gql`
mutation DeleteProduct($deleteProductId: String!) {
  deleteProduct(id: $deleteProductId) {
    message
  }
}
`
export { GET_CURRENT_USER, GET_PRODUCTS, DELETE_PRODUCT }