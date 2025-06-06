import React from 'react'
import styled from 'styled-components'
import { PiPlayBold } from "react-icons/pi";
import { usePlayer } from '../Contexts/PlayerContext';
import { motion } from 'framer-motion';

export default function SideBar() {
    const {
        setActiveTab,
        sidebar,
    } = usePlayer();

    ///handling sidebar clicks
    const handleClick = () => {
        setActiveTab("playlist");
    }
    return (
        <SideBarContainer
            initial={{ x: "0%", opacity: 0 }}
            animate={sidebar ? { x: 0, opacity: 1 } : { x: "0%", opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 200,
                damping: 14
            }}
            style={{
                pointerEvents: sidebar ? "auto" : "none"
            }}>
            <Brand><PiPlayBold /><Name>
                PlayNext<i>Music Player</i></Name>
            </Brand>
            <NavItem onClick={() => setActiveTab("home")}>Home</NavItem>
            <NavItem>Search</NavItem>
            <NavItem>Library</NavItem>
            <NavItem onClick={handleClick}>Playlists</NavItem>
        </SideBarContainer>
    )
}

// styled components

const SideBarContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    padding: 2em;
    gap: 2em;
    width:18%;
    background-color: #171927;
    border-top-left-radius: 1em;
    position: absolute;
    top: 0;
    left: 0;
    width: 130px;
    z-index: 10;
     @media only screen and (max-width: 720px) {
    border-radius: 0;
    
  }

    `;
const NavItem = styled.div`
    display: flex;
    font-size: x-large;
    font-weight: 500;
    cursor: pointer;

    `;
const Brand = styled.div`
    display: grid;
    min-width: max-content;
    max-width: 150px;
    grid-template-columns: auto auto;
    font-size: large; 
    svg{
        font-size: 30px;
        margin: 5px;
    }
    i{
       font-size: small;
    font-weight: 300;
    color: grey;
    }
    `
const Name = styled.div`
        display: flex;
        font-weight: 400;
        font-size: larger;
        flex-direction: column;
    `