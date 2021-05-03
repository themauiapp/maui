import React, { useState, useEffect } from "react";
import { DAILYEXPENSES } from "../../graphql/expense";
import { useLazyQuery } from "@apollo/client";
import { parseDate } from "../../utilities/date";
import Table from "../Common/Table/Table";
import DataFetching from "../DataFetching/DataFetching";

const TodaysExpenses = () => {
  const [
    fetchDailyExpenses,
    { data, loading, error },
  ] = useLazyQuery(DAILYEXPENSES, { fetchPolicy: "network-only" });
  const [expenses, setExpenses] = useState(null);
  const [sum, setSum] = useState(null);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchExpenses(1);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (data) {
      const {
        expenses,
        sum,
        pagination: { currentPage, maxPages },
      } = data.dailyExpenses;
      setExpenses(expenses);
      setSum(sum);
      setPagination({ currentPage, maxPages });
    }

    if (error) {
      console.log(error);
    }
  }, [data, error]);

  const fetchExpenses = async (page) => {
    const variables = { number: 10, page, date: parseDate(new Date()) };
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
      <DataFetching display={loading} />
    </div>
  );
};

export default TodaysExpenses;
