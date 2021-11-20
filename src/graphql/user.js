import { gql } from "@apollo/client";

export const FETCHUSER = gql`
  query Me {
    me {
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
      latest_income {
        total
        period {
          month
          year
        }
      }
    }
  }
`;

export const GETTELEGRAMSETTINGS = gql`
  query User($id: ID!) {
    user(id: $id) {
      telegram {
        telegram_id
        notify_12pm
        notify_6pm
        notify_10pm
      }
    }
  }
`;

export const UPDATETELEGRAMSETTINGS = gql`
  mutation UpdateTelegramSettings(
    $notify_12pm: Boolean!
    $notify_6pm: Boolean!
    $notify_10pm: Boolean!
  ) {
    updateTelegramSettings(
      notify_12pm: $notify_12pm
      notify_6pm: $notify_6pm
      notify_10pm: $notify_10pm
    ) {
      message
    }
  }
`;

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
