import styled from 'styled-components'
import MainComponent from '../Components/mainComponent';
import SideBar from '../Components/Sidebar'
import Footer from '../Components/Footer'
import { motion } from 'framer-motion';
import { usePlayer } from '../Contexts/PlayerContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Playlist from '../Components/Playlist';
import Liked from '../Components/Liked';


export default function Home() {
    const {
        currentSongUrl,
        activeTab,
        audioRef,
        handleEnded,
    } = usePlayer();
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState([]);

    useEffect(() => {
        const getCurrentUser = async () => {
            if (!localStorage.getItem('playnext-user')) {
                navigate("/auth");
                return false
            } else {
                setCurrentUser(
                    await JSON.parse(
                        localStorage.getItem('playnext-user')
                    )
                );
                return true
            }
        }
        getCurrentUser();// getting user from local storage
    }, [navigate])


    return (
        <MainComponentWrapper>
            <audio
                ref={audioRef}
                src={currentSongUrl}
                onEnded={handleEnded}
            ></audio>
            <TopSection>
                <SideBar/>
                

                {activeTab === "home" ? (<MainComponent />) : 
                activeTab === "liked" ? (<Liked />) : 
               <Playlist/>}

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
font-family: inter;
color: #ffff;
box-shadow: -18px -20px 24px rgb(22 74 165 / 25%), -1px -8px 6px rgba(0, 0, 0, 0.1);
border-radius: 1em;
height: 90vh;
`
const TopSection = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
width: 90vw;
`
