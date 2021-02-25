import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  makeStyles,
} from "@material-ui/core";
import CodeIcon from "@material-ui/icons/Code";
import React from "react";
import { Game } from "./Game";
import { LoadingBackdrop } from "./LoadingBackdrop";

const useStyles = makeStyles((theme) => ({
  appBarGutter: theme.mixins.toolbar,
}));

const PERSONAL_URL = `https://fu4303.github.io/`;

const AttributionButton = () => {
  return (
    <Button
      variant="outlined"
      href={PERSONAL_URL}
      startIcon={
        <Avatar
          style={{ width: "24px", height: "24px" }}
          src={PERSONAL_URL + "personal-logo-dark.svg"}
        />
      }
    >
      fu4303
    </Button>
  );
};

const SOURCE_CODE_URL = "https://github.com/fu4303/simon-says";

const SourceCodeButton = (props) => {
  return (
    <Button variant="outlined" href={SOURCE_CODE_URL} startIcon={<CodeIcon />}>
      Source Code
    </Button>
  );
};

export const App = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar color="transparent" elevation={0}>
        <Container maxWidth="xs">
          <Box p={2} display="flex" justifyContent="space-between">
            <AttributionButton />
            <SourceCodeButton />
          </Box>
        </Container>
      </AppBar>
      <div className={classes.appBarGutter} />
      <Box paddingY={4}>
        <Container maxWidth="xs">
          <Game />
        </Container>
      </Box>
      <LoadingBackdrop />
      <div className={classes.footer}></div>
    </React.Fragment>
  );
};
