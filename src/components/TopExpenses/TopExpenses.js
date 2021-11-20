import React, { useState, useEffect, useContext } from "react";
import BarChart from "../BarChart/BarChart";
import { AppContext } from "../../contexts/AppContext";
import { AuthHomeContext } from "../../contexts/AuthHomeContext";
import { TOPEXPENSES } from "../../graphql/expense";
import { useLazyQuery } from "@apollo/client";

const TopExpenses = () => {
  const {
    user: { id },
  } = useContext(AppContext);
  const { reloadPage } = useContext(AuthHomeContext);
  const defaultChartState = {
    labels: null,
    datasets: [
      {
        label: "Top 5 Expenses",
        backgroundColor: "rgba(48, 27, 63, 0.2)",
        borderColor: "transparent",
        borderWidth: 2,
        data: null,
      },
    ],
  };
  const [chartState, setChartState] = useState(defaultChartState);
  const [fetchTopExpenses, { error, data }] = useLazyQuery(TOPEXPENSES, {
    variables: { id },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    fetchTopExpenses();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (reloadPage) {
      fetchTopExpenses();
    }
    // eslint-disable-next-line
  }, [reloadPage]);

  useEffect(() => {
    if (data) {
      const expenses = JSON.parse(data.topExpenses).expenses;
      const newChartState = { ...chartState };
      const labels = [];
      const amounts = [];
      expenses.forEach((expense) => {
        labels.push(expense.name);
        amounts.push(expense.total);
      });
      newChartState.labels = labels;
      newChartState.datasets[0].data = amounts;
      setChartState(newChartState);
    }

    if (error) {
      console.log(error);
    }

    // eslint-disable-next-line
  }, [data, error]);

  return (
    <div className="quicksand bg-white p-8 shadow">
      {chartState.labels && (
        <BarChart data={chartState} text="Top 5 Expenses" />
      )}
    </div>
  );
};

export default React.memo(TopExpenses);
