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
