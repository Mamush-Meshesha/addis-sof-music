import React, { useEffect, useRef, useState } from "react";
import {
  AudioPlayerContainer,
  PlayButton,
  PlayerControls,
  ProgressBar,
  ProgressHandle,
  ProgressSection,
  SecondaryButton,
  Thumbnail,
  TimeDisplay,
  TrackInfo,
  VolumeBar,
  VolumeSection,
} from "./styled/styledComponents";
import {
  FaMusic,
  FaPause,
  FaPlay,
  FaRandom,
  FaRedo,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  playSong, 
  pauseSong,
  resumeSong,
  setCurrentTime,
  setDuration,
  setVolume,
  toggleMute,
  playNext,
  playPrevious,
  setRepeat,
  toggleShuffle,
} from '../stores/slices/playerSlice';
const AudioPlayer = () => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);

  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    repeat,
    shuffle,
  } = useSelector((state) => state.audioPlayer);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    const handleTimeUpdate = () => {
      if (!isDragging) {
        dispatch(setCurrentTime(audio.currentTime));
      }
    };

    const handleDurationChange = () => {
      dispatch(setDuration(audio.duration || 0));
    };

    const handleEnded = () => {
      if (repeat === "one") {
        audio.currentTime = 0;
        audio.play();
      } else if (repeat === "all") {
        dispatch(playNext());
      } else {
        dispatch(playNext());
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleDurationChange);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleDurationChange);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, dispatch, isDragging, repeat]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error(
          "Audio Playback Error (from isPlaying useEffect):",
          error
        );
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    audio.load();

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error(
          "Audio Playback Error (from currentSong useEffect):",
          error
        );
      });
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    if (!currentSong) return;

    if (isPlaying) {
      dispatch(pauseSong());
    } else {
      dispatch(resumeSong());
    }
  };

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    const progress = progressRef.current;
    if (!audio || !progress || !duration) return;

    const rect = progress.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;

    audio.currentTime = newTime;
    dispatch(setCurrentTime(newTime));
  };

  const handleVolumeClick = (e) => {
    const volumeBar = volumeRef.current;
    if (!volumeBar) return;

    const rect = volumeBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newVolume = Math.max(0, Math.min(1, percent));

    dispatch(setVolume(newVolume));
  };

  const formatTime = (time) => {
    if (isNaN(time) || time < 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;
  const volumePercentage = (isMuted ? 0 : volume) * 100;

  if (!currentSong) return null;

  return (
    <>
      <audio ref={audioRef} src={currentSong.filePath} preload="metadata" />
      <AudioPlayerContainer
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
      >
         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
          <Thumbnail>
            {currentSong.thumbnailPath ? (
              <img src={currentSong.thumbnailPath} alt={currentSong.title} />
            ) : (
              <FaMusic size={24} />
            )}
          </Thumbnail>

          <TrackInfo>
            <h4>{currentSong.title}</h4>
            <p>{currentSong.artist}</p>
          </TrackInfo>
        </div>
       <PlayerControls>
          <SecondaryButton onClick={() => dispatch(playPrevious())}>
            <FaStepBackward size={16} />
          </SecondaryButton>

          <PlayButton onClick={handlePlayPause}>
            {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
          </PlayButton>

          <SecondaryButton onClick={() => dispatch(playNext())}>
            <FaStepForward size={16} />
          </SecondaryButton>
        </PlayerControls>

        <ProgressSection>
          <TimeDisplay>{formatTime(currentTime)}</TimeDisplay>

          <ProgressBar ref={progressRef} onClick={handleProgressClick}>
            <div
              style={{
                width: `${progressPercentage}%`,
                height: '100%',
                background: 'var(--gradient-primary)',
                borderRadius: '2px',
                position: 'relative',
              }}
            >
              <ProgressHandle
                style={{
                  right: '-6px',
                  opacity: isDragging ? 1 : 0,
                }}
              />
            </div>
          </ProgressBar>

          <TimeDisplay>{formatTime(duration)}</TimeDisplay>
        </ProgressSection>

        <VolumeSection>
          <SecondaryButton
            onClick={() => dispatch(toggleMute())}
            active={!isMuted && volume > 0}
          >
            {isMuted || volume === 0 ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
          </SecondaryButton>

          <VolumeBar ref={volumeRef} onClick={handleVolumeClick}>
            <div
              style={{
                width: `${volumePercentage}%`,
                height: '100%',
                background: 'var(--gradient-primary)',
                borderRadius: '2px',
              }}
            />
          </VolumeBar>

          <SecondaryButton
            onClick={() => {
              const nextRepeat = repeat === 'none' ? 'all' : repeat === 'all' ? 'one' : 'none';
              dispatch(setRepeat(nextRepeat));
            }}
            active={repeat !== 'none'}
          >
            <FaRedo size={16} />
            {repeat === 'one' && (
              <span style={{ position: 'absolute', fontSize: '0.6rem', top: '2px', right: '2px' }}>
                1
              </span>
            )}
          </SecondaryButton>

          <SecondaryButton
            onClick={() => dispatch(toggleShuffle())}
            active={shuffle}
          >
            <FaRandom size={16} />
          </SecondaryButton>
        </VolumeSection>
      </AudioPlayerContainer>
    </>
  );
};

export default AudioPlayer;
