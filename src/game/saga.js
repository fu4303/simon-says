import * as R from "ramda";
import { call, delay, put, race, select, take } from "redux-saga/effects";
import * as Tone from "tone";
import actions from "./actions";
import constants from "./constants";
import selectors from "./selectors";
const { notes, noteToMusicalNote } = constants;

const randomNth = (xs) => xs[Math.floor(Math.random() * xs.length)];
const randomNote = () => randomNth(constants.notes);

const sampler = new Tone.Sampler({
  urls: {
    C4: "C4.mp3",
    "D#4": "Ds4.mp3",
    "F#4": "Fs4.mp3",
    A4: "A4.mp3",
  },
  baseUrl: "https://tonejs.github.io/audio/salamander/",
}).toDestination();

function* playNote(...args) {
  sampler.triggerAttackRelease(...args);
}

function* gameLoop() {
  yield put(actions.setSong([randomNote()]));

  while (true) {
    yield delay(1000);
    const song = yield select(selectors.song);

    yield put(actions.setStatus("singing"));
    for (const note of song) {
      yield put(actions.setLights({ [note]: true }));
      yield* playNote(noteToMusicalNote[note]);
      yield delay(500);
      yield put(actions.setLights({ [note]: false }));
      yield delay(100);
    }

    yield put(actions.setStatus("listening"));
    for (const note of song) {
      const { payload: playedNote } = yield take(actions.playedNote);
      if (note !== playedNote) {
        return;
      }
      yield* playNote(noteToMusicalNote[note]);
    }

    const nextSong = R.append(randomNote(), song);
    yield put(actions.setSong(nextSong));
  }
}

function* gameover() {
  const allLightsOn = R.zipObj(notes, R.map(R.T, notes));
  const allLightsOff = R.zipObj(notes, R.map(R.F, notes));

  for (let i = 0; i < 3; i++) {
    yield* playNote(R.values(noteToMusicalNote));
    yield put(actions.setLights(allLightsOn));
    yield delay(60);
    yield put(actions.setLights(allLightsOff));
    yield delay(60);
  }
}

export default function* () {
  while (true) {
    yield race([call(gameLoop), take(actions.reset)]);
    yield* gameover();
  }
}
