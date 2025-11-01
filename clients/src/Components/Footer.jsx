import React from 'react';
import styled, { keyframes } from 'styled-components';
import { AiTwotonePlayCircle, AiTwotonePauseCircle } from "react-icons/ai";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { usePlayer } from '../Contexts/PlayerContext';

export default function Footer() {
  const {
    togglePlay,
    isPlaying,
    currentSongTitle,
    audioProgress,
    handleSeek,
    currentTime,
    duration,
    currentSongImg,
    handleNext,
    handlePrevious,
    artist
  } = usePlayer();

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60) || 0;
    const seconds = Math.floor(time % 60) || 0;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <ControlSection>
      <SongDetails>
        <ImgSection>
          <img src={currentSongImg} alt="cover" />
        </ImgSection>
        <SongTitleContainer>
          <ScrollingText>{currentSongTitle}</ScrollingText>
          <Artist>{artist}</Artist>
        </SongTitleContainer>
      </SongDetails>

      <CenterControls>
        <Controllers>
          <MdSkipPrevious onClick={handlePrevious} />
          <span onClick={() => togglePlay(null, null)}>
            {isPlaying ? <AiTwotonePauseCircle /> : <AiTwotonePlayCircle />}
          </span>
          <MdSkipNext onClick={handleNext} />
        </Controllers>

        <ProgressWrapper>
          <Time>{formatTime(currentTime)}</Time>
          <ProgressBarContainer
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const percent = (clickX / rect.width) * 100;
              handleSeek(percent);
            }}
          >
            <Progress progress={audioProgress || 0} />
          </ProgressBarContainer>
          <Time>{formatTime(duration)}</Time>
        </ProgressWrapper>
      </CenterControls>
    </ControlSection>
  );
}

// ====================== STYLES ====================== //

const ControlSection = styled.footer`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #202333;
  padding: 0.6em 1em;
  border-top: 1px solid #2e2f4b;
  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
  color: #fff;
  height: 90px;
  box-shadow: 0 -4px 18px rgba(0, 0, 0, 0.25);
  gap: 1em;

  @media (max-width: 720px) {
    flex-direction: column;
    height: auto;
    padding: 0.6em 0.8em 0.8em;
    gap: 0.4em;
  }
`;

const SongDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8em;
  flex: 1;

  @media (max-width: 720px) {
    gap: 0.5em;
  }
`;

const ImgSection = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 720px) {
    width: 45px;
    height: 45px;
  }
`;

const SongTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: flex-start;

  @media (max-width: 720px) {
    align-items: center;
  }
`;

const scrollText = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const ScrollingText = styled.div`
  font-size: 0.95rem;
  font-weight: 500;
  color: #fff;
  white-space: nowrap;

  @media (max-width: 720px) {
    padding-left: 100%;
    animation: ${scrollText} 10s linear infinite;
  }
`;

const Artist = styled.span`
  font-size: 0.8rem;
  color: #9ea1b3;
`;

const CenterControls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2;
  width: 100%;
`;

const Controllers = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6em;

  svg {
    font-size: 2.2rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.08);
      color: #a48df3;
    }
  }

  @media (max-width: 720px) {
    svg {
      font-size: 1.8rem;
    }
  }
`;

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin-top: 0.4em;

  @media (max-width: 720px) {
    gap: 6px;
  }
`;

const ProgressBarContainer = styled.div`
  flex: 1;
  height: 5px;
  background-color: #2e2f4b;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
`;

const Progress = styled.div`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background-color: #a48df3;
  transition: width 0.2s ease;
`;

const Time = styled.span`
  color: #b5b8cc;
  font-size: 0.75rem;
  min-width: 34px;
  text-align: center;
`;
