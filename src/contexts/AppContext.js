import React, { createContext, useEffect, useState } from "react";
import { ApolloProvider, useLazyQuery } from "@apollo/client";
import Cookies from "universal-cookie";
import { FETCHUSER } from "../graphql/user";
import Spinner from "../components/Spinner/Spinner";
import createApolloClient from "../utilities/createApolloClient";
import { setUserContext } from "../services/cookie";

export const AppContext = createContext({});

const client = createApolloClient();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [fetchUser, { data }] = useLazyQuery(FETCHUSER, {
    fetchPolicy: "network-only",
    client,
  });
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("maui_token") && !user) {
      fetchUser();
      console.log("oollalal");
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (data) {
      setUserContext(data, setUser, "me");
    }
  }, [data]);

  if (cookies.get("maui_token") && !user) {
    return (
      <div className="w-screen h-screen">
        <Spinner display={true} />
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{
        user,
        changeUser: (user) => {
          setUser(user);
        },
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AppContext.Provider>
  );
};

export default AppContextProvider;
