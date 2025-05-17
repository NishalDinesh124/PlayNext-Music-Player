import React from 'react'
import styled from 'styled-components'
import { AiTwotonePlayCircle, AiTwotonePauseCircle } from "react-icons/ai";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";


    ///styling///
    const ControlSection = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
        background-color: #171927;
        display: flex;
        width: 100%;
        border-top: solid 1px #2e2f4b;
        border-bottom-left-radius: 1em;
        border-bottom-right-radius: 1em;
        flex-direction: row;
        align-items: center;
    `

    const IconSection = styled.div`
    padding: 3vh;
     @media only screen and (max-width: 720px) {
       
    }
    `
    const InfoSection = styled.div`
    width: 40%;
    margin-left:5px;
    `
    const Controllers = styled.div`
    width: 30%;
    svg{
        font-size: xxx-large;
    }
     @media only screen and (max-width: 720px) {
       svg{
        font-size: xx-large;
       }
    }
    `

    const Others = styled.div`
        width: 25%;
    `
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
    img{
      max-height: 100%;
  max-width: 100%;
  object-fit: contain;
    }
    `
    const Timer = styled.div`
        
    `
   const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
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

export default function Footer(props) {
const formatTime = (time) => {
  const minutes = Math.floor(time / 60) || 0;
  const seconds = Math.floor(time % 60) || 0;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
    

    return (
        <ControlSection>
            <IconSection>
                <ImgSection>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/The_Weeknd_Portrait_by_Brian_Ziff.jpg/250px-The_Weeknd_Portrait_by_Brian_Ziff.jpg" alt="" />
                </ImgSection>
            </IconSection>
            <InfoSection>
                <p>{props.currentSongTitle}</p>
                <Timer>
                     <ProgressWrapper>
    <Time>{formatTime(props.currentTime)}</Time>
    <ProgressBarContainer
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percent = (clickX / rect.width) * 100;
        props.handleSeek(percent);
      }}
    >
      <Progress progress={props.audioProgress || 0} />
    </ProgressBarContainer>
    <Time>{formatTime(props.duration)}</Time>
  </ProgressWrapper>
                </Timer>
            </InfoSection>
            <Controllers>
                <MdSkipPrevious /> <span onClick={()=> props.togglePlay(null,null)}>
                    {props.isPlaying ? <AiTwotonePauseCircle />
                        : <AiTwotonePlayCircle />}
                </span>


                <MdSkipNext />
            </Controllers>
        </ControlSection>
    )
}
