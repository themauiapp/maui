import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation Signup(
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
    $password_confirmation: String!
    $timezone: String!
  ) {
    signup(
      first_name: $first_name
      last_name: $last_name
      email: $email
      password: $password
      password_confirmation: $password_confirmation
      timezone: $timezone
    ) {
      message
      errorId
      user {
        name
        email
        email_verified_at
        avatar
        total_income
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
      errorId
      user {
        name
        email
        email_verified_at
        avatar
        total_income
      }
    }
  }
`;

export const GOOGLELOGIN = gql`
  mutation GoogleLogin($id: ID) {
    googleLogin(id: $id) {
      redirect_url
    }
  }
`;

export const VERIFYGOOGLELOGIN = gql`
  mutation VerifyGoogleLogin($timezone: String!) {
    verifyGoogleLogin(timezone: $timezone) {
      message
      errorId
      user {
        name
        email
        email_verified_at
        avatar
        total_income
      }
    }
  }
`;
