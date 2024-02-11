import { gql } from "@apollo/client";

const CREATE_TRANSACTION = gql`
 mutation CreateTransaction($createTransactionInput: CreateTransactionInput!) {
  createTransaction(createTransactionInput: $createTransactionInput) {
    message
    transaction {
      _id
      image {
        public_id
        url
      }
      user
    }
  }
}
`


export { CREATE_TRANSACTION }