import React from 'react';
import styled from 'styled-components';
import { IoIosPlay, IoIosPause } from "react-icons/io";
import { PiPlayBold } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";

export default function MainComponent(props) {

  return (
    <Container>
      <audio
        ref={props.audioRef}
        src={props.currentSongUrl}
        onEnded={props.handleEnded}
      ></audio>
      <Navbar>
        <Brand>
          <PiPlayBold /><Name>
                          PlayNext<i>Music Player</i></Name>
        </Brand>
      </Navbar>
      
      <TitleSection>
        {props.isPlaying?<><ImgSection>
        
         <img
            src={props.currentSongImg}
            alt="Album Cover"
          />
        </ImgSection>
        <InfoSection>
          <h2>{props.currentSongTitle}</h2>
          <span>Unknown artist</span>
        </InfoSection></> : <Welcome>
          <img src="/listen.svg" alt='Welcome'/>
<h2>No song is playing</h2>

                    </Welcome> }
        
      </TitleSection>

      <MusicSection>
        {props.songs.map((song, index) => (
          <Contents key={index}>
            <Song>
              <span onClick={() => props.togglePlay(song.previewUrl,song.trackCensoredName,song.artworkUrl100)}>
                {props.isPlaying && props.currentSongUrl === song.previewUrl ? <IoIosPause /> : <IoIosPlay />}
              </span>
              <span>{song.trackCensoredName}</span>
            </Song>
            <CiHeart />
            <Time>1:25</Time>
          </Contents>
        ))}
      </MusicSection>
    </Container>
  );
}


  // Styled-components
  const Container = styled.div`
    display: grid;
    grid-template-rows: 58% 42%;
    width: 83%;
    background-color: #202333;
    border-top-right-radius: 1em;
    border-bottom-right-radius: 1em;
      @media only screen and (max-width: 720px) {
        width: 100%;
        border-radius: 1em;
        grid-template-rows: 9% 46% 45%
    }
  `;
  const Welcome = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img{
      width: 400px;
    }
    @media only screen and (max-width: 720px) {
        img{
          width: 205px;
        }
    }
    
     @media (min-height: 540px) and (max-height:800px) {
       img{
          width: 205px;
        }
    }
     @media only screen and (max-height: 540px) {
        img{
          width: 150px;
        }
    }
  `
  const Navbar = styled.div`
    display: none;
   @media only screen and (max-width: 720px) {
       display: flex;
       padding: 1em;
    }
  `
  const Brand = styled.div`
  display: grid;
    min-width: max-content;
    max-width: 150px;
    grid-template-columns: auto auto;
    font-size: large;
    
    svg{
        font-size: 30px;
        margin: 5px;
    }
    i{
       font-size: small;
    font-weight: 300;
    color: grey;
    }
    `
   const Name = styled.div`
        display: flex;
        font-weight: 400;
        font-size: larger;
        flex-direction: column;
    `

  const TitleSection = styled.div`
    display: flex;
    padding: 4vw;
    align-items: center;
    gap: 20px;
      @media only screen and (max-width: 720px) {
        flex-direction:column;
        gap: 0px;
    }
  `;
  const ImgSection = styled.div`
  //width: 20%;
  //height: 49%;
max-width: 160px;
max-height: 160px;
    
    border-radius: 1em;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25), 0 4px 6px rgba(0, 0, 0, 0.1);
    @media only screen and (max-width: 720px) {
       width: 57%;
max-width: 130px;
        max-height: 130px;
    }
    img {
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
    }
  `;
  const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;
  const MusicSection = styled.div`
  max-height: 80%;
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
    width: 83%;
    padding: 12px;
    grid-template-columns: 78% 10% 12%;
    display: grid
;
   
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
