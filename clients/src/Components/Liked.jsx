import React from 'react';
import styled from 'styled-components';
import { IoIosPlay, IoIosPause } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { usePlayer } from '../Contexts/PlayerContext';
import { motion } from 'framer-motion'; 
export default function Liked() {
  const {
    likedSongs,
    currentSongUrl,
    togglePlay,
    isPlaying,
  } = usePlayer();


  return (
    <><TopBar><h2>Liked Songs</h2></TopBar>


{likedSongs.length >0 ?<MotionMusicSection
        variants={listVariant}
        initial="hidden"
        animate="visible"
      >
        {likedSongs.map((song, index) => (
          <MotionContents
            key={index}
            variants={itemVariant}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Song>
              <span onClick={() =>
                togglePlay(
                  song.url,
                  song.title,
                  song.img,
                  song.artist
                )
              }>
                {isPlaying && currentSongUrl === song.url
                  ? <IoIosPause />
                  : <IoIosPlay />}
              </span>
              <span>{song.title}</span>
            </Song>

            <CiHeart/>

            <Time>0:30</Time>
          </MotionContents>
        ))}
      </MotionMusicSection>: <Welcome>
            <img src="/listen.svg" alt='Welcome' />
            <h2>No songs in this list</h2>
          </Welcome>}
      </>
     

      
   
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
const Welcome = styled.div`
  display: flex;
  margin-bottom: 28em;
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
const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 }
  },
};

// Styled-components
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
    visibility: hidden;
    font-size: 20px;
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
