import { createAction } from "@reduxjs/toolkit";
import * as Tone from "tone";

export const soundActions = {
  loaded: createAction("[sound] LOADED"),
  trigger: createAction("[sound] TRIGGER"),
};

export const soundMiddleware = ({ dispatch }) => {
  const sampler = new Tone.Sampler({
    urls: {
      C4: "C4.mp3",
      "D#4": "Ds4.mp3",
      "F#4": "Fs4.mp3",
      A4: "A4.mp3",
    },
    baseUrl: "https://tonejs.github.io/audio/salamander/",
    onload: () => {
      dispatch(soundActions.loaded());
    },
  }).toDestination();

  return (next) => (action) => {
    next(action);

    if (action.type === soundActions.trigger().type) {
      sampler.triggerAttackRelease(action.payload);
    }
  };
};
