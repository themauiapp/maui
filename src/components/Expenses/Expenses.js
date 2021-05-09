import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { useHistory } from "react-router-dom";
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
import { parseDate } from "../../utilities/date";
import exportToXlsx from "../../utilities/file";
import errorHandler from "../../utilities/errorHandler";

const Expenses = () => {
  const {
    user: { name, currency },
  } = useContext(AppContext);
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
  const history = useHistory();
  const [periods, setPeriods] = useState({ expense: "d", table: "d" });
  const [dates, setDates] = useState({
    expense: new Date(),
    table: new Date(),
  });
  const [expenses, setExpenses] = useState(null);
  const [sum, setSum] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [download, setDownload] = useState(false);

  useEffect(() => {
    if (dailyExpenses) {
      parseExpenses(dailyExpenses.dailyExpenses);
    }

    if (dailyError) {
      errorHandler(dailyError, history);
    }
    //eslint-disable-next-line
  }, [dailyExpenses, dailyError]);

  useEffect(() => {
    if (weeklyExpenses) {
      parseExpenses(weeklyExpenses.weeklyExpenses);
    }

    if (weeklyError) {
      errorHandler(weeklyError, history);
    }
    //eslint-disable-next-line
  }, [weeklyExpenses, weeklyError]);

  useEffect(() => {
    if (incomeExpenses) {
      parseExpenses(incomeExpenses.incomeExpenses);
    }

    if (incomeError) {
      errorHandler(incomeError, history);
    }
    //eslint-disable-next-line
  }, [incomeExpenses, incomeError]);

  const parseExpenses = (expenseData) => {
    const { expenses, sum } = expenseData;

    if (!download) {
      const {
        pagination: { currentPage, maxPages },
      } = expenseData;
      setExpenses(expenses);
      setSum(sum);
      setPagination({
        currentPage,
        maxPages,
      });
      setDates({ ...dates, table: parseDate(dates.expense) });
      setPeriods({ ...periods, table: periods.expense });
      return;
    }

    exportToXlsx(
      name.replace(/ /g, "_"),
      currency,
      parseDate(dates.expense),
      periods.expense,
      expenses
    );
    setDownload(false);
  };

  const fetchExpenses = async (
    dt = null,
    prd = null,
    pg = null,
    all = null
  ) => {
    const date = dt ?? parseDate(dates.expense);
    const period = prd ?? periods.expense;
    setDownload(all);

    if (period === "d") {
      const variables = { number: 10, page: pg ?? 1, date, all: all ?? false };
      await fetchDailyExpenses({ variables });
    }

    if (period === "w") {
      const variables = {
        number: 10,
        days: 7,
        page: pg ?? 1,
        date,
        all: all ?? false,
      };
      await fetchWeeklyExpenses({ variables });
    }

    if (period === "m") {
      const variables = { number: 10, page: pg ?? 1, date, all: all ?? false };
      await fetchIncomeExpenses({ variables });
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
            maxDate={new Date()}
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
          sum={sum}
          loading={dailyLoading || weeklyLoading || incomeLoading}
        />
      )}
    </div>
  );
};

export default Expenses;
