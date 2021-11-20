import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { EXPENSESTATS } from "../../graphql/expense";
import { useLazyQuery } from "@apollo/client";
import Spinner from "../Spinner/Spinner";

const Expense = ({ name }) => {
  const { user } = useContext(AppContext);
  const currency = user.currency ?? "";
  const [fetchExpenseStats, { data, error, loading }] = useLazyQuery(
    EXPENSESTATS,
    { fetchPolicy: "network-only" }
  );
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (name) {
      const variables = { name };
      fetchExpenseStats({ variables });
    }
    // eslint-disable-next-line
  }, [name]);

  useEffect(() => {
    if (data) {
      const stats = data.expenseStats;
      console.log(stats);
      setStats(stats);
    }
    console.log(error);
  }, [data, error]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="relative bg-white p-10 flex flex-col rounded dialog"
      style={{ minHeight: "200px" }}
    >
      {stats && !error && (
        <>
          <div
            className="relative w-full mb-5"
            style={{ height: "4px", background: "rgba(0,0, 0, 0.06)" }}
          >
            <div
              className="absolute top-0 left-0 h-full bg-revolver-purple transition-all ease-in duration-500 mb-3"
              style={{
                width: stats.percent_of_expenses,
              }}
            ></div>
          </div>
          <div className="flex flex-col">
            <p className="mb-3">
              {name.charAt(0).toUpperCase() + name.slice(1)} -{" "}
              {stats.percent_of_expenses} of total expenditure ({currency}
              {stats.total})
            </p>
            <p className="mb-3">
              Recorded {stats.times_recorded} times in total
            </p>
            <p className="mb-3">First recorded {stats.first_recorded}</p>
            <p className="mb-0">Last recorded {stats.last_recorded}</p>
            {/* <Button>Close</Button> */}
          </div>
        </>
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
