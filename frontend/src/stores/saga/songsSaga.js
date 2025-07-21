import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
} from "../slices/songSlice";
import axios from "axios";

const API_BASE_URL =
  process.env.API_BASE_URL || "http://localhost:3000/api/songs";

function* fetchSongs(action) {
  try {
        const { page = 1, searchTerm = "", selectedGenre = "" } = action.payload || {};

    const response = yield call(axios.get, `${API_BASE_URL}/songs`, {
      params: { page, search: searchTerm, genre: selectedGenre },
    });

    yield put(fetchSongsSuccess(response.data));
    console.log("Saga: Dispatched fetchSongsSuccess with data:", response);
  } catch (error) {
    console.error("Saga: Error in fetchSongs:", error);
    if (axios.isAxiosError(error) && error.response) {
      yield put(fetchSongsFailure(error.response.data.message));
    } else {
      yield put(fetchSongsFailure(error.message));
    }
  }
}

function* createSong(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_BASE_URL}/songs/create`,
      action.payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const song = response.data;
    yield put(createSongSuccess(song));
  } catch (error) {
    yield put(createSongFailure(error.response.data.message));
  }
}

function* updateSong(action) {
  try {
    const response = yield call(
      axios.put,
      `${API_BASE_URL}/songs/${action.payload.id}`,
      action.payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const song = response.data;
    yield put(updateSongSuccess(song));
  } catch (error) {
    yield put(updateSongFailure(error.message));
  }
}

function* deleteSong(action) {
  try {
    yield call(axios.delete, `${API_BASE_URL}/songs/${action.payload}`);
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    yield put(deleteSongFailure(error.message));
  }
}

export function* songsSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongs);
  yield takeLatest(createSongRequest.type, createSong);
  yield takeLatest(updateSongRequest.type, updateSong);
  yield takeLatest(deleteSongRequest.type, deleteSong);
}
