import React from 'react'
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
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    }
  })
};

export default function Playlist() {
  const { setActiveTab } = usePlayer();

  return (
    <Main>
      {imageList.map(({src,title},index) => (
        <MotionContent
          key={index}
          custom={index}
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          onClick={() => index === 0 && setActiveTab("liked")}
        >
          <ImgSection>
            <img src={src} alt={`Album Cover ${index + 1}`} />
          </ImgSection>
          <h3>{title}</h3>
        </MotionContent>
      ))}
    </Main>
  );
}

// Styled Components
const Main = styled.div`
  display: grid;
  width: 100%;
  overflow: auto;
  grid-template-columns: auto auto auto;

  @media only screen and (max-width: 1300px) {
    grid-template-columns: auto auto;
    padding: 2em;
  }
`;

const MotionContent = styled(motion.div)`
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

