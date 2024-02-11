import { gql } from "@apollo/client";

const CREATE_USER = gql`
mutation CreateUser($input: CreateUserDTO!) {
  createUser(input: $input) {
  message,
  user {
    email,
    firstName,
    lastName,
    password,
    phone,
    role
    }
  }
}
`
const LOGIN_USER = gql`
mutation Login($input: LoginUserDTO!) {
  login(input: $input) {
  accessToken,
  refreshToken,
  message
  user {
    firstName,
    lastName,
    email,
    role,
    }
  }
}
`
export {CREATE_USER, LOGIN_USER}