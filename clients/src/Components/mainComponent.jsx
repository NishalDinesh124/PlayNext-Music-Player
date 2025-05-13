import React from 'react';
import styled from 'styled-components';
import { IoIosPlay, IoIosPause } from "react-icons/io";


  // Styled-components
  const Container = styled.div`
    display: grid;
    grid-template-rows: 60% 40%;
    width: 83%;
    background-color: #202333;
    border-top-right-radius: 1em;
  `;
  const TitleSection = styled.div`
    display: flex;
    padding: 4vw;
    align-items: center;
    gap: 20px;
  `;
  const ImgSection = styled.div`
    border-radius: 1em;
    width: 245px;
    height: 245px; 
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0; 
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25), 0 4px 6px rgba(0, 0, 0, 0.1);
    img {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
    }
  `;
  const InfoSection = styled.div`
    display: grid;
    grid-template-rows: auto auto;
  `;
  const MusicSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    overflow: auto;
    gap: 1em;
     :hover {
      background-color: #2d3145;
      svg {
        visibility: visible;
      }
    }
  `;
  const Contents = styled.div`
    border-radius: 1em;
    width: 90%;
    padding: 12px;
    gap: 1em;
    grid-template-columns: 90% 10%;
    display: grid;
   
  `;
  const Time = styled.div``;
  const Song = styled.div`
    gap: 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    svg {
      visibility: hidden;
      cursor: pointer;
    }
  `;
  
export default function MainComponent(props) {



  return (
    <Container>
      <audio
        ref={props.audioRef}
        src={props.currentSong}
        onEnded={props.handleEnded}
      ></audio>

      <TitleSection>
        <ImgSection>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/The_Weeknd_%28253662129%29.jpeg/250px-The_Weeknd_%28253662129%29.jpeg"
            alt="Album Cover"
          />
        </ImgSection>
        <InfoSection>
          <h1>The Colors</h1>
          <p>Unknown Artist</p>
        </InfoSection>
      </TitleSection>

      <MusicSection>
        {props.songs.map((song, index) => (
          <Contents key={index}>
            <Song>
              <span onClick={() => props.togglePlay(song.url,song.title)}>
                {props.isPlaying && props.currentSong === song.url ? <IoIosPause /> : <IoIosPlay />}
              </span>
              <span>{song.title}</span>
            </Song>
            <Time>1:25</Time>
          </Contents>
        ))}
      </MusicSection>
    </Container>
  );
}
