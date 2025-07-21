import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const AppContainer = styled.div`
  min-height: 100vh;
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--gradient-musical);
    pointer-events: none;
    z-index: 0;
    animation: musical-pulse 4s ease-in-out infinite;
  }
`;

export const Header = styled.header`
  background: var(--gradient-card);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid hsl(var(--border));
  padding: 16px;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: var(--shadow-card);

  &:before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--gradient-beat);
    animation: wave 2s ease-in-out infinite;
  }
`;

export const HeaderContent = styled.h1`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: wave 3s ease-in-out infinite;
  filter: drop-shadow(0 0 10px hsl(var(--primary) / 0.3));
  position: relative;

  &:after {
    content: "🎵";
    position: absolute;
    right: -2rem;
    top: 50%;
    transform: translateY(-50%);
    animation: float 2s ease-in-out infinite;
    filter: none;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: 1px solid
    ${(props) => {
      switch (props.variant) {
        case "primary":
          return "hsl(var(--primary))";
        case "destructive":
          return "hsl(var(--destructive))";
        default:
          return "hsl(var(--border))";
      }
    }};
  background: ${(props) => {
    switch (props.variant) {
      case "primary":
        return "var(--gradient-primary)";
      case "destructive":
        return "hsl(var(--destructive))";
      default:
        return "hsl(var(--secondary))";
    }
  }};
  color: ${(props) => {
    switch (props.variant) {
      case "primary":
        return "white";
      case "destructive":
        return "hsl(var(--destructive-foreground))";
      default:
        return "hsl(var(--secondary-foreground))";
    }
  }};
  border-radius: calc(var(--radius) - 2px);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-smooth);

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${(props) =>
      props.variant === "primary"
        ? "var(--shadow-glow)"
        : "var(--shadow-card)"};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const MainContent = styled.main`
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
`

export const SongListView = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const SongListItem = styled.div`
    display: grid;
    grid-template-columns: 60px 1fr auto auto;
    gap: 1rem;
    padding: 1rem;
    background: var(--gradient-card);
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius);
    align-items: center;
    position: relative;
    overflow: hidden;
    box-shadow: ${(props) =>
    props.isPlaying ? "var(--shadow-glow)" : "var(--shadow-card)"};
  border-color: ${(props) =>
    props.isPlaying ? "hsl(var(--primary))" : "hsl(var(--border))"};

&:before {
    transform: scale(-2px);
    box-shadow: var(--shadow-elevated);
};
`

export const SongGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    padding: 2rem;
`

export const SongCard = styled(motion.div)`
  background: var(--gradient-card);
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  padding: 1.5rem;
  transition: var(--transition-smooth);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--gradient-primary);
    transform: scaleX(0);
    transition: var(--transition-smooth);
  }

  &:after {
    content: "";
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    background: var(--gradient-musical);
    border-radius: 50%;
    opacity: 0;
    transition: var(--transition-smooth);
  }

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: var(--shadow-musical);
    border-color: hsl(var(--primary));
    animation: glow-pulse 2s ease-in-out infinite;

    &:before {
      transform: scaleX(1);
      animation: wave 1.5s ease-in-out infinite;
    }

    &:after {
      opacity: 1;
      animation: musical-pulse 2s ease-in-out infinite;
    }
  }
`;

export const Modal = styled(motion.div)`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 1rem;
    overflow: visible;
    max-height: none;
`

export const ModalContent = styled(motion.div)`
    background: var(--gradient-card);
   border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: #999 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 8px;
    border: 2px solid transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #666;
  }
`;
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid hsl(var(--border));

  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: hsl(var(--foreground));
  }
`;

export const IconButton = styled.button`
  padding: 0.5rem;
  border: 1px solid
    ${(props) => {
      if (props.active) return "hsl(var(--primary))";
      switch (props.variant) {
        case "destructive":
          return "hsl(var(--destructive))";
        default:
          return "hsl(var(--border))";
      }
    }};
  background: ${(props) => {
    if (props.active) return "hsl(var(--primary))";
    switch (props.variant) {
      case "destructive":
        return "hsl(var(--destructive))";
      default:
        return "hsl(var(--secondary))";
    }
  }};
  color: ${(props) => {
    if (props.active) return "white";
    switch (props.variant) {
      case "destructive":
        return "hsl(var(--destructive-foreground))";
      default:
        return "hsl(var(--secondary-foreground))";
    }
  }};
  border-radius: calc(var(--radius) - 4px);
  cursor: pointer;
  transition: var(--transition-smooth);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.05);
    background: ${(props) => {
      if (props.active) return "hsl(var(--primary) / 0.8)";
      switch (props.variant) {
        case "destructive":
          return "hsl(var(--destructive) / 0.8)";
        default:
          return "hsl(var(--muted))";
      }
    }};
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 500;
  color: hsl(var(--foreground));
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AudioPlayerContainer = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--gradient-card);
  backdrop-filter: blur(20px);
  border-top: 1px solid hsl(var(--border));
  padding: 1rem 2rem;
  display: grid;
  grid-template-columns: 1fr auto 2fr auto;
  gap: 2rem;
  align-items: center;
  z-index: 100;
  box-shadow: 0 -10px 30px -10px hsl(var(--background) / 0.8);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }
`;

export const FilePreview = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: hsl(var(--muted) / 0.5);
  border-radius: calc(var(--radius) - 2px);
  margin-top: 1rem;
`;

export const FileIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: calc(var(--radius) - 4px);
  background: hsl(var(--primary) / 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: hsl(var(--primary));
  flex-shrink: 0;
`;

export const FileInfo = styled.div`
  flex: 1;
  min-width: 0;

  h5 {
    font-size: 0.875rem;
    font-weight: 500;
    margin: 0 0 0.25rem 0;
    color: hsl(var(--foreground));
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 0.75rem;
    color: hsl(var(--muted-foreground));
    margin: 0;
  }
`;
export const ProgressContainer = styled.div`
  margin-top: 1rem;
`;

export const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: hsl(var(--foreground));
`;

export const ProgressBarUpload = styled.div`
  width: 100%;
  height: 8px;
  background: hsl(var(--muted));
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background: var(--gradient-primary);
  transition: width 0.3s ease;
  border-radius: 4px;
`;

export const RemoveButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: hsl(var(--destructive) / 0.1);
  border: 1px solid hsl(var(--destructive) / 0.2);
  color: hsl(var(--destructive));
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-smooth);

  &:hover {
    background: hsl(var(--destructive) / 0.2);
    transform: scale(1.05);
  }
`;

export const Thumbnail = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: calc(var(--radius) - 2px);
  background: hsl(var(--muted));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  svg {
    color: hsl(var(--muted-foreground));
  }
`;

export const TrackInfo = styled.div`
  min-width: 0;
  flex: 1;

  h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: hsl(var(--foreground));
    margin: 0 0 0.25rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 0.75rem;
    color: hsl(var(--muted-foreground));
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const PlayerControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
`;

export const PlayButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--gradient-primary);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-smooth);
  box-shadow: var(--shadow-glow);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px hsl(var(--primary) / 0.4);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const SecondaryButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: ${props => props.active ? 'hsl(var(--primary) / 0.2)' : 'transparent'};
  border: 1px solid ${props => props.active ? 'hsl(var(--primary))' : 'transparent'};
  color: ${props => props.active ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition-smooth);
  position: relative;

  &:hover {
    background: hsl(var(--muted));
    color: hsl(var(--foreground));
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const ProgressSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  max-width: 500px;
  justify-self: center;

  @media (max-width: 768px) {
    order: -1;
    max-width: none;
  }
`;

export const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background: hsl(var(--muted));
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  transition: var(--transition-smooth);

  &:hover {
    height: 6px;
    
    div {
      height: 6px;
    }
  }
`;

export const ProgressHandle = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px hsl(var(--primary) / 0.3);
  transition: var(--transition-smooth);
`;

export const VolumeSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-self: end;

  @media (max-width: 768px) {
    justify-self: center;
  }
`;

export const VolumeBar = styled.div`
  width: 80px;
  height: 4px;
  background: hsl(var(--muted));
  border-radius: 2px;
  cursor: pointer;
  position: relative;

  &:hover {
    height: 6px;
    
    div {
      height: 6px;
    }
  }

  @media (max-width: 768px) {
    width: 60px;
  }
`;

export const TimeDisplay = styled.span`
  font-size: 0.75rem;
  color: hsl(var(--muted-foreground));
  font-variant-numeric: tabular-nums;
  min-width: 2.5rem;
  text-align: center;
`;

