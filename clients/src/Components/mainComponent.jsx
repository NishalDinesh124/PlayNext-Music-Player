import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { IoIosPlay, IoIosPause } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { addToLiked, dislikeRoute } from '../Utils/APIRoutes';
import { toast } from 'react-toastify';
import { usePlayer } from '../Contexts/PlayerContext';
import { useNavigate } from 'react-router-dom';
//import { motion } from 'framer-motion';
import { IoIosSearch } from "react-icons/io";
import { FaHeart } from "react-icons/fa";


export default function MainComponent() {
  const {
    filteredSongs,
    currentSongImg,
    currentSongTitle,
    currentSongUrl,
    togglePlay,
    isPlaying,
    currentUser,
    setCurrentUser,
    artist,
    search,
    setSearch,
    setFilteredSongs,
  } = usePlayer();
  const navigate = useNavigate();

  // getting user from local storage
  useEffect(() => {
    console.log("Error adding song");
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
  }, [navigate]);


  const handleAddToLiked = async (title, url, img, artist) => { // handle adding to liked songs
    console.log("Liked functioning");

    // update local state of all songs for quick  liked button effect
    setFilteredSongs(prevSongs =>
      prevSongs.map(song =>
        song.id === url ? { ...song, isLiked: true } : song
      )
    )

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
      toast.error("Error adding song to playlist")
    }
  };

  // handling disliking feature
  const handleSongDislike =async(url)=>{ 
     // update local state of all songs for quick  liked button effect
    setFilteredSongs(prevSongs =>
      prevSongs.map(song =>
        song.id === url ? { ...song, isLiked: false } : song
      )
    )
try{
  const res = await axios.post(dislikeRoute,{
        url,
  })
  if(res.data.status === true){
    toast.success("Song removed from playlist")
    
  }else{
    toast.error("An error removing song from playlist")
  }

}catch(err){
  toast.error("An error in removing song from playlist")
}
  }
  return (

    <Container>
      <TitleSection>
        {isPlaying? <Section><ImgSection>
            <img src={currentSongImg} alt="Album Cover" />
          </ImgSection>
            <InfoSection>
              <h2>{currentSongTitle}</h2>
              <span>{artist}</span>
            </InfoSection>
          </Section> : <Welcome><img src="/listen.svg" alt='Welcome' />
            <h2>No song is playing</h2></Welcome>}
        
        
      </TitleSection>
      <SearchPanel>
        <SearchInput
          type="text"
          placeholder="Search by title or artist"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon><IoIosSearch /></SearchIcon>
      </SearchPanel>


      <MusicSection>

        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => (
            <Contents key={index} delay={index * 0.1}>
              <Song>
                <span onClick={() => togglePlay(song.audioUrl, song.title, song.img, song.artist,index)}>
                  {isPlaying && currentSongUrl === song.audioUrl ? <IoIosPause /> : <IoIosPlay />}
                </span>
                <span>{song.title}</span>
              </Song>
              {song.isLiked ? <FaHeart style={{ color: "rgb(123, 77, 247)", fontSize: '16px' }} onClick={() => { handleSongDislike(song.audioUrl) }} />
                :
                <FaRegHeart onClick={() => handleAddToLiked(song.title, song.audioUrl, song.img, song.artist)} />}

              <Time>0:30</Time>
            </Contents>
          ))
        ) : (
          <div style={{ height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
            No results found
          </div>
        )}
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
   display: flex;
  flex-direction: column;
  height: 85vh;
  padding: 2em;
  box-sizing: border-box;
  gap: 1.5em;
  width: 100%;
    align-items: center;
    @media only screen and (max-width: 500px) {
   align-items: stretch;
  }
`
const Welcome = styled.div`
  display: flex;
  width: 100%;
  gap: 1em;
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
  align-items: center;
  gap: 20px;

  @media only screen and (max-width: 720px) {
    flex-direction: column;
    gap: 0px;
  }
 
`;
const SearchPanel = styled.div`
  position: relative;
  width: 88%;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  min-width: 237px;
  border-radius: 2em;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #ffffff;
  padding-left: 40px;
  font-size: 17px;
  height: 36px;
  font-family: 'Inter', sans-serif;
  color: white;
  text-align: left;

  &:focus {
    outline: none;
    border: 1px solid rgb(123, 77, 247);
    box-shadow: 0 0 0 2px rgba(122, 169, 255, 0.3);
  }

  &::placeholder {
    color: #bbb;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #ccc;
  font-size: 18px;
`;


const Section = styled.div`
 display: flex;
  align-items: center;
  gap: 1em;
  width: 100%;
  overflow: hidden;
   @media (min-height: 540px) and (max-height: 800px) {
   flex-direction: row;
  }

  @media only screen and (max-height: 540px) {
    img {
      width: 80px;
    }
  }
  @media only screen and (max-width: 540px) {
   flex-direction: column;
  }
`

const ImgSection = styled.div`
 flex-shrink: 0;
  width: 200px;
  height: 200px;
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
    width: 116px;
        height: 115px;
  }
    @media (min-height: 540px) and (max-height: 800px) {
      width: 100px;
    height: 100px;
    img {
      width: 80px;
    }
  }

  @media only screen and (max-height: 540px) {
    width: 100px;
    height: 100px;
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
width: 100%;
   flex: 1;
  overflow-y: auto;
  padding-right: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    font-size: 16px;
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
