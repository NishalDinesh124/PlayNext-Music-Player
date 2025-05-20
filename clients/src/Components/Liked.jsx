import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { IoIosPlay, IoIosPause } from "react-icons/io";
import { PiPlayBold } from "react-icons/pi";
import { CiHeart } from "react-icons/ci";
import { addToLiked } from '../Utils/APIRoutes';
import { toast } from 'react-toastify';
import { usePlayer } from '../Contexts/PlayerContext';
import { motion } from 'framer-motion'; // Framer Motion

export default function Liked() {
  const {
    apiSongs,
    currentSongUrl,
    togglePlay,
    isPlaying,
    currentUser,
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

      <TopBar><h2>Liked Songs</h2></TopBar>

      <MotionMusicSection
        variants={listVariant}
        initial="hidden"
        animate="visible"
      >
        {apiSongs.map((song, index) => (
          <MotionContents
            key={index}
            variants={itemVariant}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Song>
              <span onClick={() =>
                togglePlay(
                  song.previewUrl,
                  song.trackCensoredName,
                  song.artworkUrl100,
                  song.artistName
                )
              }>
                {isPlaying && currentSongUrl === song.previewUrl
                  ? <IoIosPause />
                  : <IoIosPlay />}
              </span>
              <span>{song.trackCensoredName}</span>
            </Song>

            <CiHeart onClick={() =>
              handleAddToLiked(
                song.trackCensoredName,
                song.previewUrl,
                song.artworkUrl100,
                song.artistName
              )
            } />

            <Time>0:30</Time>
          </MotionContents>
        ))}
      </MotionMusicSection>
    </Container>
  );
}

// Animation variants
const listVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 }
  },
};

// Styled-components
const Container = styled.div`
  display: grid;
  width: 83%;
  background-color: #202333;
  border-top-right-radius: 1em;
  border-bottom-right-radius: 1em;
  @media only screen and (max-width: 720px) {
    width: 100%;
    border-radius: 1em;
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

const TopBar = styled.div`
  text-align: center;
`;

const MotionMusicSection = styled(motion.div)`
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

const MotionContents = styled(motion.div)`
  border-radius: 1em;
  width: 83%;
  padding: 12px;
  grid-template-columns: 78% 10% 12%;
  display: grid;

  svg {
    cursor: pointer;
  }
`;

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

const Time = styled.div``;
