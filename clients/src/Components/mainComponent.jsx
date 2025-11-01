import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { IoIosPlay, IoIosPause } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { addToLiked, dislikeRoute } from "../Utils/APIRoutes";
import { toast } from "react-toastify";
import { usePlayer } from "../Contexts/PlayerContext";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

export default function MainComponent() {
  const {
    filteredSongs,
    currentSongImg,
    currentSongTitle,
    currentSongUrl,
    togglePlay,
    isPlaying,
    currentUser,
    artist,
    search,
    setSearch,
    setFilteredSongs,
  } = usePlayer();

  const navigate = useNavigate();
  const [isLoadingSongs, setIsLoadingSongs] = useState(true);

  useEffect(() => {
  if (filteredSongs && filteredSongs.length > 0) {
    setIsLoadingSongs(false);
  }
}, [filteredSongs]);


  const handleAddToLiked = async (title, url, img, artist) => {
    if (!localStorage.getItem("playnext-user")) {
      navigate("/auth");
      return;
    }
    setFilteredSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === url ? { ...song, isLiked: true } : song
      )
    );
    try {
      const res = await axios.post(addToLiked, {
        title,
        url,
        img,
        artist,
        user: currentUser._id,
      });
     if(!res.data.status){
      toast.error("Error adding song!, Please try again")
     }
    } catch (err) {
      toast.error("Error adding song");
    }
  };

  const handleSongDislike = async (url) => {
    if (!localStorage.getItem("playnext-user")) {
      navigate("/auth");
      return;
    }
    setFilteredSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === url ? { ...song, isLiked: false } : song
      )
    );
    try {
      const res = await axios.post(dislikeRoute, { url });
      if(!res.data.status){
        toast.error("Error removing song!")
      }
    } catch (err) {
      toast.error("Error removing song");
    }
  };

  return (
    <Container>
      <HeaderSection>
        <PlayerDisplay>
          {isPlaying ? (
            <NowPlaying>
              <Cover>
                <img src={currentSongImg} alt="Album Art" />
              </Cover>
              <Info>
                <h2>{currentSongTitle}</h2>
                <span>{artist}</span>
              </Info>
            </NowPlaying>
          ) : (
            <WelcomeSection>
              <img src="/listen.svg" alt="Welcome" />
              <h2>Start your musical journey 🎵</h2>
              <p>Tap the play button to begin</p>
            </WelcomeSection>
          )}
        </PlayerDisplay>

        <SearchPanel>
          <IoIosSearch className="search-icon" />
          <SearchInput
            type="text"
            placeholder="Search songs or artists..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchPanel>
      </HeaderSection>

      <MusicSection>
        {isLoadingSongs ? (
          <LoaderWrapper>
            <Spinner />
          </LoaderWrapper>
        ) : filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => (
            <SongCard key={index} delay={index * 0.05}>
              <SongInfo>
                <PlayButton
                  onClick={() =>
                    togglePlay(
                      song.audioUrl,
                      song.title,
                      song.img,
                      song.artist,
                      index
                    )
                  }
                >
                  {isPlaying && currentSongUrl === song.audioUrl ? (
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
                {song.isLiked ? (
                  <FaHeart
                    className="liked"
                    onClick={() => handleSongDislike(song.audioUrl)}
                  />
                ) : (
                  <FaRegHeart
                    onClick={() =>
                      handleAddToLiked(
                        song.title,
                        song.audioUrl,
                        song.img,
                        song.artist
                      )
                    }
                  />
                )}
                <Time>0:30</Time>
              </SongActions>
            </SongCard>
          ))
        ) : (
          <EmptyState>No songs found 🔍</EmptyState>
        )}
      </MusicSection>
    </Container>
  );
}

/* ==================== STYLED COMPONENTS ==================== */

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`to { transform: rotate(360deg); }`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 3em 2em;
  width: 100%;
  background: radial-gradient(circle at top, #141629, #0b0b18 70%);
  color: #fff;
  overflow: hidden;
  box-sizing: border-box;
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  height: 280px;
  min-height: 280px;
  justify-content: center;
`;

const PlayerDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 180px;
`;

const NowPlaying = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5em;
  transition: all 0.3s ease;
`;

const Cover = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 1em;
  overflow: hidden;
  background: #1c1f3b;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    font-size: 1.3em;
    margin: 0;
    font-weight: 600;
  }
  span {
    color: #aaa;
    font-size: 0.9em;
  }
`;

const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5em;
  img {
    width: 160px;
    opacity: 0.8;
  }
  h2 {
    font-weight: 600;
  }
  p {
    color: #aaa;
    font-size: 0.9em;
  }
`;

const SearchPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  max-width: 900px;

  .search-icon {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    color: #bbb;
    font-size: 20px;
  }
`;

const SearchInput = styled.input`
  height: 38px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 0em 3em;
  font-size: 16px;
  transition: 0.3s;
  &:focus {
    outline: none;
    border: 1px solid rgb(123, 77, 247);
    box-shadow: 0 0 10px rgba(123, 77, 247, 0.3);
  }
  &::placeholder {
    color: #aaa;
  }
`;

const MusicSection = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-top: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8em;
  padding-right: 6px;
`;

const SongCard = styled.div`
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
  }
  svg {
    font-size: 16px;
    cursor: pointer;
  }
`;

const Time = styled.span`
  color: #bbb;
  font-size: 0.8em;
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 260px;
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top: 4px solid rgb(123, 77, 247);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 0.9s linear infinite;
`;

const EmptyState = styled.div`
  color: #aaa;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
