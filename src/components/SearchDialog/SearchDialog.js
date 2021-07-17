import React, { useState, useContext } from "react";
import { AuthHomeContext } from "../../contexts/AuthHomeContext";
import { useHistory } from "react-router-dom";
import Button from "../Button/Button";

const SearchDialog = () => {
  const { setDialogs, dialogs } = useContext(AuthHomeContext);
  const [expense, setExpense] = useState("");
  const [error, setError] = useState(false);
  const history = useHistory();

  const search = () => {
    if (expense.length === 0) {
      return setError(true);
    }
    setDialogs({ ...dialogs, search: false });
    history.push(`/my/search/${expense.toLowerCase()}`);
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="dialog bg-white rounded p-10 flex flex-col"
    >
      <p className="text-lg text-center font-semibold mb-3">Find Expenses</p>
      <form noValidate onSubmit={search}>
        <div className="flex flex-col mb-5">
          <label htmlFor="income" className="text-sm mb-3">
            Expense
          </label>
          <input
            autoFocus
            onChange={(e) => {
              setExpense(e.target.value);
              setError(e.target.value.length === 0);
            }}
            value={expense}
            className="focus:outline-none border border-faint-rgba-black w-full p-4 text-gray-700"
          />
          {error && (
            <p className="mt-2 text-sm text-red">expense is required</p>
          )}
        </div>
        <div className="relative">
          <Button submit={true}>Find</Button>
        </div>
      </form>
    </div>
  );
};

export default SearchDialog;
