import * as R from "ramda";
import createSagaMiddleware from "redux-saga";
import { call, delay, put, race, select, take } from "redux-saga/effects";
import { soundActions } from "./middleware-sound";
import { constants, simonSays } from "./simon-says";

const { actions, selectors } = simonSays;
const { NOTES, NOTE_TO_MUSICAL_NOTE, STATUS } = constants;

const randomNth = (xs) => xs[Math.floor(Math.random() * xs.length)];
const randomNote = () => randomNth(NOTES);

function* playNotes(duration, notes) {
  const lightsOn = R.zipObj(notes, R.map(R.T, NOTES));
  const lightsOff = R.zipObj(notes, R.map(R.F, NOTES));
  const musicalNotes = notes.map((note) => NOTE_TO_MUSICAL_NOTE[note]);

  yield put(actions.setLights(lightsOn));

  yield put(soundActions.trigger(musicalNotes));

  yield delay(duration);

  yield put(actions.setLights(lightsOff));
}

function* gameLoop() {
  yield put(actions.setSong([randomNote()]));

  while (true) {
    yield delay(1000);

    const song = yield select(selectors.song);

    yield put(actions.setStatus(STATUS.singing));

    for (const note of song) {
      yield* playNotes(333, [note]);

      yield delay(100);
    }

    yield put(actions.setStatus(STATUS.listening));

    for (const note of song) {
      const { payload: playedNote } = yield take(actions.pressedButton);

      if (note !== playedNote) {
        return;
      }

      yield put(soundActions.trigger(NOTE_TO_MUSICAL_NOTE[note]));
    }

    const nextSong = R.append(randomNote(), song);

    yield put(actions.setSong(nextSong));
  }
}

function* gameoverJiggle() {
  yield put(actions.setStatus(STATUS.singing));

  for (let i = 0; i < 3; i++) {
    yield* playNotes(60, NOTES);
    yield delay(60);
  }
}

function* ganeSaga() {
  yield take(soundActions.loaded);

  while (true) {
    yield race([call(gameLoop), take(actions.reset)]);
    yield* gameoverJiggle();
  }
}

export const gameMiddleware = createSagaMiddleware();

export const startGameMiddleware = () => {
  gameMiddleware.run(ganeSaga);
};
