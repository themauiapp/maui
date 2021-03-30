import React, { createContext } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

export const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const httpLink = createUploadLink({
    uri: process.env.REACT_APP_API_URL,
  });
  const cache = new InMemoryCache({});
  const client = new ApolloClient({
    link: httpLink,
    cache,
  });

  return (
    <AppContext.Provider value={{}}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </AppContext.Provider>
  );
};

export default AppContextProvider;
