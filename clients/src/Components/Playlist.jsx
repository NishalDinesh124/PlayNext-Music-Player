import React from 'react'
import styled from 'styled-components';
import { PiPlayBold } from "react-icons/pi";
import { usePlayer } from '../Contexts/PlayerContext';
import { motion } from 'framer-motion';
import { RiMenuUnfold2Fill } from "react-icons/ri";

export default function Playlist() {
    const { setActiveTab,sidebar,setSidebar } = usePlayer();

    return (
        <MotionContainer>
             <Navbar>
                    <Brand>
                      <PiPlayBold />
                      <Name>
                        PlayNext<i>Music Player</i>
                      </Name>
                    </Brand>
                    <RiMenuUnfold2Fill onClick={()=>{setSidebar(!sidebar)}}/>
                  </Navbar>
            <Main>
                <Content onClick={() => { setActiveTab("liked") }}>
                    <ImgSection>
                        <img src='/happy.svg' alt="Album Cover" />
                    </ImgSection>
                    <h3>Liked Songs</h3>
                </Content>

                <Content>
                    <ImgSection>
                        <img src='/happy1.svg' alt="Album Cover" />
                    </ImgSection>
                    <h3>Liked Songs</h3>
                </Content>

                <Content>
                    <ImgSection>
                        <img src='/happy2.svg' alt="Album Cover" />
                    </ImgSection>
                    <h3>Liked Songs</h3>
                </Content>

                <Content>
                    <ImgSection>
                        <img src='/happy3.svg' alt="Album Cover" />
                    </ImgSection>
                    <h3>Liked Songs</h3>
                </Content>

                <Content>
                    <ImgSection>
                        <img src='/happy4.svg' alt="Album Cover" />
                    </ImgSection>
                    <h3>Liked Songs</h3>
                </Content>

                <Content>
                    <ImgSection>
                        <img src='/happy5.svg' alt="Album Cover" />
                    </ImgSection>
                    <h3>Liked Songs</h3>
                </Content>
            </Main>
        </MotionContainer>
    )
}

// Styled components
const MotionContainer = styled(motion.div)`
  max-height: 100vh;
  display: grid;
  padding-top: 4em;
  width: 83%;
  background-color: #202333;
  border-top-right-radius: 1em;
  border-bottom-right-radius: 1em;
  gap: 2rem;
  justify-items: center;

  @media only screen and (max-width: 720px) {
    width: 100%;
    border-radius: 1em;
  }
`;

const Main = styled.div`
  display: grid;
  width: 100%;
  overflow: auto;
  grid-template-columns: auto auto auto; 

  @media only screen and (max-width: 720px) {
    grid-template-columns: auto auto; 
    padding: 2em;
  }

  @media only screen and (max-width: 1300px) {
    grid-template-columns: auto auto;
    padding: 2em;
  }
`;

const Navbar = styled.div`
  width: 75%;
  display: none;

  @media only screen and (max-width: 720px) {
    display: flex;
    padding: 1em;
    justify-content: space-between;
    svg{
      cursor: pointer;
      font-size: 30px;
    }
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

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

const ImgSection = styled.div`
  max-width: 250px;
  max-height: 250px;
  border-radius: 1em;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  background-color: #2a2d3a;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 12px 24px rgba(255, 255, 255, 0.08), 0 8px 16px rgba(0, 0, 0, 0.4);
  }

  &:hover img {
    transform: scale(1.08);
    filter: brightness(1.1) contrast(1.05);
  }

  @media only screen and (max-width: 720px) {
    width: 57%;
    max-width: 130px;
    max-height: 130px;
  }
`;
