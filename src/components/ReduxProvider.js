import { combineReducers, configureStore } from "@reduxjs/toolkit";
import React from "react";
import { Provider } from "react-redux";
import { middlewares, simonSays, startMiddlewares } from "../simon-says";

const rootReducer = combineReducers({
  simonSays: simonSays.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [...middlewares],
});

startMiddlewares();

export const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
