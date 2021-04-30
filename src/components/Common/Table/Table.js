import React from "react";

const Table = ({ data, pagination, date, period, fetch }) => {
  const pages = new Array(pagination.maxPages).fill("");
  return (
    <div className="w-full flex flex-col bg-white shadow px-12 pt-12 pb-8">
      <div className="flex mb-5 w-full justify-between items-center">
        <p>Total - 30000</p>
        <div className="flex items-end">
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
            <td className="text-center py-5"></td>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr>
                <td className="text-center pt-8">
                  {row.name.charAt(0).toUpperCase() + row.name.slice(1)}
                </td>
                <td className="text-center pt-8">{row.amount}</td>
                <td className="text-center pt-8">{row.time}</td>
                <td className="text-center pt-8">
                  <img
                    src="/images/auth-home/information.png"
                    alt="information"
                    style={{ width: "24px", height: "24px" }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={`flex ${pages.length > 1 ? "mt-10" : "mb-4"}`}>
        {pages.length > 1 &&
          pages.map((page, index) => {
            const onClick =
              pagination.currentPage !== index + 1
                ? () => {
                    fetch(date, period, index + 1);
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
                {index + 1}
                {page}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Table;
