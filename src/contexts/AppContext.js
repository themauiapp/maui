import React, { createContext, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import Cookies from "universal-cookie";
import createApolloClient from "../utilities/createApolloClient";

export const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const cookies = new Cookies();
  const [user, setUser] = useState(cookies.get("user") ?? null);
  const client = createApolloClient();

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
