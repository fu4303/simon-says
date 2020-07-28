import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import game from "./game";

const rootReducer = game.reducer;
const rootSaga = game.saga;

export default () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(rootSaga);
  return store;
};
