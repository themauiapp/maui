import { gql } from "@apollo/client";

export const CURRENTMONTHINCOME = gql`
  query CurrentMonthIncome($id: ID!) {
    currentMonthIncome(id: $id) {
      total
      remainder
    }
  }
`;

export const INCOMESTATS = gql`
  query IncomeStats($id: ID!) {
    incomeStats(id: $id) {
      income_total
      income_spent
      income_remainder
    }
  }
`;

export const ADDINCOME = gql`
  mutation AddIncome($income: Float!, $currency: String) {
    addIncome(income: $income, currency: $currency) {
      message
      errorId
      income {
        user {
          id
          name
          email
          email_verified_at
          avatar
          total_income
          timezone
          currency
          latest_income_period
        }
      }
    }
  }
`;
