import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { AuthHomeContext } from "../../contexts/AuthHomeContext";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import {
  DAILYEXPENSES,
  WEEKLYEXPENSES,
  INCOMEEXPENSES,
  DELETEEXPENSE,
} from "../../graphql/expense";
import { useLazyQuery, useMutation } from "@apollo/client";
import Button from "../Button/Button";
import Table from "../Common/Table/Table";
import Loader from "../Loader/Loader";
import { parseDate } from "../../utilities/date";
import exportToXlsx from "../../utilities/file";
import checkExpenseUpdated from "../../utilities/expenseUpdate";
import errorHandler from "../../utilities/errorHandler";
import { notifySuccess } from "../../services/notify";

const Expenses = () => {
  const {
    user: { name, currency },
  } = useContext(AppContext);
  const { toggleSpinner, lastUpdatedExpense, setShowReloadPage, reloadPage } =
    useContext(AuthHomeContext);
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
  const [deleteExpenseMutation] = useMutation(DELETEEXPENSE);
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
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (
      lastUpdatedExpense &&
      checkExpenseUpdated(
        lastUpdatedExpense,
        expenses,
        periods.expense,
        dates.expense
      )
    ) {
      setShowReloadPage(true);
    }
    // eslint-disable-next-line
  }, [lastUpdatedExpense]);

  useEffect(() => {
    if (reloadPage) {
      fetchExpenses(
        parseDate(dates.expense),
        periods.expense,
        pagination.currentPage
      );
    }
    // eslint-disable-next-line
  }, [reloadPage]);

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

  const deleteExpense = async (id, date, period, page) => {
    const proceed = window.confirm("are you sure you want to delete ?");
    if (!proceed) {
      return;
    }
    toggleSpinner(true);
    try {
      const variables = { id };
      const response = await deleteExpenseMutation({ variables });
      const data = response.data.deleteExpense;
      if (data.errorId) {
        const error = new Error(data.errorId);
        throw error;
      }
      await fetchExpenses(date, period, page);
      notifySuccess("expense deleted successfully");
    } catch (error) {
      errorHandler(error, history);
    } finally {
      toggleSpinner(false);
    }
  };

  return (
    <div className="pb-10">
      <div className="p-8 bsm:p-12 mb-5 bg-white shadow flex flex-col bsm:flex-row bsm:items-end">
        <div className="flex flex-col mb-4 bsm:mb-0">
          <label htmlFor="type" className="text-sm mb-3">
            Type
          </label>
          <div className="relative">
            <select
              id="type"
              onChange={(event) => {
                setPeriods({ ...periods, expense: event.target.value });
              }}
              className="focus:outline-none bg-transparent border border-revolver-purple w-full bsm:w-fc pl-6 pr-12 py-3 bsm:mr-12"
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
                marginRight: window.screen.width > 610 ? "4.3rem" : "1.5rem",
              }}
            ></i>
          </div>
        </div>
        <div className="flex flex-col mb-6 bsm:mb-0 bsm:mr-auto">
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
        <div className="pb-5">
          <Table
            data={expenses}
            pagination={pagination}
            date={dates.table}
            period={periods.table}
            fetch={fetchExpenses}
            sum={sum}
            loading={dailyLoading || weeklyLoading || incomeLoading}
            deleteExpense={deleteExpense}
          />
        </div>
      )}
    </div>
  );
};

export default Expenses;
