import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../contexts/AppContext";
import DataFetching from "../DataFetching/DataFetching";
import {
  GETTELEGRAMSETTINGS,
  UPDATETELEGRAMSETTINGS,
} from "../../graphql/user";
import { useQuery, useMutation } from "@apollo/client";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";
import { notifySuccess } from "../../services/notify";
import errorHandler from "../../utilities/errorHandler";
import "./TelegramSettings.css";

const TelegramSettings = () => {
  const {
    user: { id },
  } = useContext(AppContext);
  const { data, loading } = useQuery(GETTELEGRAMSETTINGS, {
    variables: { id },
    fetchPolicy: "network-only",
  });
  const [updateTelegramSettingsMutation, { loading: updateLoading }] =
    useMutation(UPDATETELEGRAMSETTINGS);
  const [telegram, setTelegram] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (data) {
      const {
        user: { telegram },
      } = data;
      setTelegram(telegram);
    }
  }, [data]);

  const updateTelegramSettings = useCallback(async () => {
    const { notify_12pm, notify_6pm, notify_10pm } = telegram;
    const variables = { notify_12pm, notify_6pm, notify_10pm };
    try {
      await updateTelegramSettingsMutation({ variables });
      notifySuccess("Telegram Settings Updated Successfully");
    } catch (error) {
      errorHandler(error, history);
    }
  }, [telegram]);

  const displayTelegramOptions = useCallback(() => {
    const { notify_12pm, notify_6pm, notify_10pm } = telegram;
    const options = {
      "12pm": notify_12pm,
      "6pm": notify_6pm,
      "10pm": notify_10pm,
    };
    const optionKeys = ["notify_12pm", "notify_6pm", "notify_10pm"];
    return Object.keys(options).map((key, index) => {
      return (
        <div
          key={index}
          onClick={() => {
            setTelegram({
              ...telegram,
              [optionKeys[index]]: !options[key],
            });
          }}
          className="flex"
        >
          <div
            className={`profile__check_container w-fc ${index !== 2 && "mb-6"}`}
          >
            <input type="checkbox" checked={options[key]} />
            <span className="profile__checkmark"></span>
          </div>
          <p className="">get mauibot prompts daily at {key}</p>
        </div>
      );
    });
  }, [telegram]);

  return (
    <div
      className="relative bg-white p-8 bsm:p-12 shadow"
      style={{ minHeight: "233px" }}
    >
      {!loading && telegram && (
        <div>
          <div className="flex items-end mb-6">
            <p className="text-2xl mr-3 font-semibold tracking-widest">
              {telegram.telegram_id}
            </p>
            <small className="mb-1">(Telegram ID)</small>
          </div>
          <div className="flex justify-between mb-6">
            {displayTelegramOptions()}
          </div>
          <div className="flex justify-end">
            <div className="pl-2 w-1/2">
              <div className="relative">
                <Button
                  type="outlined"
                  onClick={() => {
                    updateTelegramSettings();
                  }}
                >
                  Update
                </Button>
                <Loader display={updateLoading} />
              </div>
            </div>
          </div>
        </div>
      )}
      {!loading && !telegram && (
        <div className="w-full flex flex-col justify-center items-center">
          <img
            src="/images/auth-home/empty.svg"
            className="w-24 mb-5"
            alt="No Telegram Settings"
          />
          <p>
            Visit{" "}
            <a
              href="https://t.me/themauibot"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <i className="underline">MauiBot</i>
            </a>{" "}
            to integrate your Telegram account with Maui.
          </p>
        </div>
      )}
      <DataFetching display={loading} />
    </div>
  );
};

export default TelegramSettings;
