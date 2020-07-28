import React from "react";
import {
  Container,
  ButtonBase,
  Grid,
  makeStyles,
  Paper,
  Button,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { red, blue, yellow, green } from "@material-ui/core/colors";
import { useSelector, useDispatch } from "react-redux";
import game from "./game";

const on = 400;
const off = 900;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vh",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingTop: "100%",
    borderRadius: theme.spacing(2),
  },
  red: {
    backgroundColor: ({ number = off }) => red[number],
  },
  blue: {
    backgroundColor: ({ number = off }) => blue[number],
  },
  yellow: {
    backgroundColor: ({ number = off }) => yellow[number],
  },
  green: {
    backgroundColor: ({ number = off }) => green[number],
  },
  topLeft: {
    borderTopLeftRadius: "100%",
  },
  topRight: {
    borderTopRightRadius: "100%",
  },
  bottomLeft: {
    borderBottomLeftRadius: "100%",
  },
  bottomRight: {
    borderBottomRightRadius: "100%",
  },
  scorePaper: {},
  score: {
    fontSize: "3em",
    fontWeight: "bold",
  },
}));

const noteToColor = {
  0: "green",
  1: "red",
  2: "yellow",
  3: "blue",
};

const noteToPosition = {
  0: "topLeft",
  1: "topRight",
  2: "bottomLeft",
  3: "bottomRight",
};

const GameButton = ({ note }) => {
  const status = useSelector(game.selectors.status);
  const lights = useSelector(game.selectors.lights);
  const classes = useStyles({ number: lights[note] ? on : off });
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(game.actions.playedNote(note));
  };
  return (
    <ButtonBase
      onClick={handleClick}
      disabled={status !== "listening"}
      className={clsx(
        classes.button,
        classes[noteToPosition[note]],
        classes[noteToColor[note]]
      )}
    />
  );
};

export default () => {
  const song = useSelector(game.selectors.song);

  const classes = useStyles();
  const dispatch = useDispatch();
  const handleReset = () => {
    dispatch(game.actions.reset());
  };
  const status = useSelector(game.selectors.status);

  return (
    <Container className={classes.root} maxWidth="xs">
      <Grid container style={{ position: "relative" }} spacing={2}>
        {game.notes.map((note) => (
          <Grid key={note} xs={6} item>
            <GameButton note={note} />
          </Grid>
        ))}

        <div
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "none",
          }}
        >
          <Paper
            elevation={24}
            style={{
              borderRadius: "50%",
              width: "144px",
              height: "144px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pointerEvents: "all",
              flexDirection: "column",
            }}
          >
            <Typography className={classes.score}>{song.length}</Typography>

            <Button onClick={handleReset}>Reset</Button>
          </Paper>
        </div>
      </Grid>
    </Container>
  );
};
