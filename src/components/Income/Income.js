import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { AuthHomeContext } from "../../contexts/AuthHomeContext";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { FETCHINCOMES } from "../../graphql/income";
import CurrencyFormat from "react-currency-format";
import { monthEnds, months } from "../../utilities/date";
import errorHandler from "../../utilities/errorHandler";

const Income = () => {
  const {
    user: { currency },
  } = useContext(AppContext);
  const {
    toggleSpinner,
    dialogs,
    setDialogs,
    lastUpdatedExpense,
    setShowReloadPage,
    reloadPage,
  } = useContext(AuthHomeContext);
  const [pageFetching, setPageFetching] = useState(null);
  const [incomes, setIncomes] = useState([]);
  const [pagination, setPagination] = useState(null);
  const history = useHistory();
  const [fetchIncomesQuery, { data, error }] = useLazyQuery(FETCHINCOMES, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    fetchIncomes(1);
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (lastUpdatedExpense) {
      isIncomeAffected(lastUpdatedExpense.created_at);
    }
    // eslint-disable-next-line
  }, [lastUpdatedExpense]);

  useEffect(() => {
    if (reloadPage) {
      fetchIncomes(pagination ? pagination.currentPage : 1, true);
    }
    // eslint-disable-next-line
  }, [reloadPage]);

  // helper method to check if the latest updated expense
  // is for an income period which the user is currently viewing
  const isIncomeAffected = (dt) => {
    const dateInMilliseconds = new Date(dt).getTime();
    const lastIncomeTime = parseIncomeTime(incomes[0], true);
    const firstIncomeTime = parseIncomeTime(incomes[incomes.length - 1]);
    // eslint-disable-next-line
    if (
      dateInMilliseconds >= firstIncomeTime &&
      dateInMilliseconds <= lastIncomeTime
    ) {
      setShowReloadPage(true);
    }
  };

  const parseIncomeTime = (income, last = false) => {
    const incomeYear = income.period.year;
    const monthIndex = months.findIndex(
      (month) => month === income.period.month
    );
    let incomeMonth = String(monthIndex + 1);
    incomeMonth = incomeMonth.length === 1 ? "0" + incomeMonth : incomeMonth;
    return new Date(
      `${incomeYear}-${incomeMonth}-${
        last ? monthEnds[monthIndex] : "01"
      } 00:00:00`
    ).getTime();
  };

  useEffect(() => {
    if (data) {
      toggleSpinner(false);
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

  const fetchIncomes = async (page, spin = false) => {
    if (pagination && page === pagination.currentPage && !spin) {
      return;
    }

    if (incomes.length === 0 || spin) {
      toggleSpinner(true);
    }

    setPageFetching(page);
    const variables = { page, number: 8 };
    await fetchIncomesQuery({ variables });
  };

  const displayIncomes = () => {
    return incomes.map((income, index) => {
      return (
        <div
          key={index}
          className="shadow bg-white p-5 mb-5 flex flex-col col-span-12 bsm:col-span-6 grid grid-cols-12"
        >
          <div className="col-span-6 flex flex-col">
            <p className="mb-3">
              {income.period.month} {income.period.year}{" "}
              {income.period.month + " " + income.period.year ===
              months[new Date().getMonth()] + " " + new Date().getFullYear() ? (
                <i
                  className="relative ml-2 cursor-pointer text-sm text-revolver-purple fa fa-pencil-alt"
                  onClick={() => {
                    setDialogs({ ...dialogs, updateIncome: true });
                  }}
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
              earned
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
          <div className="col-span-6 flex flex-col justify-center items-center">
            <p className="flex text-md italic sm:not-italic">
              <CurrencyFormat
                value={income.total - income.remainder}
                displayType="text"
                thousandSeparator={true}
                prefix={currency}
              />
              <span className="ml-1">spent</span>
            </p>
          </div>
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
