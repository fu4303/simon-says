import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";

export default createReducer(
  {
    lights: {},
    song: [],
    status: "singing",
  },
  {
    [actions.setLights]: (state, action) => {
      state.lights = action.payload;
    },
    [actions.setSong]: (state, action) => {
      state.song = action.payload;
    },
    [actions.setStatus]: (state, action) => {
      state.status = action.payload;
    },
  }
);
