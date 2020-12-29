import {
  Backdrop,
  Box,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { constants, useSimonSays } from "../simon-says";

const { STATUS } = constants;

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export const LoadingBackdrop = () => {
  const classes = useStyles();
  const simonSays = useSimonSays();

  return (
    <Backdrop
      className={classes.backdrop}
      open={simonSays.status === STATUS.loading}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box paddingBottom={1}>
          <CircularProgress color="inherit" />
        </Box>
        <Typography variant="subtitle1" align="center">
          Loading Sounds
        </Typography>
      </Box>
    </Backdrop>
  );
};
