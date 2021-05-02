import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import {
  DAILYEXPENSES,
  WEEKLYEXPENSES,
  INCOMEEXPENSES,
} from "../../graphql/expense";
import { useLazyQuery } from "@apollo/client";
import Button from "../Button/Button";
import Table from "../Common/Table/Table";
import Loader from "../Loader/Loader";

const Expenses = () => {
  const [
    fetchDailyExpenses,
    { data: dailyExpenses, loading: dailyLoading, error: dailyError },
  ] = useLazyQuery(DAILYEXPENSES, {
    fetchPolicy: "network-only",
  });
  const [
    fetchWeeklyExpenses,
    { data: weeklyExpenses, loading: weeklyLoading, error: weeklyError },
  ] = useLazyQuery(WEEKLYEXPENSES, {
    fetchPolicy: "network-only",
  });
  const [
    fetchIncomeExpenses,
    { data: incomeExpenses, loading: incomeLoading, error: incomeError },
  ] = useLazyQuery(INCOMEEXPENSES, {
    fetchPolicy: "network-only",
  });
  const [periods, setPeriods] = useState({ expense: "d", table: "d" });
  const [dates, setDates] = useState({
    expense: new Date(),
    table: new Date(),
  });
  const [expenses, setExpenses] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    if (dailyExpenses) {
      parseExpenses(dailyExpenses.dailyExpenses);
    }
    //eslint-disable-next-line
  }, [dailyExpenses, dailyError]);

  useEffect(() => {
    if (weeklyExpenses) {
      parseExpenses(weeklyExpenses.weeklyExpenses);
    }
    //eslint-disable-next-line
  }, [weeklyExpenses, weeklyError]);

  useEffect(() => {
    if (incomeExpenses) {
      parseExpenses(incomeExpenses.incomeExpenses);
    }
    // console.log(incomeError);
    //eslint-disable-next-line
  }, [incomeExpenses, incomeError]);

  const parseExpenses = (expenseData) => {
    const {
      expenses,
      pagination: { currentPage, maxPages },
    } = expenseData;
    console.log(expenses);
    setExpenses(expenses);
    setPagination({ currentPage, maxPages });
  };

  const parseDate = () => {
    const year = dates.expense.getFullYear();
    const month =
      String(dates.expense.getMonth() + 1).length === 1
        ? "0" + String(dates.expense.getMonth() + 1)
        : dates.expense.getMonth() + 1;
    const day =
      String(dates.expense.getDate() + 1).length === 1
        ? "0" + String(dates.expense.getDate())
        : dates.expense.getDate();

    return `${year}-${month}-${day}`;
  };

  const fetchExpenses = async (dt = null, prd = null, pg = null) => {
    const date = dt ?? parseDate();
    const period = prd ?? periods.expense;

    if (period === "d") {
      const variables = { number: 10, page: pg ?? 1, date };
      await fetchDailyExpenses({ variables });
    }

    if (period === "w") {
      const variables = { number: 10, days: 7, page: pg ?? 1, date };
      await fetchWeeklyExpenses({ variables });
    }

    if (period === "m") {
      const variables = { number: 10, page: pg ?? 1, date };
      await fetchIncomeExpenses({ variables });
    }

    if (!dt) {
      setDates({ ...dates, table: date });
      setPeriods({ ...periods, table: period });
    }
  };

  return (
    <div className="pb-10">
      <div className="p-12 mb-5 bg-white shadow flex items-end">
        <div className="flex flex-col">
          <label htmlFor="type" className="text-sm mb-3">
            Type
          </label>
          <div className="relative">
            <select
              id="type"
              onChange={(event) => {
                setPeriods({ ...periods, expense: event.target.value });
              }}
              className="focus:outline-none bg-transparent border border-revolver-purple pl-6 pr-12 py-3 mr-12"
            >
              <option value="d">Daily</option>
              <option value="w">Weekly</option>
              <option value="m">Monthly</option>
            </select>
            <i
              className="absolute right-0 text-revolver-purple fa fa-chevron-right"
              style={{
                transform: "rotate(90deg)",
                top: "calc((100% - 13px)/2)",
                marginRight: "4.3rem",
              }}
            ></i>
          </div>
        </div>
        <div className="flex flex-col mr-auto">
          <label htmlFor="date" className="text-sm mb-3">
            Date
          </label>
          <DatePicker
            id="date"
            selected={dates.expense}
            onChange={(date) => {
              setDates({ ...dates, expense: date });
            }}
            className="w-full bg-transparent border border-revolver-purple focus:outline-none pl-6 py-3"
            dateFormat={periods.expense === "m" ? "MM-yyyy" : "yyyy-MM-dd"}
            showMonthYearPicker={periods.expense === "m"}
          />
        </div>
        <div style={{ position: "relative" }}>
          <Button
            type="outlined"
            onClick={() => {
              fetchExpenses();
            }}
          >
            View
          </Button>
          <Loader display={dailyLoading || weeklyLoading || incomeLoading} />
        </div>
      </div>
      {expenses && (
        <Table
          data={expenses}
          pagination={pagination}
          date={dates.table}
          period={periods.table}
          fetch={fetchExpenses}
          loading={dailyLoading || weeklyLoading || incomeLoading}
        />
      )}
    </div>
  );
};

export default Expenses;
