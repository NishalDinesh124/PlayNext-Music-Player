import styled from 'styled-components'
import MainComponent from './Components/mainComponent';
import SideBar from './Components/Sidebar';
import Footer from './Components/footer'
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';


function App() {
  //STATES///

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongUrl, setCurrentSongUrl] = useState(null);
  const audioRef = useRef(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [currentSongTitle, setCurrentSongTitle] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);

  const songs = [
    {
      title: 'In the Forest 1',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    {
      title: 'In the Forest 2',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    {
      title: 'In the Forest 3',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    },
    {
      title: 'After hours',
      url: '/song.mp3'
    },
    {
      title: 'In the Forest 3',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    },
    {
      title: 'In the Forest 3',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    },
    {
      title: 'In the Forest 3',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    },
    {
      title: 'In the Forest 3',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    },
    {
      title: 'In the Forest 3',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    },

  ];

  const handleEnded = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
  const audio = audioRef.current;

  const updateProgress = () => {
    if (audio && audio.duration) {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
      const progress = (audio.currentTime / audio.duration) * 100;
      setAudioProgress(progress);
    }
  };

  audio?.addEventListener('timeupdate', updateProgress);
  audio?.addEventListener('loadedmetadata', () => {
    setDuration(audio.duration);
  });

  return () => {
    audio?.removeEventListener('timeupdate', updateProgress);
  };
}, []);

  // Play/pause Control
  const togglePlay = async(songUrl,songTitle) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentSongUrl === songUrl) {
      console.log("First if");
      
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().catch((err) => console.error("Play error:", err));
        setIsPlaying(true);
      }
    } else if(songUrl === null){
      console.log("second if");
      
      if(isPlaying){
        audio.pause();
        setIsPlaying(false)
      }else{
        setIsPlaying(true);
        audio.play().catch((err) => console.error("Play error:", err));
      }
     setIsPlaying(!isPlaying)
    }else{
      console.log("Third if");
      console.log(songUrl);
      
      
       setCurrentSongUrl(songUrl);
      setCurrentSongTitle(songTitle)
      setIsPlaying(true);

      // Small timeout to wait for src update
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch((err) => console.error("Switch play error:", err));
        }
      }, 100);
    }
  };

  //Seek on progress bar click
  const handleSeek = (percent) => {
  if (audioRef.current && duration) {
    audioRef.current.currentTime = (percent / 100) * duration;
  }
};
  return (
    <AppContainer>
      <MainComponentWrapper>
        <TopSection>
          <SideBar />
          <MainComponent togglePlay={togglePlay} songs={songs} isPlaying={isPlaying} handleEnded={handleEnded} audioRef={audioRef} currentSong={currentSongUrl} />
        </TopSection>
        {currentSongUrl && (
  <motion.div
    initial={{ opacity: 0, y: 100 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 100 }} 
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    <Footer
      togglePlay={togglePlay}
  isPlaying={isPlaying}
  currentSongUrl={currentSongUrl}
  currentSongTitle={currentSongTitle}
  audioProgress={audioProgress}
  handleSeek={handleSeek}
  currentTime={currentTime}
  duration={duration}
    />
  </motion.div>
)}
       
       
      </MainComponentWrapper>
    </AppContainer>
  );
}

/// Styled Components
const AppContainer = styled.div`
display:flex;
height: 100vh;
background-color:#393b45;
justify-content: center;
width: 100vw;
align-items: center;
`;

const TopSection = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
width: 90vw;
`
const MainComponentWrapper = styled.div`
position: relative;
display: grid;
grid-template-rows: 100%;
font-family: inter;
color: #ffff;
box-shadow: -18px -20px 24px rgb(22 74 165 / 25%), -1px -8px 6px rgba(0, 0, 0, 0.1);
border-radius: 1em;
height: 90vh;
`
export default App;
