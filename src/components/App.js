import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";
import React from "react";
import { Game } from "./Game";
import { LoadingBackdrop } from "./LoadingBackdrop";

const useStyles = makeStyles((theme) => ({
  appBarGutter: theme.mixins.toolbar,
}));

export const App = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      {/* <AppBar color="default">
        <Container maxWidth="md">
          <Toolbar>
            <Typography variant="h6">Simon Says</Typography>
          </Toolbar>
        </Container>
      </AppBar> */}
      <div className={classes.appBarGutter} />
      <Box paddingY={4}>
        <Container maxWidth="xs">
          <Game />
        </Container>
      </Box>
      <LoadingBackdrop />
    </React.Fragment>
  );
};
