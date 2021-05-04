import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { DAILYEXPENSES } from "../../graphql/expense";
import { useLazyQuery } from "@apollo/client";
import { parseDate } from "../../utilities/date";
import exportToXlsx from "../../utilities/file";
import Table from "../Common/Table/Table";
import DataFetching from "../DataFetching/DataFetching";

const TodaysExpenses = () => {
  const {
    user: { name, currency },
  } = useContext(AppContext);
  const [
    fetchDailyExpenses,
    { data, loading, error },
  ] = useLazyQuery(DAILYEXPENSES, { fetchPolicy: "network-only" });
  const [expenses, setExpenses] = useState(null);
  const [sum, setSum] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [download, setDownload] = useState(null);

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
        />
      )}
      <DataFetching display={loading && !expenses} />
    </div>
  );
};

export default TodaysExpenses;
