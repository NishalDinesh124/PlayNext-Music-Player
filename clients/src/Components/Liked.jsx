import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { IoIosPlay, IoIosPause } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { usePlayer } from "../Contexts/PlayerContext";
import { motion } from "framer-motion";
import { dislikeRoute } from "../Utils/APIRoutes";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Liked() {
  const {
    currentSongUrl,
    togglePlay,
    isPlaying,
    likedSongs,
    handleGetLikedSongs,
  } = usePlayer();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("playnext-user")) {
      navigate("/auth");
      return;
    }
    handleGetLikedSongs();
  }, [navigate, handleGetLikedSongs]);

  const handleSongDislike = async (url) => {
    try {
      const res = await axios.post(dislikeRoute, { url });
      if (res.data.status === true) {
        toast.success("Song removed from playlist");
        handleGetLikedSongs();
      } else {
        toast.error("Error removing song from playlist");
      }
    } catch (err) {
      toast.error("An error occurred while removing the song");
    }
  };

  return (
    <LikedContainer>
      <TopBar>
        <h2>Liked Songs</h2>
      </TopBar>

      {likedSongs.length > 0 ? (
        <MusicSection variants={listVariant} initial="hidden" animate="visible">
          {likedSongs.map((song, index) => (
            <SongCard
              key={index}
              variants={itemVariant}
              transition={{ type: "spring", stiffness: 200 }}
              delay={index * 0.05}
            >
              <SongInfo>
                <PlayButton
                  onClick={() =>
                    togglePlay(
                      song.url,
                      song.title,
                      song.img,
                      song.artist,
                      index
                    )
                  }
                >
                  {isPlaying && currentSongUrl === song.url ? (
                    <IoIosPause />
                  ) : (
                    <IoIosPlay />
                  )}
                </PlayButton>
                <Details>
                  <h4>{song.title}</h4>
                  <span>{song.artist}</span>
                </Details>
              </SongInfo>

              <SongActions>
                <FaHeart
                  className="liked"
                  onClick={() => handleSongDislike(song.url)}
                />
                <Time>0:30</Time>
              </SongActions>
            </SongCard>
          ))}
        </MusicSection>
      ) : (
        <EmptyState>
          <img src="/listen.svg" alt="No Songs" />
          <h2>No songs in this list</h2>
        </EmptyState>
      )}
    </LikedContainer>
  );
}

/* ==================== ANIMATIONS ==================== */
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
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120 },
  },
};

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

/* ==================== STYLED COMPONENTS ==================== */

const LikedContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 3em 2em;
  width: 100%;
  background: radial-gradient(circle at top, #141629, #0b0b18 70%);
  color: #fff;
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 720px) {
    padding: 1.5em;
  }
`;

const TopBar = styled.div`
  text-align: center;
  margin-bottom: 2em;

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
  }

  @media (max-width: 720px) {
    h2 {
      font-size: 1.3rem;
    }
  }
`;

const MusicSection = styled(motion.div)`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8em;
  padding-right: 6px;
`;

const SongCard = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(6px);
  border-radius: 12px;
  width: 90%;
  padding: 10px 16px;
  animation: ${fadeIn} 0.5s forwards;
  animation-delay: ${({ delay }) => delay}s;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`;

const SongInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const PlayButton = styled.span`
  background: rgb(123, 77, 247);
  color: #fff;
  padding: 6px 9px;
  border-radius: 50%;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgb(143, 97, 255);
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    margin: 0;
    font-size: 0.95em;
    font-weight: 500;
  }

  span {
    color: #aaa;
    font-size: 0.8em;
  }
`;

const SongActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;

  .liked {
    color: rgb(123, 77, 247);
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .liked:hover {
    transform: scale(1.2);
  }

  svg {
    font-size: 16px;
  }
`;

const Time = styled.span`
  color: #bbb;
  font-size: 0.8em;
`;

const EmptyState = styled.div`
  color: #aaa;
  height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1em;

  img {
    width: 160px;
    opacity: 0.8;
  }

  h2 {
    font-weight: 400;
  }
`;
