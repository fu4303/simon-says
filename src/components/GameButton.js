import { ButtonBase, makeStyles } from "@material-ui/core";
import { blue, green, red, yellow } from "@material-ui/core/colors";
import clsx from "clsx";
import React from "react";
import { constants, useSimonSays } from "../simon-says";

const { STATUS, NOTE_TO_COLOR, NOTE_TO_POSITION } = constants;

const makeGradient = (muiColor) =>
  `linear-gradient(${muiColor[400]}, ${muiColor[900]})`;

const useStyles = makeStyles((theme) => ({
  button: {
    width: "100%",
    paddingTop: "100%",
    borderRadius: theme.spacing(2),

    "&:hover:enabled, &:active:enabled": {
      transform: "scale(1.025)",
      filter: "brightness(50%)",
    },

    "&:active:enabled": {
      transform: "scale(1.05)",
      filter: "brightness(125%)",
    },
    transform: ({ isOn }) => (isOn ? "scale(1.05)" : "scale(1)"),
    filter: ({ isOn }) => (isOn ? "brightness(125%)" : "brightness(75%)"),
  },
  red: {
    background: makeGradient(red),
  },

  blue: {
    background: makeGradient(blue),
  },

  yellow: {
    background: makeGradient(yellow),
  },

  green: {
    background: makeGradient(green),
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
}));

export const GameButton = ({ note }) => {
  const simonSays = useSimonSays();

  const isDisabled = simonSays.status !== STATUS.listening;

  const classes = useStyles({
    isDisabled,
    isOn: simonSays.lights?.[note] || false,
  });

  const handleClick = () => {
    simonSays.pressedButton(note);
  };

  return (
    <ButtonBase
      disableRipple
      onClick={handleClick}
      disabled={isDisabled}
      className={clsx(
        classes.button,
        classes[NOTE_TO_POSITION[note]],
        classes[NOTE_TO_COLOR[note]]
      )}
    />
  );
};
