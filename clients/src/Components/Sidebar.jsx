import React from 'react'
import styled from 'styled-components'
import { PiPlayBold } from "react-icons/pi";
import { usePlayer } from '../Contexts/PlayerContext';
 const SideBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2em;
    gap: 2em;
    width:18%;
   background-color: #171927;
    border-top-left-radius: 1em;
    border-bottom-left-radius:1em;

    @media only screen and (max-width: 720px) {
        display: none;
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

export default function SideBar() {
    const{
        setActiveTab
    } = usePlayer();
    return (
        <SideBarContainer>
            <Brand><PiPlayBold /><Name>
                PlayNext<i>Music Player</i></Name>
            </Brand>
            <NavItem onClick={()=> setActiveTab("home")}>Home</NavItem>
            <NavItem>Search</NavItem>
            <NavItem>Library</NavItem>
            <NavItem onClick={()=> setActiveTab("playlist")}>Playlists</NavItem>
        </SideBarContainer>
    )
}
