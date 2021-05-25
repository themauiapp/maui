import React from "react";
import CurrentMonthData from "../CurrentMonthData/CurrentMonthData";
import IncomeStats from "../IncomeStats/IncomeStats";
import TopExpenses from "../TopExpenses/TopExpenses";
import TodaysExpenses from "../TodaysExpenses/TodaysExpenses";

const Dashboard = () => {
  return (
    <div className="flex flex-col pb-5">
      <div className="grid grid-cols-12 col-gap-5">
        <div className="col-span-12 bsm:col-span-7 mb-5 bsm:mb-0 flex flex-col">
          <CurrentMonthData />
        </div>
        <div className="col-span-12 bsm:col-span-5">
          <IncomeStats />
        </div>
      </div>
      <div className="my-5">
        <TopExpenses />
      </div>
      <div>
        <TodaysExpenses />
      </div>
    </div>
  );
};

export default Dashboard;
