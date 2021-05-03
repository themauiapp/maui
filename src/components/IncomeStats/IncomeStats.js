import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { INCOMESTATS } from "../../graphql/income";
import { useQuery } from "@apollo/client";
import Spinner from "../Spinner/Spinner";

const IncomeStats = () => {
  const { user } = useContext(AppContext);
  const currency = user.currency ?? "";
  const { data, error, loading } = useQuery(INCOMESTATS, {
    variables: { id: user.id },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      setStats(data.incomeStats);
    }

    if (error) {
      console.log(error);
    }
  }, [data, error]);

  const [stats, setStats] = useState(null);
  return (
    <div className="relative w-full h-full grid grid-rows-3 row-gap-3">
      <div className="col-span-1 bg-white shadow text-md flex items-center p-6">
        <div className="w-12 h-12 flex justify-center items-center rounded-lg mr-10 bg-oxford-blue">
          <i className="fa fa-wallet text-white"></i>
        </div>
        <div className="flex flex-col">
          <p className="text-lg mb-1">
            {currency}
            {stats && stats.income_total}
          </p>
          <p style={{ fontSize: "13px" }}>Total income earned</p>
        </div>
      </div>
      <div className="col-span-1 bg-white shadow text-md flex items-center p-6">
        <div className="w-12 h-12 flex justify-center items-center rounded-lg mr-10 bg-light-red">
          <i className="fa fa-credit-card text-white"></i>
        </div>
        <div className="flex flex-col">
          <p className="text-lg mb-1">
            {currency}
            {stats && stats.income_spent}
          </p>
          <p style={{ fontSize: "13px" }}>Income spent</p>
        </div>
      </div>
      <div className="col-span-1 bg-white shadow text-md flex items-center p-6">
        <div
          className="w-12 h-12 flex justify-center items-center rounded-lg mr-10"
          style={{ background: "#387C6D" }}
        >
          <i className="fa fa-coins text-white"></i>
        </div>
        <div className="flex flex-col">
          <p className="text-lg mb-1">
            {currency}
            {stats && stats.income_remainder}
          </p>
          <p style={{ fontSize: "13px" }}>Income remaining</p>
        </div>
      </div>
      <div
        className={`absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center transition-opacity duration-500 ease-in ${
          loading ? "z-10 opacity-100" : "z--9999 opacity-0"
        }`}
      >
        <Spinner display={true} fixed={false} />
      </div>
    </div>
  );
};

export default IncomeStats;
