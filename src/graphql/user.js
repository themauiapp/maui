import { gql } from "@apollo/client";

export const UPDATEUSER = gql`
  mutation UpdateUser(
    $first_name: String
    $last_name: String
    $password: String
    $password_confirmation: String
    $avatar: Upload
  ) {
    updateUser(
      first_name: $first_name
      last_name: $last_name
      password: $password
      password_confirmation: $password_confirmation
      avatar: $avatar
    ) {
      message
      errorId
      user {
        id
        name
        email
        email_verified_at
        avatar {
          url
        }
        total_income
        timezone
        currency
        telegram_id
        latest_income {
          total
          period {
            month
            year
          }
        }
      }
    }
  }
`;

export const UPDATEAVATAR = gql`
  mutation UpdateAvatar($avatar: Upload!) {
    updateAvatar(avatar: $avatar) {
      message
      errorId
      user {
        id
        name
        email
        email_verified_at
        avatar {
          url
        }
        total_income
        timezone
        currency
        telegram_id
        latest_income {
          total
          period {
            month
            year
          }
        }
      }
    }
  }
`;

export const VERIFYRESETEMAIL = gql`
  mutation VerifyResetEmail($password: String!) {
    verifyResetEmail(password: $password) {
      message
    }
  }
`;
