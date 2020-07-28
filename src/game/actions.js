import { createAction } from "@reduxjs/toolkit";

export default {
  setSong: createAction("SET_SONG"),
  setLights: createAction("SET_LIGHTS"),
  setStatus: createAction("SET_STATUS"),
  playedNote: createAction("PLAYED_NOTE"),
  reset: createAction("RESET"),
};
