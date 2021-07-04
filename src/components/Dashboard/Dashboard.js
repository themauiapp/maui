import React, { useEffect, useContext } from "react";
import { AuthHomeContext } from "../../contexts/AuthHomeContext";
import CurrentMonthData from "../CurrentMonthData/CurrentMonthData";
import IncomeStats from "../IncomeStats/IncomeStats";
import TopExpenses from "../TopExpenses/TopExpenses";
import TodaysExpenses from "../TodaysExpenses/TodaysExpenses";

const Dashboard = () => {
  const { lastUpdatedExpense, setShowReloadPage } = useContext(AuthHomeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (lastUpdatedExpense) {
      setShowReloadPage(true);
    }

    return () => {
      setShowReloadPage(false);
    };
    // eslint-disable-next-line
  }, [lastUpdatedExpense]);

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
      <div className="pb-10">
        <TodaysExpenses />
      </div>
    </div>
  );
};

export default Dashboard;
