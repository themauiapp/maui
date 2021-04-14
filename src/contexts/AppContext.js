import React, { createContext, useState } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createHttpLink } from "apollo-link-http";
import Cookies from "universal-cookie";

export const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const cookies = new Cookies();
  const [user, setUser] = useState(cookies.get("user") ?? null);
  const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_API_URL}graphql`,
    credentials: "include",
    fetchOptions: {
      credentials: "include",
    },
  });

  const authLink = setContext((_, { headers }) => {
    const XSRF_TOKEN = cookies.get("XSRF-TOKEN");
    return {
      headers: {
        ...headers,
        "X-XSRF-TOKEN": XSRF_TOKEN,
      },
    };
  });

  const cache = new InMemoryCache({});
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
  });

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
