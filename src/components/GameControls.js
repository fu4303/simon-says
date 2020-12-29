import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  makeStyles,
  Paper,
  Typography,
  Zoom,
} from "@material-ui/core";
import React, { useState } from "react";
import { useSimonSays } from "../simon-says";

const useStyles = makeStyles((theme) => ({
  score: {
    fontSize: "3em",
    fontWeight: "bold",
  },

  paper: {
    backgroundColor: theme.palette.background.default,
    borderRadius: "50%",
    width: "144px",
    height: "144px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "all",
    flexDirection: "column",
  },

  container: {
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "none",
  },
}));

const TransitionComponent = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

export const GameControls = () => {
  const classes = useStyles();
  const simonSays = useSimonSays();

  const [isConfirmingReset, setIsConfirmingReset] = useState(false);

  const openConfirmReset = () => {
    setIsConfirmingReset(true);
  };

  const closeConfirmReset = () => {
    setIsConfirmingReset(false);
  };

  const reset = () => {
    closeConfirmReset();
    simonSays.reset();
  };

  return (
    <React.Fragment>
      <div className={classes.container}>
        <Paper className={classes.paper} elevation={24}>
          <Typography className={classes.score}>
            {simonSays.song.length}
          </Typography>
          <Button onClick={openConfirmReset}>Reset</Button>
        </Paper>
      </div>

      <Dialog
        TransitionComponent={TransitionComponent}
        open={isConfirmingReset}
        onClose={closeConfirmReset}
      >
        <DialogTitle>Reset?</DialogTitle>
        <DialogActions>
          <Button onClick={closeConfirmReset}>Cancel</Button>
          <Button onClick={reset}>Reset</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
