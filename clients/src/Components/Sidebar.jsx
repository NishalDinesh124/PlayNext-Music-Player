import React from 'react'
import styled from 'styled-components'
import { PiPlayBold } from "react-icons/pi";

export default function SideBar() {

    const SideBarContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: solid 1px magenta;
    padding: 1em;
    gap: 2em;
    width:15%;
    `;
    const NavItem = styled.div`
    display: flex;
    font-size: x-large;
    font-weight: 500;
    `;
    const Brand = styled.div`
        display: flex;
    font-size: large;
    flex-direction: row;
    
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
    return (
        <SideBarContainer>
            <Brand><PiPlayBold/><Name>
                Play Next<i>Music Player</i></Name>
                
            </Brand>
            <NavItem>Home</NavItem>
            <NavItem>Search</NavItem>
            <NavItem>Library</NavItem>
            <NavItem>Playlists</NavItem>
        </SideBarContainer>
    )
}
