import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentSong: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  isMuted: false,
  isLoading: false,
  playlist: [],
  currentIndex: -1,
  repeat: "none",
  shuffle: false,
};

const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    playSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
      state.isLoading = true;
    },
    pauseSong: (state) => {
      state.isPlaying = false;
    },
    resumeSong: (state) => {
      state.isPlaying = true;
    },
    stopSong: (state) => {
      state.isPlaying = false;
      state.currentTime = 0;
    },
    setCurrentTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
      state.isLoading = false;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
      state.isMuted = false;
    },
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
    },
    playNext: (state) => {
      if (state.currentIndex < state.playlist.length - 1) {
        state.currentIndex += 1;
        state.currentSong = state.playlist[state.currentIndex];
        state.isPlaying = true;
        state.isLoading = true;
      }
    },
    playPrevious: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex -= 1;
        state.currentSong = state.playlist[state.currentIndex];
        state.isPlaying = true;
        state.isLoading = true;
      }
    },
    setRepeat: (state, action) => {
      state.repeat = action.payload;
    },
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
  },
});

export const {
  playSong,
  pauseSong,
  resumeSong,
  stopSong,
  setCurrentTime,
  setDuration,
  setVolume,
  toggleMute,
  setLoading,
  setPlaylist,
  playNext,
  playPrevious,
  setRepeat,
  toggleShuffle,
} = audioPlayerSlice.actions;

export const audioPlayerReducer = audioPlayerSlice.reducer;
