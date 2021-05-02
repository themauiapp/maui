import React, { useState, useEffect } from "react";
import { EXPENSESTATS } from "../../graphql/expense";
import { useLazyQuery } from "@apollo/client";
import Spinner from "../Spinner/Spinner";

const Expense = ({ name, amount }) => {
  const [
    fetchExpenseStats,
    { data, error, loading },
  ] = useLazyQuery(EXPENSESTATS, { fetchPolicy: "network-only" });
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (name) {
      const variables = { name };
      fetchExpenseStats({ variables });
    }
    // eslint-disable-next-line
  }, [name, amount]);

  useEffect(() => {
    if (data) {
      const stats = data.expenseStats;
      setStats(stats);
    }
    console.log(error);
  }, [data, error]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="relative bg-white p-10 flex flex-col rounded"
      style={{ width: "400px", minHeight: "200px" }}
    >
      {stats && !error && (
        <div
          className="relative w-full"
          style={{ height: "4px", background: "rgba(0,0, 0, 0.06)" }}
        >
          <div
            className="absolute top-0 left-0 h-full bg-revolver-purple transition-all ease-in duration-500 mb-3"
            style={{
              width: stats.total
                ? String((amount / stats.total) * 100) + "%"
                : "0%",
            }}
          ></div>
        </div>
      )}
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

export default Expense;
