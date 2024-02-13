import { gql } from "@apollo/client";

const CREATE_ADDRESS = gql`
  mutation Address($input: CreateAddressDTO!) {
  address(input: $input) {
    address {
      _id
      name
      building
      street
      state
      city
      isDefault
      phone
    }
    addresss {
      _id
      name
      building
      street
      state
      city
      isDefault
      phone
    }
    message
  }
}
`

const GET_ADDRESS_ID = gql`
  mutation GetAddressById($input: String!) {
  getAddressById(input: $input) {
    addresss {
      _id
      name
      building
      street
      state
      city
      isDefault
      phone
    }
  }
}
`
const DELETE_ADDRESS_ID = gql`
mutation DeleteAddress($deleteAddressId: String!) {
  deleteAddress(id: $deleteAddressId) {
    message
  }
}
`
export { CREATE_ADDRESS, GET_ADDRESS_ID, DELETE_ADDRESS_ID }