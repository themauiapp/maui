import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { AuthHomeContext } from "../../contexts/AuthHomeContext";
import { useRouteMatch, useHistory } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/client";
import { SEARCHEXPENSES, DELETEEXPENSE } from "../../graphql/expense";
import Table from "../Common/Table/Table";
import { notifySuccess } from "../../services/notify";
import exportToXlsx from "../../utilities/file";
import errorHandler from "../../utilities/errorHandler";

const Search = () => {
  const {
    user: { currency },
  } = useContext(AppContext);
  const { toggleSpinner, setShowReloadPage, reloadPage, lastUpdatedExpense } =
    useContext(AuthHomeContext);
  const [expenses, setExpenses] = useState(null);
  const [sum, setSum] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [download, setDownload] = useState(false);
  const [fetchExpensesQuery, { data, error, loading }] = useLazyQuery(
    SEARCHEXPENSES,
    { fetchPolicy: "network-only" }
  );
  const [deleteExpenseMutation] = useMutation(DELETEEXPENSE);
  const history = useHistory();
  const { searchTerm: searchText } = useRouteMatch().params;
  const [terms, setTerms] = useState({ search: searchText, table: searchText });

  useEffect(() => {
    if (
      lastUpdatedExpense &&
      lastUpdatedExpense.name.toLowerCase() === terms.search.toLowerCase()
    ) {
      setShowReloadPage(true);
    }
    // eslint-disable-next-line
  }, [lastUpdatedExpense]);

  useEffect(() => {
    if (reloadPage) {
      fetchExpenses(pagination ? pagination.currentPage : 1, false, true);
    }
    // eslint-disable-next-line
  }, [reloadPage]);

  useEffect(() => {
    fetchExpenses(1);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setTerms({ ...terms, search: searchText });
    // eslint-disable-next-line
  }, [searchText]);

  useEffect(() => {
    fetchExpenses(1, false, true);
    // eslint-disable-next-line
  }, [terms.search]);

  useEffect(() => {
    if (data) {
      const { expenses, sum, pagination } = data.searchExpenses;
      toggleSpinner(false);

      if (!download) {
        setExpenses(expenses);
        setSum(sum);
        setPagination(pagination);
        setExpenses(expenses);
        setTerms({ ...terms, table: terms.search });
        return;
      }

      exportToXlsx(terms.search, currency, "", "", expenses);
      setDownload(false);
    }

    if (error) {
      errorHandler(error, history);
      toggleSpinner(false);
    }
    // eslint-disable-next-line
  }, [data, error]);

  const fetchExpenses = (page, all = false, indicate = false) => {
    if (!expenses || all || indicate) {
      toggleSpinner(true);
    }
    setDownload(all);
    const variables = { searchTerm: terms.search, number: 10, page, all };
    fetchExpensesQuery({ variables });
  };

  const deleteExpense = async (id, date, period, page) => {
    const proceed = window.confirm("are you sure you want to delete ?");
    if (!proceed) {
      return;
    }
    toggleSpinner(true);
    try {
      const variables = { id };
      const response = await deleteExpenseMutation({ variables });
      const data = response.data.deleteExpense;
      if (data.errorId) {
        const error = new Error(data.errorId);
        throw error;
      }
      await fetchExpenses(page, false, true);
      notifySuccess("Expense Deleted Successfully");
    } catch (error) {
      errorHandler(error, history);
    } finally {
      toggleSpinner(false);
    }
  };

  return (
    <div className="pb-10">
      {expenses && (
        <Table
          data={expenses}
          sum={sum}
          fetch={fetchExpenses}
          searchTerm={terms.table}
          pagination={pagination}
          deleteExpense={deleteExpense}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Search;
