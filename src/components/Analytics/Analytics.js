import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import { COMPAREWEEKEXPENSES } from "../../graphql/expense";
import LineChart from "../LineChart/LineChart";
import Button from "../Button/Button";
import { useLazyQuery } from "@apollo/client";
import Loader from "../Loader/Loader";
import { parseDate } from "../../utilities/date";
import errorHandler from "../../utilities/errorHandler";

const Analytics = () => {
  const [
    fetchWeeklyComparison,
    { data: weeklyData, loading: weeklyLoading, error: weeklyError },
  ] = useLazyQuery(COMPAREWEEKEXPENSES, { fetchPolicy: "network-only" });
  const [periods, setPeriods] = useState({ expense: "w", chart: null });
  const [dateOne, setDateOne] = useState(new Date(Date.now() - 2592000000));
  const [dateTwo, setDateTwo] = useState(new Date());
  const [labels, setLabels] = useState(null);
  const [datasets, setDatasets] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (weeklyData) {
      const data = JSON.parse(weeklyData.compareWeekExpenses);
      const { weeks } = data;
      const labels = [];
      const datasets = [];
      weeks.forEach((week) => {
        const weekLabels = Object.keys(week);
        const weekData = Object.values(week);
        labels.push(weekLabels);
        datasets.push(weekData);
      });
      setLabels(labels);
      setDatasets(datasets);
      setPeriods({ ...periods, chart: "w" });
    }

    if (weeklyError) {
      errorHandler(weeklyError, history);
    }
    // eslint-disable-next-line
  }, [weeklyData, weeklyError]);

  const fetchComparison = async () => {
    try {
      if (periods.expense === "w") {
        const variables = {
          dateOne: parseDate(dateOne),
          dateTwo: parseDate(dateTwo),
        };
        await fetchWeeklyComparison({ variables });
      }
    } catch (error) {
      errorHandler(error, history);
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
        <div className="flex flex-col mr-12">
          <label htmlFor="date" className="text-sm mb-3">
            1st {periods.expense === "w" ? "week" : "month"}
          </label>
          <DatePicker
            id="date"
            selected={dateOne}
            onChange={(date) => {
              setDateOne(date);
            }}
            dateFormat={periods.expense === "m" ? "MM-yyyy" : "yyyy-MM-dd"}
            className="w-full bg-transparent border border-revolver-purple focus:outline-none pl-6 py-3"
            maxDate={new Date()}
          />
        </div>
        <div className="flex flex-col mr-auto">
          <label htmlFor="date" className="text-sm mb-3">
            2nd {periods.expense === "w" ? "week" : "month"}
          </label>
          <DatePicker
            id="date"
            selected={dateTwo}
            onChange={(date) => {
              setDateTwo(date);
            }}
            dateFormat={periods.expense === "m" ? "MM-yyyy" : "yyyy-MM-dd"}
            className="w-full bg-transparent border border-revolver-purple focus:outline-none pl-6 py-3"
            maxDate={new Date()}
          />
        </div>
        <div style={{ position: "relative" }}>
          <Button
            type="outlined"
            onClick={() => {
              fetchComparison();
            }}
          >
            View
          </Button>
          <Loader display={weeklyLoading} />
        </div>
      </div>
      {labels && datasets && (
        <LineChart labels={labels} period={periods.chart} datasets={datasets} />
      )}
    </div>
  );
};

export default Analytics;
