import React, { createContext } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import Cookies from "universal-cookie";

export const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const httpLink = createUploadLink({
    uri: `${process.env.REACT_APP_API_URL}graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    const cookies = new Cookies();
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
    <AppContext.Provider value={{}}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AppContext.Provider>
  );
};

export default AppContextProvider;
