import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import CurrentMonthData from "../CurrentMonthData/CurrentMonthData";
import IncomeStats from "../IncomeStats/IncomeStats";
import TopExpenses from "../TopExpenses/TopExpenses";

const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-12 col-gap-5">
        <div className="col-span-7 flex flex-col">
          <CurrentMonthData />
        </div>
        <div className="col-span-5">
          <IncomeStats />
        </div>
      </div>
      <div className="my-5">
        <TopExpenses />
      </div>
    </div>
  );
};

export default Dashboard;
