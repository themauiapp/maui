import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { AuthHomeContext } from "../../../contexts/AuthHomeContext";
import { getFormattedDate, parseDate } from "../../../utilities/date";
import "./Table.css";

const Table = ({ data, pagination, date, period, fetch, sum, loading }) => {
  const pages = new Array(pagination.maxPages).fill("");
  const [clickedPage, setClickedPage] = useState(null);
  const { user } = useContext(AppContext);
  const currency = user.currency ?? "";
  const { dialogs, setDialogs, setViewedExpense, setExpense } = useContext(
    AuthHomeContext
  );

  useEffect(() => {
    setClickedPage(null);
    clearExpenseOptions();
  }, [data]);

  const fetchExpenses = async (page) => {
    if (clickedPage) {
      return;
    }
    setClickedPage(page - 1);
    if (date) {
      await fetch(date, period, page);
      return;
    }

    await fetch(page);
  };

  const parseExpenseString = () => {
    let expenseString;

    if (parseDate(new Date()) === date && period === "d") {
      return "spent today";
    }
    switch (period) {
      case "d":
        expenseString = `spent on ${getFormattedDate(new Date(date))}`;
        break;
      case "w":
        expenseString = `spent between ${getFormattedDate(
          new Date(date)
        )} and ${getFormattedDate(
          new Date(new Date(date).getTime() + 604800000)
        )}`;
        break;
      case "m":
        expenseString = `spent in ${getFormattedDate(new Date(date), true)}`;
        break;
      default:
        expenseString = `spent on ${getFormattedDate(date)}`;
    }
    return expenseString;
  };

  const clearExpenseOptions = () => {
    const indexes = new Array(10).fill("");
    indexes.forEach((index, idx) => {
      const id = `options-${idx}`;
      const options = document.getElementById(id);
      if (options) {
        options.classList.add("opacity-0");
        options.classList.add("z--9999");
        options.classList.remove("opacity-100");
        options.classList.remove("z-10");
      }
    });
  };

  const toggleExpenseOptions = (index) => {
    const id = `options-${index}`;
    const options = document.getElementById(id);

    if (options.classList.contains("opacity-0")) {
      options.classList.remove("opacity-0");
      options.classList.remove("z--9999");
      options.classList.add("opacity-100");
      options.classList.add("z-10");
      return;
    }
    options.classList.add("opacity-0");
    options.classList.add("z--9999");
    options.classList.remove("opacity-100");
    options.classList.remove("z-10");
  };

  return (
    <div className="w-full flex flex-col bg-white shadow px-12 pt-12 pb-8">
      <div className="flex mb-5 w-full justify-between">
        <p>
          {`${currency}
          ${sum} ${parseExpenseString()}`}
        </p>
        <div
          onClick={() => {
            fetch(date, period, null, true);
          }}
          className="flex items-end cursor-pointer"
        >
          <img
            src="/images/auth-home/export.png"
            className="mr-1"
            alt="export"
            style={{ width: "24px", height: "20px" }}
          />{" "}
          <p style={{ position: "relative", top: "3px" }}>Export</p>
        </div>
      </div>
      <table className="w-full">
        <thead className="bg-light-grey mb-3">
          <tr>
            <td className="text-center py-5">Name</td>
            <td className="text-center py-5">Amount</td>
            <td className="text-center py-5">Time</td>
            <td className="text-center py-5">Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => {
            return (
              <tr key={index}>
                <td className="text-center pt-8">
                  {row.name.charAt(0).toUpperCase() + row.name.slice(1)}
                </td>
                <td className="text-center pt-8">
                  {`${currency}
                  ${row.amount_str}`}
                </td>
                <td className="text-center pt-8">{row.time}</td>
                <td className="text-center">
                  <div className="relative flex justify-center items-center">
                    <div
                      onClick={() => toggleExpenseOptions(index)}
                      className="flex items-center cursor-pointer"
                    >
                      <p className="mr-1 h-1 self-center text-xl">.</p>
                      <p className="mr-1 h-1 self-center text-xl">.</p>
                      <p className="mr-1 h-1 self-center text-xl">.</p>
                    </div>

                    <div
                      id={`options-${index}`}
                      className="expense__options opacity-0 z--9999 shadow p-3 z-50 bg-white text-sm flex flex-col items-center"
                    >
                      <p
                        onClick={() => {
                          setDialogs({ ...dialogs, viewExpense: true });
                          setViewedExpense(row.name);
                        }}
                        className="cursor-pointer mb-2"
                      >
                        View
                      </p>
                      <p
                        onClick={() => {
                          setDialogs({ ...dialogs, updateExpense: true });
                          setExpense({
                            id: row.id,
                            name: row.name,
                            amount: row.amount_str,
                            created_at: row.created_at,
                          });
                        }}
                        className="cursor-pointer mb-2"
                      >
                        Edit
                      </p>
                      <p className="cursor-pointer">Delete</p>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        className={`flex justify-center ${pages.length > 1 ? "mt-10" : "mb-4"}`}
      >
        {pages.length > 1 &&
          pages.map((page, index) => {
            const onClick =
              pagination.currentPage !== index + 1
                ? () => {
                    fetchExpenses(index + 1);
                  }
                : null;
            return (
              <div
                onClick={onClick}
                className={`w-12 h-12 cursor-pointer flex justify-center items-center mr-4 mb-4 ${
                  pagination.currentPage === index + 1
                    ? "bg-revolver-purple text-white"
                    : ""
                }`}
              >
                {loading && clickedPage === index ? (
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
                {page}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Table;
