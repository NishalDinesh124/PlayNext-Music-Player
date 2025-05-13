import styled from 'styled-components'
import MainComponent from './Components/mainComponent';
import SideBar from './Components/Sidebar';
import Footer from './Components/footer';
import { useRef, useState } from 'react';

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
display: grid;
grid-template-rows: 88% 12%;
font-family: inter;
color: #ffff;
box-shadow: -18px -20px 24px rgb(22 74 165 / 25%), -1px -8px 6px rgba(0, 0, 0, 0.1);
border-radius: 1em;
height: 90vh;
`


function App() {
  //STATES///

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongUrl, setCurrentSongUrl] = useState(null);
  const [currentSongTitle, setCurrentSongTitle] = useState(null);

  ///Music play/pause control///
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
    }
  ];


  const audioRef = useRef(null);
  const handleEnded = () => {
    setIsPlaying(false);
  };

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
  return (
    <AppContainer>
      <MainComponentWrapper>
        <TopSection>
          <SideBar />
          <MainComponent togglePlay={togglePlay} songs={songs} isPlaying={isPlaying} handleEnded={handleEnded} audioRef={audioRef} currentSong={currentSongUrl} />
        </TopSection>
        <Footer togglePlay={togglePlay} isPlaying={isPlaying} currentSongUrl={currentSongUrl} currentSongTitle={currentSongTitle} />
      </MainComponentWrapper>
    </AppContainer>
  );
}

export default App;
