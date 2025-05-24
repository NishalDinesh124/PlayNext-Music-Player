import styled from 'styled-components'
import MainComponent from '../Components/mainComponent';
import SideBar from '../Components/Sidebar'
import Footer from '../Components/Footer'
import { motion } from 'framer-motion';
import { usePlayer } from '../Contexts/PlayerContext';
import Playlist from '../Components/Playlist';
import Liked from '../Components/Liked';
import { CiMenuBurger } from "react-icons/ci";
import { PiPlayBold } from "react-icons/pi";

export default function Home() {
    const {
        currentSongUrl,
        activeTab,
        audioRef,
        handleEnded,
        sidebar,
        setSidebar,
  
    } = usePlayer();
    return (
        <MainComponentWrapper>
            <audio
                ref={audioRef}
                src={currentSongUrl}
                onEnded={handleEnded}
            ></audio>
            <TopSection>
                <SideBar/>
                <MotionContainer>   
                <Navbar>
                    {/* <Brand>
                      <PiPlayBold />
                      <Name>
                        PlayNext<i>Music Player</i>
                      </Name>
                    </Brand> */}
                    <CiMenuBurger onClick={()=>{setSidebar(!sidebar)}} />
                  </Navbar>

                {activeTab === "home" ? (<MainComponent />) : 
                activeTab === "liked" ? (<Liked />) : 
               <Playlist/>}</MotionContainer>
             

            </TopSection>
            {currentSongUrl && (
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 100 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    <Footer />
                </motion.div>
            )}

        </MainComponentWrapper>
    )
}
//Styled components
const MainComponentWrapper = styled.div`
position: relative;
display: grid;
grid-template-rows: 100%;
background-color: #202333;
font-family: inter;
color: #ffff;
box-shadow: -18px -20px 24px rgb(22 74 165 / 25%), -1px -8px 6px rgba(0, 0, 0, 0.1);
border-radius: 1em;
height: 90vh;
@media only screen and (max-width: 720px) {
    height: 100vh;
  }
`
const MotionContainer = styled(motion.div)`
  max-height: 100vh;
  display: grid;
  width: 83%;
   gap: 1em;
  background-color: #202333;
  border-top-right-radius: 1em;
  border-bottom-right-radius: 1em;
  justify-items: center;

  @media only screen and (max-width: 720px) {
    width: 100%;
    border-radius: 0;
  }
`;
const TopSection = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
overflow: hidden;
width: 90vw;
 @media only screen and (max-width: 720px) {
   width: 100vw;
  }
`
const Navbar = styled.div`
  width: 75%;
display: flex;
 padding: 1em;
    height: 0px;
    justify-content: end;
    svg{
      cursor: pointer;
      font-size: 30px;
    }
  @media only screen and (max-width: 720px) {
    
   
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
