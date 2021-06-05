import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { AuthHomeContext } from "../../contexts/AuthHomeContext";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { FETCHINCOMES } from "../../graphql/income";
import CurrencyFormat from "react-currency-format";
import { months } from "../../utilities/date";
import errorHandler from "../../utilities/errorHandler";

const Income = () => {
  const {
    user: { currency },
  } = useContext(AppContext);
  const { toggleSpinner } = useContext(AuthHomeContext);
  const [pageFetching, setPageFetching] = useState(null);
  const [incomes, setIncomes] = useState([]);
  const [pagination, setPagination] = useState(null);
  const history = useHistory();
  const [fetchIncomesQuery, { data, error }] = useLazyQuery(FETCHINCOMES, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    fetchIncomes(1);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (data) {
      toggleSpinner(false);
      console.log(data);
      const incomes = data.incomes.incomes;
      const pagination = data.incomes.pagination;
      setIncomes(incomes);
      setPagination(pagination);
      setPageFetching(null);
    }

    if (error) {
      setPageFetching(null);
      toggleSpinner(false);
      errorHandler(error, history);
    }

    // eslint-disable-next-line
  }, [data, error]);

  const fetchIncomes = async (page) => {
    if (pagination && page === pagination.currentPage) {
      return;
    }

    if (incomes.length === 0) {
      toggleSpinner(true);
    }

    setPageFetching(page);
    const variables = { page, number: 9 };
    await fetchIncomesQuery({ variables });
  };

  const displayIncomes = () => {
    return incomes.map((income, index) => {
      return (
        <div
          key={index}
          className="shadow bg-white p-5 mb-5 flex flex-col col-span-4"
        >
          <p className="mb-3 font-semibold text-revolver-purple">
            {income.period.month} {income.period.year}{" "}
            {income.period.month + " " + income.period.year ===
            months[new Date().getMonth()] + " " + new Date().getFullYear() ? (
              <i
                className="relative ml-2 cursor-pointer text-sm text-revolver-purple fa fa-pencil-alt"
                style={{ bottom: "1px" }}
              ></i>
            ) : null}
          </p>
          <p className="mb-3">
            <CurrencyFormat
              value={income.total}
              displayType="text"
              thousandSeparator={true}
              prefix={currency}
            />{" "}
            in total
          </p>
          <p
            className={`mb-3 ${
              String(income.remainder).startsWith("-") ? "text-red" : null
            }`}
          >
            <CurrencyFormat
              value={income.remainder}
              displayType="text"
              thousandSeparator={true}
              prefix={currency}
            />
            {" left"}
          </p>
          <p>{income.expenses_count} expense items</p>
        </div>
      );
    });
  };

  const displayTabs = () => {
    return new Array(pagination.maxPages).fill("").map((value, index) => {
      return (
        <div
          onClick={() => {
            fetchIncomes(index + 1);
          }}
          className={`w-12 h-12 cursor-pointer flex justify-center items-center mr-4 mb-4 ${
            pagination.currentPage === index + 1
              ? "bg-revolver-purple text-white"
              : ""
          }`}
        >
          {pageFetching === index + 1 ? (
            <div
              className="loader"
              style={{
                borderColor: "#301B3F",
                borderTopColor: "transparent",
              }}
            />
          ) : (
            index + 1
          )}
        </div>
      );
    });
  };

  return (
    <div>
      {incomes.length > 0 && (
        <div className="w-full grid grid-cols-12 col-gap-5 mb-5">
          {displayIncomes()}
        </div>
      )}
      {incomes.length > 0 && (
        <div className="flex justify-center">
          {pagination.maxPages > 1 && displayTabs()}
        </div>
      )}
    </div>
  );
};

export default Income;
