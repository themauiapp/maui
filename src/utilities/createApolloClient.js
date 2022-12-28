import { ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import Cookies from "universal-cookie";

const createApolloClient = (includeCode = false) => {
  let uri = `${
    process.env.REACT_APP_API_URL ?? window.__env__.REACT_APP_API_URL
  }graphql`;

  if (includeCode) {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    uri = `${uri}?code=${code}`;
  }

  const httpLink = createUploadLink({
    uri,
    credentials: "include",
    fetchOptions: {
      credentials: "include",
    },
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

  return client;
};

export default createApolloClient;
