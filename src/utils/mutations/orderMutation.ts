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
export { CREATE_ORDER };