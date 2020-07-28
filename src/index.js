import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { configureStore } from "@reduxjs/toolkit";

import { ThemeProvider, createMuiTheme, CssBaseline } from "@material-ui/core";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import game from "./game";
const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: game.reducer,

  middleware: [sagaMiddleware],
});

sagaMiddleware.run(game.saga);

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
