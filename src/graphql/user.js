import { gql } from "@apollo/client";

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
