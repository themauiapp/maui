import React, { useState, useEffect, useContext } from "react";
import { Bar } from "react-chartjs-2";
import { AppContext } from "../../contexts/AppContext";
import { TOPEXPENSES } from "../../graphql/expense";
import { useQuery } from "@apollo/client";

const TopExpenses = () => {
  const {
    user: { id },
  } = useContext(AppContext);
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
  const { error, data } = useQuery(TOPEXPENSES, {
    variables: { id },
    fetchPolicy: "network-only",
  });

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
        <Bar
          data={chartState}
          options={{
            title: {
              display: true,
              text: "Top 5 Expenses",
              font: { family: "Quicksand" },
            },
            legend: {
              display: true,
              position: "left",
              font: { family: "Quicksand" },
            },
            scales: {
              y: {
                grid: { display: false, drawBorder: false },
                ticks: {
                  font: { family: "Quicksand", size: 13 },
                },
              },
              x: {
                grid: { display: false, drawBorder: false },
                ticks: {
                  font: { family: "Quicksand", size: 13 },
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default TopExpenses;
