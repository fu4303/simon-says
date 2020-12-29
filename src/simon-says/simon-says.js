import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";

/* 


*/

export const constants = {
  NOTES: [0, 1, 2, 3],
  NOTE_TO_MUSICAL_NOTE: {
    0: "G4",
    1: "C4",
    2: "E4",
    3: "G5",
  },
  NOTE_TO_COLOR: {
    0: "green",
    1: "red",
    2: "yellow",
    3: "blue",
  },
  NOTE_TO_POSITION: {
    0: "topLeft",
    1: "topRight",
    2: "bottomLeft",
    3: "bottomRight",
  },
  STATUS: {
    loading: "loading",
    singing: "singing",
    listening: "listening",
  },
};

/*


*/

const actions = {
  setSong: createAction("[simon-says] SET_SONG"),
  setLights: createAction("[simon-says] SET_LIGHTS"),
  setStatus: createAction("[simon-says] SET_STATUS"),
  //
  pressedButton: createAction("[simon-says] PRESSED_BUTTON"),
  reset: createAction("[simon-says] RESET"),
};

/*


*/

const slice = (state) => state.simonSays;

const selectors = {
  slice,
  song: createSelector([slice], (slice) => slice.song),
  lights: createSelector([slice], (slice) => slice.ligths),
  status: createSelector([slice], (slice) => slice.status),
};

/*


*/

const { STATUS } = constants;

const reducer = createReducer(
  {
    lights: {},
    song: [],
    status: STATUS.loading,
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

/* 


*/

export const simonSays = {
  reducer,
  actions,
  selectors,
  constants,
};
