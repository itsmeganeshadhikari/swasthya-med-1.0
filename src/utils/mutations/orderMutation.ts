import { gql } from "@apollo/client";

const CREATE_ORDER = gql`
  mutation CreateOrder($createOrderInput: CreateOrderInput!) {
  createOrder(createOrderInput: $createOrderInput) {
    order {
      _id
      method
      type
      total
      discount
      subTotal
    }
  }
}
`
const GET_ORDERS = gql`
  mutation FindOrderByUser($findOrderByUserId: String!) {
  findOrderByUser(id: $findOrderByUserId) {
    orders {
      _id
      method
      url
      total
      discount
      addressName
      city
      userName
      productName
    }
  }
}
`
export { CREATE_ORDER, GET_ORDERS };