import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { songsReducer } from "./slices/songSlice";
import { audioPlayerReducer } from "./slices/playerSlice";
import { rootSaga } from "./saga/rootSage";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    songs: songsReducer,
    audioPlayer: audioPlayerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
