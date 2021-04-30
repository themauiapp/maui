import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { DAILYEXPENSES, WEEKLYEXPENSES } from "../../graphql/expense";
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
  const [periods, setPeriods] = useState({ expense: "d", table: "d" });
  const [page, setPage] = useState(1);
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
    console.log(weeklyError);
    //eslint-disable-next-line
  }, [weeklyExpenses, weeklyError]);

  const parseExpenses = (expenseData) => {
    const {
      expenses,
      pagination: { currentPage, maxPages },
    } = expenseData;
    console.log(expenses);
    setExpenses(expenses);
    setPagination({ currentPage, maxPages });
  };

  const fetchExpenses = async (dt = null, prd = null, pg = null) => {
    const date =
      dt ??
      `${dates.expense.getFullYear()}-${
        String(dates.expense.getMonth() + 1).length === 1
          ? "0" + String(dates.expense.getMonth() + 1)
          : dates.expense.getMonth() + 1
      }-${dates.expense.getDate()}`;
    const period = prd ?? periods.expense;

    if (period === "d") {
      const variables = { number: 10, page: pg ?? page, date };
      await fetchDailyExpenses({ variables });
    }

    if (period === "w") {
      const variables = { number: 10, days: 7, page: pg ?? page, date };
      await fetchWeeklyExpenses({ variables });
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
          <label for="type" className="text-sm mb-3">
            Type
          </label>
          <div className="relative">
            <select
              onChange={(event) => {
                setPeriods({ ...periods, expense: event.target.value });
              }}
              id="type"
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
          <label for="type" className="text-sm mb-3">
            Date
          </label>
          <DatePicker
            id="date"
            selected={dates.expense}
            onChange={(date) => {
              setDates({ ...dates, expense: date });
            }}
            className="w-full bg-transparent border border-revolver-purple focus:outline-none pl-6 py-3"
            readonly
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
          <Loader display={dailyLoading || weeklyLoading} />
        </div>
      </div>
      {expenses && (
        <Table
          data={expenses}
          pagination={pagination}
          date={dates.table}
          period={periods.table}
          fetch={fetchExpenses}
          loading={dailyLoading || weeklyLoading}
        />
      )}
    </div>
  );
};

export default Expenses;
