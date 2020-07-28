import {
  Button,
  ButtonBase,
  Container,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { blue, green, red, yellow } from "@material-ui/core/colors";
import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import game from "./game";
const { noteToColor, noteToPosition } = game.constants;

const on = 300;
const off = 900;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
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
    "&:active": {
      transform: "scale(1.05)",
    },
  },
  red: {
    backgroundColor: ({ number = off }) => red[number],
    "&:active": {
      backgroundColor: red[on],
    },
  },
  blue: {
    backgroundColor: ({ number = off }) => blue[number],
    "&:active": {
      backgroundColor: blue[on],
    },
  },
  yellow: {
    backgroundColor: ({ number = off }) => yellow[number],
    "&:active": {
      backgroundColor: yellow[on],
    },
  },

  green: {
    backgroundColor: ({ number = off }) => green[number],
    "&:active": {
      backgroundColor: green[on],
    },
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
  paper: {
    borderRadius: "50%",
    width: "144px",
    height: "144px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "all",
    flexDirection: "column",
  },
  paperContainer: {
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
      disableRipple
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

  return (
    <Container className={classes.root} maxWidth="xs">
      <Grid
        container
        style={{ position: "relative", maxWidth: "100%" }}
        spacing={2}
      >
        {game.constants.notes.map((note) => (
          <Grid key={note} xs={6} item>
            <GameButton note={note} />
          </Grid>
        ))}

        <div className={classes.paperContainer}>
          <Paper className={classes.paper} elevation={24}>
            <Typography className={classes.score}>{song.length}</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </Paper>
        </div>
      </Grid>
    </Container>
  );
};
