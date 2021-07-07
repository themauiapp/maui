import { monthEnds, parseDate } from "./date";

export const checkExpenseUpdated = (lastExpense, expenses, period, date) => {
  if (!expenses) {
    return false;
  }

  if (period === "d") {
    return checkExpenseUpdatedDaily(lastExpense, date);
  }

  if (period === "w") {
    return checkExpenseUpdatedWeekly(lastExpense, date);
  }

  return checkExpenseUpdatedMonthly(lastExpense, date);
};

const checkExpenseUpdatedDaily = (lastExpense, date) => {
  const dateInMilliSeconds = new Date(lastExpense.created_at).getTime();
  const parsedDate = parseDate(date);
  const from = new Date(`${parsedDate} 00:00:00`).getTime();
  const to = new Date(`${parsedDate} 23:59:59`).getTime();

  if (dateInMilliSeconds >= from && dateInMilliSeconds <= to) {
    return true;
  }

  return false;
};

const checkExpenseUpdatedWeekly = (lastExpense, date) => {
  const dateInMilliSeconds = new Date(lastExpense.created_at).getTime();
  const parsedDate = parseDate(date);
  const from = new Date(`${parsedDate} 00:00:00`).getTime();
  const to = from + 8 * 86400000;

  if (dateInMilliSeconds >= from && dateInMilliSeconds <= to) {
    return true;
  }

  return false;
};

const checkExpenseUpdatedMonthly = (lastExpense, date) => {
  const dateInMilliSeconds = new Date(lastExpense.created_at).getTime();
  const monthIndex = date.getMonth();
  let month = String(monthIndex + 1);
  month = month.length === 1 ? "0" + month : month;
  const year = date.getFullYear();
  const from = new Date(`${year}-${month}-01 00:00:00`).getTime();
  const to = new Date(
    `${year}-${month}-${monthEnds[monthIndex]} 23:59:59`
  ).getTime();

  if (dateInMilliSeconds >= from && dateInMilliSeconds <= to) {
    return true;
  }

  return false;
};

export default checkExpenseUpdated;
