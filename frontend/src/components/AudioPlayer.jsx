import React from "react";
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
import { FaMusic, FaPlay, FaRandom, FaRedo, FaStepBackward, FaStepForward, FaVolumeUp } from "react-icons/fa";

const AudioPlayer = () => {
  return (
    <>
      <audio />
      <AudioPlayerContainer
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flex: 1,
          }}
        >
          <Thumbnail>
            <FaMusic size={24} />
          </Thumbnail>

          <TrackInfo>
            <h4>title</h4>
            <p>mamush</p>
          </TrackInfo>
        </div>
      <PlayerControls>
        <SecondaryButton onClick={() => alert("playing")}>
          <FaStepBackward size={16} />
        </SecondaryButton>

        <PlayButton onClick={() => alert("play")}>
          <FaPlay size={20} />
        </PlayButton>

        <SecondaryButton onClick={() => alert("next")}>
          <FaStepForward size={16} />
        </SecondaryButton>
      </PlayerControls>
      <ProgressSection>
        <TimeDisplay>4:55</TimeDisplay>

        <ProgressBar onClick={() => alert("bar")}>
          <div
            style={{
              width: 70,
              height: "100%",
              background: "var(--gradient-primary)",
              borderRadius: "2px",
              position: "relative",
            }}
          >
            <ProgressHandle
              style={{
                right: "-6px",
              }}
            />
          </div>
        </ProgressBar>

        <TimeDisplay>5:22</TimeDisplay>
      </ProgressSection>

      <VolumeSection>
        <SecondaryButton onClick={() => alert("vomule cliscked")}>
          <FaVolumeUp size={16} />
        </SecondaryButton>

        <VolumeBar  onClick={()=> alert('clicked bar')}>
          <div
            style={{
              width: 70,
              height: "100%",
              background: "var(--gradient-primary)",
              borderRadius: "2px",
            }}
          />
        </VolumeBar>

        <SecondaryButton
          onClick={() =>alert('repeat')}
        >
          <FaRedo size={16} />
          1
         
        </SecondaryButton>

        <SecondaryButton
          onClick={() => alert('shufled click')}
          
        >
          <FaRandom size={16} />
        </SecondaryButton>
      </VolumeSection>
            </AudioPlayerContainer>

    </>
  );
};

export default AudioPlayer;
