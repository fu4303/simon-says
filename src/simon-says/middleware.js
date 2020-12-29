import { gameMiddleware, startGameMiddleware } from "./middleware-game";
import { soundMiddleware } from "./middleware-sound";

export const middlewares = [soundMiddleware, gameMiddleware];

export const startMiddlewares = () => {
  startGameMiddleware();
};
