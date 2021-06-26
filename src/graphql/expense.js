import { gql } from "@apollo/client";

export const TOPEXPENSES = gql`
  query TopExpenses($id: ID) {
    topExpenses(id: $id)
  }
`;

export const DAILYEXPENSES = gql`
  query DailyExpenses($number: Int, $page: Int, $date: String!, $all: Boolean) {
    dailyExpenses(number: $number, page: $page, date: $date, all: $all) {
      expenses {
        id
        name
        amount
        time
        created_at
      }
      sum
      errorId
      pagination {
        currentPage
        maxPages
      }
    }
  }
`;

export const WEEKLYEXPENSES = gql`
  query WeeklyExpenses(
    $number: Int
    $page: Int
    $days: Int
    $date: String!
    $all: Boolean
  ) {
    weeklyExpenses(
      number: $number
      page: $page
      days: $days
      date: $date
      all: $all
    ) {
      expenses {
        id
        name
        amount
        time
        created_at
      }
      sum
      errorId
      pagination {
        currentPage
        maxPages
      }
    }
  }
`;

export const INCOMEEXPENSES = gql`
  query IncomeExpenses(
    $number: Int
    $page: Int
    $date: String!
    $all: Boolean
  ) {
    incomeExpenses(number: $number, page: $page, date: $date, all: $all) {
      expenses {
        id
        name
        amount
        time
        created_at
      }
      sum
      errorId
      pagination {
        currentPage
        maxPages
      }
    }
  }
`;

export const EXPENSESTATS = gql`
  query ExpenseStats($name: String!) {
    expenseStats(name: $name) {
      name
      total
      first_recorded
      last_recorded
      times_recorded
      percent_of_expenses
      message
      errorId
    }
  }
`;

export const ADDEXPENSE = gql`
  mutation AddExpense($name: String!, $amount: Float!, $date: String) {
    addExpense(name: $name, amount: $amount, date: $date) {
      errorId
    }
  }
`;

export const UPDATEEXPENSE = gql`
  mutation UpdateExpense($id: ID!, $name: String, $amount: Float) {
    updateExpense(id: $id, name: $name, amount: $amount) {
      message
      errorId
      sum
    }
  }
`;

export const COMPAREWEEKEXPENSES = gql`
  query CompareWeekExpenses($dateOne: String!, $dateTwo: String!) {
    compareWeekExpenses(dateOne: $dateOne, dateTwo: $dateTwo)
  }
`;

export const COMPAREMONTHEXPENSES = gql`
  query CompareMonthExpenses($dateOne: String!, $dateTwo: String!) {
    compareMonthExpenses(dateOne: $dateOne, dateTwo: $dateTwo)
  }
`;

export const DELETEEXPENSE = gql`
  mutation DeleteExpense($id: ID!) {
    deleteExpense(id: $id) {
      message
      errorId
    }
  }
`;

export const SEARCHEXPENSES = gql`
  query SearchExpenses(
    $searchTerm: String!
    $number: Int
    $page: Int
    $all: Boolean
  ) {
    searchExpenses(
      searchTerm: $searchTerm
      number: $number
      page: $page
      all: $all
    ) {
      expenses {
        id
        name
        amount
        time
        created_at
      }
      sum
      errorId
      pagination {
        currentPage
        maxPages
      }
    }
  }
`;
