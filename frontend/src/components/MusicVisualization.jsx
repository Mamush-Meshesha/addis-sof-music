import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const VisualizationContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
  border-radius: inherit;
`;

// Removed type annotation <{ delay: number }>
const WaveBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 2px;
  background: var(--gradient-primary);
  border-radius: 1px 1px 0 0;
  opacity: 0.8;
`;

// Removed type annotation <{ delay: number }>
const FloatingNote = styled(motion.div)`
  position: absolute;
  font-size: 0.8rem;
  opacity: 0.6;
  color: hsl(var(--primary));
  filter: drop-shadow(0 0 5px hsl(var(--primary) / 0.3));
`;


const MusicVisualization = ({
  isPlaying,
  size = 'medium'
}) => {
  const barCount = size === 'small' ? 12 : 20;
  const noteCount = size === 'small' ? 3 : 5;

  // Generate wave bars
  const waveBars = Array.from({ length: barCount }, (_, i) => (
    <WaveBar
      key={i}
      // 'delay' prop is passed to styled component, if it's not directly consumed
      // by the style, it's fine. If it was used in TS for prop types,
      // it's now just a regular prop. Framer Motion's 'transition' handles delays.
      delay={i * 0.1}
      style={{
        left: `${(i / barCount) * 100}%`,
        height: `${Math.random() * (size === 'small' ? 20 : 30) + 5}px`,
      }}
      animate={isPlaying ? {
        scaleY: [0.3, 1, 0.5, 1, 0.3],
        opacity: [0.4, 0.9, 0.6, 0.9, 0.4]
      } : { scaleY: 0.1, opacity: 0.1 }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.05 // Added a small per-bar delay for staggered animation
      }}
    />
  ));

  // Generate floating musical notes
  const musicNotes = ['♪', '♫', '𝄞'];
  const floatingNotes = Array.from({ length: noteCount }, (_, i) => (
    <FloatingNote
      key={i}
      // 'delay' prop is passed to styled component, similar to WaveBar
      delay={i * 0.7}
      style={{
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 60 + 20}%`,
      }}
      animate={isPlaying ? {
        y: [-10, -20, -10],
        opacity: [0.3, 0.7, 0.3],
        rotate: [-3, 3, -3]
      } : { opacity: 0.1 }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.2 // Added a small per-note delay for staggered animation
      }}
    >
      {musicNotes[i % musicNotes.length]}
    </FloatingNote>
  ));

  if (!isPlaying) return null;

  return (
    <VisualizationContainer>
      {waveBars}
      {floatingNotes}
    </VisualizationContainer>
  );
};

export default MusicVisualization;