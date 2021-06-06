import { gql } from "@apollo/client";

export const CURRENTMONTHINCOME = gql`
  query CurrentMonthIncome($id: ID!) {
    currentMonthIncome(id: $id) {
      total
      remainder
      percent_remainder
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
  }
`;

export const UPDATEINCOME = gql`
  mutation UpdateIncome($income: Float!) {
    updateIncome(income: $income) {
      message
      errorId
      income {
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
  }
`;

export const FETCHINCOMES = gql`
  query Incomes($page: Int!, $number: Int!) {
    incomes(page: $page, number: $number) {
      incomes {
        total
        remainder
        period {
          month
          year
        }
        expenses_count
        top_expense {
          name
          amount
        }
      }
      pagination {
        currentPage
        maxPages
      }
    }
  }
`;
