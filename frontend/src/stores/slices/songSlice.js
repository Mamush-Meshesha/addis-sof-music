import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  songs: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  searchTerm: "",
  selectedGenre: "",
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action) => {
      state.loading = false;
      state.songs = action.payload.songs;
      state.totalPages = Math.ceil(action.payload.total / action.payload.limit);
      state.currentPage = action.payload.page;
    },

    fetchSongsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.songs = [];
    },

    createSongRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    createSongSuccess: (state, action) => {
      state.loading = false;
      state.songs.unshift(action.payload);
    },
    createSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateSongRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess: (state, action) => {
      state.loading = false;
      const index = state.songs.findIndex(
        (song) => song.id === action.payload.id
      );
      if (index !== -1) {
        state.songs[index] = action.payload;
      }
    },
    updateSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteSongRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess: (state, action) => {
      state.loading = false;
      state.songs = state.songs.filter((song) => song.id !== action.payload);
    },
    deleteSongFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
      state.currentPage = 1;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
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
  setCurrentPage,
  setSearchTerm,
  setSelectedGenre,
  clearError,
} = songsSlice.actions;

export const songsReducer = songsSlice.reducer;
