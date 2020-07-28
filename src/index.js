import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import configureStore from "./configureStore";
import * as serviceWorker from "./serviceWorker";

import FastClick from "fastclick";

if ("addEventListener" in document) {
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      console.log("attached fast click!");
      FastClick.attach(document.body);
    },
    false
  );
}

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
