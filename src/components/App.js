import { makeStyles } from "@material-ui/core";
import React from "react";
import { Game } from "./Game";
import { LoadingBackdrop } from "./LoadingBackdrop";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "100vw",
    height: "80vh",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
  },
}));

export const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Game />
      <LoadingBackdrop />
    </div>
  );
};
