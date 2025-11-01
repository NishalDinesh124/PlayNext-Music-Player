import React from 'react';
import styled from 'styled-components';
import { PiPlayBold } from "react-icons/pi";
import { usePlayer } from '../Contexts/PlayerContext';
import { motion } from 'framer-motion';

export default function SideBar() {
  const { setActiveTab, sidebar, activeTab } = usePlayer();

  return (
    <SideBarContainer
      initial={{ x: -100, opacity: 0 }}
      animate={sidebar ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
    >
      <Brand>
        <Logo>
          <PiPlayBold />
        </Logo>
        <Name>
          PlayNext
          <span>Music Player</span>
        </Name>
      </Brand>

      <Nav>
        <NavItem
          active={activeTab === "home"}
          onClick={() => setActiveTab("home")}
        >
          Home
        </NavItem>
        <NavItem
          active={activeTab === "search"}
          onClick={() => setActiveTab("home")}
        >
          Search
        </NavItem>
        <NavItem
          active={activeTab === "library"}
          onClick={() => setActiveTab("library")}
        >
          Library
        </NavItem>
        <NavItem
          active={activeTab === "liked"} ///=== Later change with playlists page ===////
          onClick={() => setActiveTab("liked")}
        >
          Liked songs
        </NavItem>
      </Nav>

      <Footer>
        <p>© 2025 NDMedia</p>
      </Footer>
    </SideBarContainer>
  );
}

// ================= Styled Components =================

const SideBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(180deg, #171927 0%, #0f101a 100%);
  padding: 2em 1.5em;
  gap: 2em;
  height: 100%;
  width: 100%;
  border-top-left-radius: 1.2em;
  border-bottom-left-radius: 1.2em;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  @media (max-width: 720px) {
    border-radius: 0;
    height: 100vh;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8em;
`;

const Logo = styled.div`
  background: rgba(123, 77, 247, 0.15);
  padding: 0.6em;
  border-radius: 12px;

  svg {
    font-size: 30px;
    color: rgb(123, 77, 247);
  }
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  font-size: 1.2rem;
  letter-spacing: 0.5px;
  color: #fff;

  span {
    font-size: 0.75rem;
    font-weight: 300;
    color: #aaa;
  }
`;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-top: 1.5em;
`;

const NavItem = styled.div`
width: 60%;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  color: ${({ active }) => (active ? '#fff' : '#bbb')};
  background: ${({ active }) => (active ? 'rgba(123, 77, 247, 0.1)' : 'transparent')};
  border-left: ${({ active }) => (active ? '4px solid rgb(123, 77, 247)' : '4px solid transparent')};
  padding: 0.6em 1em;
  border-radius: 8px;
  transition: all 0.25s ease;

  &:hover {
    background: rgba(123, 77, 247, 0.08);
    color: white;
    transform: translateX(4px);
  }
`;

const Footer = styled.div`
  text-align: center;
  font-size: 0.8rem;
  color: #666;
  margin-top: auto;
  opacity: 0.8;
`;
