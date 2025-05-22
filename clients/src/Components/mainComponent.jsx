import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { IoIosPlay, IoIosPause } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { addToLiked } from '../Utils/APIRoutes';
import { toast } from 'react-toastify';
import { usePlayer } from '../Contexts/PlayerContext';
import { useNavigate } from 'react-router-dom';
//import { motion } from 'framer-motion';
import { IoIosSearch } from "react-icons/io";


export default function MainComponent() {
  const {
    apiSongs,
    currentSongImg,
    currentSongTitle,
    currentSongUrl,
    togglePlay,
    isPlaying,
    currentUser,
    setCurrentUser,
    artist,
  } = usePlayer();
  const navigate = useNavigate();
  const [search, setSearch] = useState(""); // search states

  const filteredSongs = apiSongs.filter((song) =>
    song.trackCensoredName.toLowerCase().includes(search.toLowerCase()) ||
    song.artistName.toLowerCase().includes(search.toLowerCase())
  );

  // getting user from local storage
  useEffect(() => {
    const getCurrentUser = async () => {
      if (!localStorage.getItem('playnext-user')) {
        navigate("/auth");
      } else {
        setCurrentUser(
          await JSON.parse(
            localStorage.getItem('playnext-user')
          )
        );
      }
    }
    getCurrentUser()
  }, []);


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

    <>
      <TitleSection>
        {isPlaying ? (
          <Section><ImgSection>
            <img src={currentSongImg} alt="Album Cover" />
          </ImgSection>
            <InfoSection>
              <h2>{currentSongTitle}</h2>
              <span>{artist}</span>
            </InfoSection>
          </Section>

        ) : (
          <Welcome>
            <img src="/listen.svg" alt='Welcome' />
            <h2>No song is playing</h2>
          </Welcome>
        )}
      </TitleSection>
      <SearchPanel> <input
        type="text"
        placeholder="Search by title or artist"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 rounded-md border w-full max-w-md"
      />
      <span style={{
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    color: '#888'
  }}><IoIosSearch /></span></SearchPanel>
     

      <MusicSection>
      
  {filteredSongs.length > 0 ? (
    filteredSongs.map((song, index) => (
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
    ))
  ) : (
    <div style={{ height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
      No results found
    </div>
  )}
      </MusicSection>
    </>
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
const Welcome = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  img {
    width: 222px;
  }

  @media only screen and (max-width: 720px) {
    img {
      width: 170px;
    }
  }

  @media (min-height: 540px) and (max-height: 800px) {
    img {
      width: 136px;
    }
  }

  @media only screen and (max-height: 540px) {
    img {
      width: 150px;
    }
  }
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
const SearchPanel = styled.div`
display: flex;
position: relative;
  input{
    border-radius: 2em;
    background: #bbafaf14;
    border: solid 1px #ffff;
    text-align: center;
     padding-left: 40pxl;
    width: 100%;
    font-size: 17px;
    height: 30px;
    font-family: 'Inter'
  }
  
`

const Section = styled.div`
   @media (min-height: 540px) and (max-height: 800px) {
   flex-direction: row;
  }

  @media only screen and (max-height: 540px) {
    img {
      width: 80px;
    }
  }
`

const ImgSection = styled.div`
  width: 175px;
  height: 175px;
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
    @media (min-height: 540px) and (max-height: 800px) {
    img {
      width: 80px;
    }
  }

  @media only screen and (max-height: 540px) {
    img {
      width: 80px;
    }
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
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
  width: 83%;
  padding: 12px;
 
  grid-template-columns: 78% 10% 12%;
  display: grid;
  svg {
    visibility:hidden;
    font-size: 20px;
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
