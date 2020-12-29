import FastClick from "fastclick";
import React, { useEffect } from "react";
import { App } from "./App";
import { ReduxProvider } from "./ReduxProvider";
import { ThemeProvider } from "./ThemeProvider";

export const Root = () => {
  useEffect(() => {
    document.addEventListener(
      "DOMContentLoaded",
      () => {
        console.log("attached fast click!");
        FastClick.attach(document.body);
      },
      false
    );
  }, []);

  return (
    <React.StrictMode>
      <ReduxProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ReduxProvider>
    </React.StrictMode>
  );
};
