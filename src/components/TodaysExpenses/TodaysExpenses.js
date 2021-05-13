import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import { AuthHomeContext } from "../../contexts/AuthHomeContext";
import { DAILYEXPENSES, DELETEEXPENSE } from "../../graphql/expense";
import { useLazyQuery, useMutation } from "@apollo/client";
import { parseDate } from "../../utilities/date";
import exportToXlsx from "../../utilities/file";
import Table from "../Common/Table/Table";
import DataFetching from "../DataFetching/DataFetching";
import { notifySuccess } from "../../services/notify";
import errorHandler from "../../utilities/errorHandler";

const TodaysExpenses = () => {
  const {
    user: { name, currency },
  } = useContext(AppContext);
  const { setLoading } = useContext(AuthHomeContext);
  const [
    fetchDailyExpenses,
    { data, loading, error },
  ] = useLazyQuery(DAILYEXPENSES, { fetchPolicy: "network-only" });
  const [deleteExpenseMutation] = useMutation(DELETEEXPENSE);
  const [expenses, setExpenses] = useState(null);
  const [sum, setSum] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [download, setDownload] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetchExpenses(1);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (data) {
      const { expenses, sum } = data.dailyExpenses;

      if (!download) {
        const {
          pagination: { currentPage, maxPages },
        } = data.dailyExpenses;
        setExpenses(expenses);
        setSum(sum);
        setPagination({ currentPage, maxPages });
        return;
      }

      exportToXlsx(
        name.replace(/ /g, "_"),
        currency,
        parseDate(new Date()),
        "d",
        expenses
      );
      setDownload(false);
    }

    if (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, [data, error]);

  const fetchExpenses = async (date = null, period = null, page, all) => {
    const variables = {
      number: 10,
      page,
      date: parseDate(new Date()),
      all: all ?? false,
    };
    setDownload(all);
    await fetchDailyExpenses({ variables });
  };

  const deleteExpense = async (id, date, period, page) => {
    const proceed = window.confirm("are you sure you want to delete ?");
    if (!proceed) {
      return;
    }
    setLoading(true);
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
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white shadow" style={{ minHeight: "200px" }}>
      {expenses && (
        <Table
          data={expenses}
          pagination={pagination}
          loading={loading}
          fetch={fetchExpenses}
          date={parseDate(new Date())}
          period="d"
          sum={sum}
          deleteExpense={deleteExpense}
        />
      )}
      <DataFetching display={loading && !expenses} />
    </div>
  );
};

export default TodaysExpenses;
