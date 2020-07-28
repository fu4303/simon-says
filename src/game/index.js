import { createAction, createReducer } from "@reduxjs/toolkit";
import { put, delay, call, select, take, race } from "redux-saga/effects";
import * as R from "ramda";

import * as Tone from "tone";
const sampler = new Tone.Sampler({
  urls: {
    C4: "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    A4: "A4.mp3",
  },
  baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

const actions = {
  setSong: createAction("SET_SONG"),
  setLights: createAction("SET_LIGHTS"),
  setStatus: createAction("SET_STATUS"),
  playedNote: createAction("PLAYED_NOTE"),
  reset: createAction("RESET"),
};

const selectors = {
  song: (state) => state.song,
  lights: (state) => state.lights,
  status: (state) => state.status,
};

const noteToNote = {
  0: "G4",
  1: "C4",
  2: "E4",
  3: "G5",
};

const notes = [0, 1, 2, 3];

const randomNote = () => Math.floor(Math.random() * 4);

function* gameoverFlash() {
  for (let i = 0; i < 2; i++) {
    sampler.triggerAttackRelease(R.values(noteToNote));
    yield put(actions.setLights(R.zipObj(notes, notes.map(R.T))));
    yield delay(40);
    yield put(actions.setLights(R.zipObj(notes, notes.map(R.F))));
    yield delay(40);
  }
}

function* game() {
  yield put(actions.setSong([randomNote()]));

  while (true) {
    yield delay(1000);
    const song = yield select(selectors.song);

    yield put(actions.setStatus("singing"));
    for (const note of song) {
      yield put(actions.setLights({ [note]: true }));
      sampler.triggerAttackRelease(noteToNote[note]);
      yield delay(500);
      yield put(actions.setLights({ [note]: false }));
      yield delay(100);
    }

    yield put(actions.setStatus("listening"));
    for (const note of song) {
      const { payload: playedNote } = yield take(actions.playedNote);
      if (note !== playedNote) {
        yield* gameoverFlash();
        return;
      }
      sampler.triggerAttackRelease(noteToNote[note]);
    }

    const nextSong = R.append(randomNote(), song);
    yield put(actions.setSong(nextSong));
  }
}

function* saga() {
  while (true) {
    yield race([
      call(game),
      call(function* () {
        yield take(actions.reset);
        yield* gameoverFlash();
      }),
    ]);

    const song = yield select(selectors.song);
    localStorage.setItem(
      "highscore",
      Math.max(song.length, localStorage.getItem("highscore") || 0)
    );
  }
}

const reducer = createReducer(
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

export default {
  reducer,
  saga,
  actions,
  selectors,
  notes,
};
