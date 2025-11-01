import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { usePlayer } from '../Contexts/PlayerContext';

const imageList = [
  { src: '/happy.svg', title: 'Liked Songs' },
  { src: '/happy1.svg', title: 'Workout Vibes' },
  { src: '/happy2.svg', title: 'Chill Beats' },
  { src: '/happy3.svg', title: 'Top Hits' },
  { src: '/happy4.svg', title: 'Focus Flow' },
  { src: '/happy5.svg', title: 'Party Mix' },
];

// Animation variants
const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

export default function Playlist() {
  const { setActiveTab } = usePlayer();

  return (
    <Main>
      {imageList.map(({ src, title }, index) => (
        <MotionContent
          key={index}
          custom={index}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          onClick={() => index === 0 && setActiveTab('liked')}
        >
          <ImgSection>
            <img src={src} alt={`Album Cover ${index + 1}`} />
          </ImgSection>
          <Title>{title}</Title>
        </MotionContent>
      ))}
    </Main>
  );
}

// Styled Components
const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2em;
  padding: 2em;
  height: 100%;
  background-color: #0e101b; /* match with mainComponent background */
  overflow-y: auto;

  @media only screen and (max-width: 720px) {
    padding: 1em;
    gap: 1.2em;
  }
`;

const MotionContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #171927;
  padding: 1.5em;
  border-radius: 1em;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(255, 255, 255, 0.08),
      0 8px 16px rgba(0, 0, 0, 0.4);
  }
`;

const ImgSection = styled.div`
  width: 100%;
  border-radius: 0.8em;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2a2d3a;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease, filter 0.4s ease;
  }

  ${MotionContent}:hover & img {
    transform: scale(1.08);
    filter: brightness(1.1) contrast(1.05);
  }

  @media only screen and (max-width: 720px) {
    border-radius: 0.6em;
  }
`;

const Title = styled.h3`
  color: #ffffff;
  margin-top: 1em;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;

  @media only screen and (max-width: 720px) {
    font-size: 0.95rem;
  }
`;
