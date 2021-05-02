import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { CURRENTMONTHINCOME } from "../../graphql/income";
import { useQuery } from "@apollo/client";
import Spinner from "../Spinner/Spinner";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CurrentMonthData = () => {
  const { user } = useContext(AppContext);
  const currency = user.currency ?? "";
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const countdown = getCountdown();
      setCountdown(countdown);
    }, 1000);
    return () => {
      clearInterval(countdownInterval);
    };
    // eslint-disable-next-line
  }, []);

  const { data, error, loading } = useQuery(CURRENTMONTHINCOME, {
    variables: { id: user.id },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (data) {
      setIncome(data.currentMonthIncome);
    }
    // console.log(error);
  }, [data, error]);

  const monthEnds = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const initDate = new Date();
  const monthEndingDate = `${monthEnds[initDate.getMonth()]} ${
    months[initDate.getMonth()]
  } ${initDate.getFullYear()}`;
  const monthEnding = new Date(monthEndingDate);

  const getCountdown = () => {
    const now = new Date().getTime();

    if (monthEnding > now) {
      const difference = monthEnding - now;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((difference % (1000 * 60)) / 1000);
      minutes = String(minutes).length === 1 ? "0" + String(minutes) : minutes;
      seconds = String(seconds).length === 1 ? "0" + String(seconds) : seconds;
      const countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      return countdown;
    }
  };
  const [countdown, setCountdown] = useState(getCountdown());
  const [income, setIncome] = useState(null);

  const getTodaysDate = () => {
    const date = new Date();
    const day = days[date.getDay()];
    const dt = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hour = date.getHours();
    let mins = date.getMinutes();
    mins = String(mins).length === 1 ? "0" + String(mins) : mins;

    return `${day} ${dt} ${month} ${year} ${hour}:${mins}`;
  };

  return (
    <div className="h-full relative p-8 shadow bg-white w-full">
      <div className="flex flex-col w-full">
        <div
          className="flex flex-col mb-6 w-full py-4 bg-revolver-purple"
          style={{ background: "#fff" }}
        >
          <div
            className="relative w-full"
            style={{ height: "4px", background: "rgba(0,0, 0, 0.06)" }}
          >
            <div
              className="absolute top-0 left-0 h-full bg-revolver-purple transition-all ease-in duration-500 mb-3"
              style={{
                width: income
                  ? String((income.remainder / income.total) * 100) + "%"
                  : "0%",
              }}
            ></div>
          </div>
        </div>
        {income && (
          <p className="mb-6">
            <i className="fa fa-money-bill-alt mr-2 text-revolver-purple"></i>{" "}
            {currency}
            {income.remainder ?? "0"} left of {currency}
            {income.total ?? "0"}
          </p>
        )}
        <p className="mb-6">
          <i className="far fa-calendar-minus mr-2 text-revolver-purple"></i>{" "}
          {getTodaysDate()}
        </p>
        <p className="mb-6">
          <i className="far fa-map mr-2 text-revolver-purple"></i>{" "}
          {user.timezone}
        </p>
        <p>
          <i className="far fa-hourglass mr-3 text-revolver-purple"></i>{" "}
          {months[new Date().getMonth()]} ending in {countdown}
        </p>
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

export default CurrentMonthData;
