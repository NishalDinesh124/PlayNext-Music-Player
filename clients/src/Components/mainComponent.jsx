import React from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { IoIosPlay, IoIosPause } from "react-icons/io";
import { PiPlayBold } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { addToLiked } from '../Utils/APIRoutes';
import { toast } from 'react-toastify';
import { usePlayer } from '../Contexts/PlayerContext';

export default function MainComponent() {
  const {
    apiSongs,
    currentSongImg,
    currentSongTitle,
    currentSongUrl,
    togglePlay,
    isPlaying,
    currentUser,
    artist,
  } = usePlayer();

  const handleAddToLiked = async (title, url, img, artist) => {
    try {
      const res = await axios.post(addToLiked, {
        title,
        url,
        img,
        artist,
        user: currentUser._id
      });

      if (res.data.status === true) {
        toast.success("Song added to playlist");
      } else {
        toast.error("Error adding song to playlist");
      }
    } catch (err) {
      console.log("Error adding song");
    }
  };

  return (
    <Container>
      <Navbar>
        <Brand>
          <PiPlayBold />
          <Name>
            PlayNext<i>Music Player</i>
          </Name>
        </Brand>
      </Navbar>

      <TitleSection>
        {isPlaying ? (
          <>
            <ImgSection>
              <img src={currentSongImg} alt="Album Cover" />
            </ImgSection>
            <InfoSection>
              <h2>{currentSongTitle}</h2>
              <span>{artist}</span>
            </InfoSection>
          </>
        ) : (
          <Welcome>
            <img src="/listen.svg" alt='Welcome' />
            <h2>No song is playing</h2>
          </Welcome>
        )}
      </TitleSection>

      <MusicSection>
        {apiSongs.map((song, index) => (
          <Contents key={index} delay={index * 0.1}>
            <Song>
              <span onClick={() => togglePlay(song.previewUrl, song.trackCensoredName, song.artworkUrl100, song.artistName)}>
                {isPlaying && currentSongUrl === song.previewUrl ? <IoIosPause /> : <IoIosPlay />}
              </span>
              <span>{song.trackCensoredName}</span>
            </Song>
            <CiHeart onClick={() => handleAddToLiked(song.trackCensoredName, song.previewUrl, song.artworkUrl100, song.artistName)} />
            <Time>0:30</Time>
          </Contents>
        ))}
      </MusicSection>
    </Container>
  );
}

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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
    grid-template-rows: 9% 46% 45%;
  }
`;

const Welcome = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    width: 400px;
  }

  @media only screen and (max-width: 720px) {
    img {
      width: 205px;
    }
  }

  @media (min-height: 540px) and (max-height: 800px) {
    img {
      width: 205px;
    }
  }

  @media only screen and (max-height: 540px) {
    img {
      width: 150px;
    }
  }
`;

const Navbar = styled.div`
  display: none;

  @media only screen and (max-width: 720px) {
    display: flex;
    padding: 1em;
  }
`;

const Brand = styled.div`
  display: grid;
  min-width: max-content;
  max-width: 150px;
  grid-template-columns: auto auto;
  font-size: large;

  svg {
    font-size: 30px;
    margin: 5px;
  }

  i {
    font-size: small;
    font-weight: 300;
    color: grey;
  }
`;

const Name = styled.div`
  display: flex;
  font-weight: 400;
  font-size: larger;
  flex-direction: column;
`;

const TitleSection = styled.div`
  display: flex;
  padding: 4vw;
  align-items: center;
  gap: 20px;

  @media only screen and (max-width: 720px) {
    flex-direction: column;
    gap: 0px;
  }
`;

const ImgSection = styled.div`
  width: 220px;
  height: 220px;
  border-radius: 1em;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: #2a2d3a;
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 18px 36px rgba(0, 0, 0, 0.4), 0 6px 12px rgba(255, 255, 255, 0.1);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.08);
    filter: brightness(1.1);
  }

  @media only screen and (max-width: 720px) {
    width: 160px;
    height: 160px;
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
  display: grid;
  svg {
    cursor: pointer;
  }

  opacity: 0;
  animation: ${fadeInUp} 0.5s forwards;
  animation-delay: ${({ delay }) => delay}s;
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
