import React from "react";
import { DAILYEXPENSES } from "../../graphql/expense";
import { useQuery } from "@apollo/client";
import Table from "../Common/Table/Table";

const TodaysExpenses = () => {
  const { data, error, loading } = useQuery(DAILYEXPENSES);
  return <div>leke</div>;
};

export default TodaysExpenses;
