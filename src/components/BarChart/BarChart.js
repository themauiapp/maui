import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = ({ data, text }) => (
  <Bar
    data={data}
    options={{
      title: {
        display: true,
        text: { text },
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
      maintainAspectRatio: window.screen.width > 768,
    }}
  />
);

export default React.memo(BarChart);
