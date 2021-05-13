import React from "react";
import { Line } from "react-chartjs-2";
import { getFormattedDate, months } from "../../utilities/date";

const LineChart = ({ datasets, labels, period }) => {
  console.log(datasets);
  const determineLegend = (index) => {
    const label = labels[index];
    if (period === "w") {
      return `${getFormattedDate(new Date(label[0]))} - ${getFormattedDate(
        new Date(label[label.length - 1])
      )}`;
    }

    if (period === "m") {
      const date = new Date(label[0]);
      const monthIndex = date.getMonth();
      const year = date.getFullYear();
      return `${months[monthIndex]} ${year}`;
    }
  };

  const data = {
    labels: new Array(datasets[0].length).fill(""),
    datasets: [
      {
        label: determineLegend(0),
        data: datasets[0],
        backgroundColor: "rgba(48, 27, 63, 0.05)",
        fill: true,
        borderColor: "rgba(48, 27, 63, 0.4)",
        borderWidth: 2,
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
        pointRadius: 2,
      },
      {
        label: determineLegend(1),
        data: datasets[1],
        borderColor: "rgba(75,192,192,0.7)",
        backgroundColor: "rgba(75,192,192,0.1)",
        fill: true,
        borderWidth: 2,
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
        pointRadius: 2,
      },
    ],
  };

  return (
    <div className="quicksand bg-white p-12 shadow">
      <Line
        data={data}
        options={{
          title: {
            display: true,
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
    </div>
  );
};

export default React.memo(LineChart);
