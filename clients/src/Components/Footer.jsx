import React from 'react'
import styled, { keyframes } from 'styled-components'
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
      <IconSection>
        <ImgSection>
          <img src={currentSongImg} alt="" />
        </ImgSection>
        <SongTitleContainer>
          
          <ScrollingText>{currentSongTitle}</ScrollingText>
          <span style={{fontSize :'15px', color: 'grey'}}>{artist}</span>
        </SongTitleContainer>
      </IconSection>

      <Controllers>
        <MdSkipPrevious onClick={handlePrevious} />
        <span onClick={() => togglePlay(null, null)}>
          {isPlaying ? <AiTwotonePauseCircle /> : <AiTwotonePlayCircle />}
        </span>
        <MdSkipNext onClick={handleNext}/>
      </Controllers>

      <InfoSection>
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
      </InfoSection>
    </ControlSection>
  );
}

// STYLES

const ControlSection = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #171927;
  display: grid;
  grid-template-columns: 56% 44%;
  align-items: center;
  justify-content: space-between;
  padding: 0 1em;
  height: 125px;
  border-top: solid 1px #2e2f4b;
  border-bottom-left-radius: 1em;
  border-bottom-right-radius: 1em;
   @media only screen and (max-width: 720px) {
   height: 115px;
  }
`;


const scrollText = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const SongTitleContainer = styled.div`
  min-width: 100px;
  gap: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
`;

const ScrollingText = styled.div`
  display: inline-block;
  color: white;
  font-size: 1rem;
  white-space: nowrap;

  @media only screen and (max-width: 720px) {
    padding-left: 100%;
    animation: ${scrollText} 8s linear infinite;
  }
`;

const IconSection = styled.div`
  display: flex;
  gap: 1em;
`;
const InfoSection = styled.div`
padding-left: 3em;
  width: 100%;
  margin-left: 5px;
  min-width: 240px;
  display: flex;
  align-items: center;
`;


const Controllers = styled.div`
  margin-left: 2em;

  svg {
    font-size: xxx-large;
  }

  @media (min-width: 385px) and (max-width: 720px) {
    svg {
      font-size: xx-large;
    }
  }

  @media only screen and (max-width: 385px) {
    svg {
      font-size: x-large;
    }
  }
`;

const ImgSection = styled.div`
  width: 50px;
  height: 50px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25), 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 3em;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
`;

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const ProgressBarContainer = styled.div`
  flex: 1;
  height: 6px;
  background-color: #2e2f4b;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
`;

const Progress = styled.div`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: #ffffff;
  transition: width 0.2s ease;
`;

const Time = styled.span`
  color: #ccc;
  font-size: 0.8rem;
  min-width: 40px;
`;
