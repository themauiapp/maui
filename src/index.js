import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AppContextProvider from "./contexts/AppContext";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// registering the service worker for pwas
serviceWorker.register();
