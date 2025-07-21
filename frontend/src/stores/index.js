import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { songsReducer } from "./slices/songsSlice";
import { audioPlayerReducer } from "./slices/audioPlayerSlices";
import { rootSaga } from "./sagas/rootSaga";

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
