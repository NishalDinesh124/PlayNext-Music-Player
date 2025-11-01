import styled from "styled-components";
import MainComponent from "../Components/mainComponent";
import SideBar from "../Components/Sidebar";
import Footer from "../Components/Footer";
import { motion } from "framer-motion";
import { usePlayer } from "../Contexts/PlayerContext";
import Playlist from "../Components/Playlist";
import Liked from "../Components/Liked";
import { CiMenuBurger } from "react-icons/ci";

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
    <Wrapper>
      <audio ref={audioRef} src={currentSongUrl} onEnded={handleEnded}></audio>

      <MainLayout>
        {/* Sidebar */}
        <SideBarWrapper sidebar={sidebar}>
          <SideBar />
        </SideBarWrapper>

        {/* Main Content */}
        <ContentWrapper>
          <Navbar>
            <CiMenuBurger onClick={() => setSidebar(!sidebar)} />
          </Navbar>

          {activeTab === "home" ? (
            <MainComponent />
          ) : activeTab === "liked" ? (
            <Liked />
          ) : (
            <Playlist />
          )}
        </ContentWrapper>
      </MainLayout>

      {/* Footer (player) */}
      {currentSongUrl && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Footer />
        </motion.div>
      )}
    </Wrapper>
  );
}

// ================== Styled Components ==================
const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #202333;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #fff;
  font-family: "Inter", sans-serif;
`;

const MainLayout = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  overflow: hidden;
`;

const SideBarWrapper = styled.div`
  width: 250px;
  min-width: 250px;
  height: 100%;
  background: #1c1f2a;
  transition: transform 0.3s ease-in-out;
  @media (max-width: 720px) {
    position: absolute;
    top: 0;
    left: 0;
    transform: ${({ sidebar }) =>
      sidebar ? "translateX(0)" : "translateX(-100%)"};
    z-index: 50;
    width: 220px;
  }
`;

const ContentWrapper = styled(motion.div)`
  flex: 1;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: #202333;
`;

const Navbar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #202333;
  padding: 0.8em 1em;
  svg {
    font-size: 30px;
    cursor: pointer;
  }
  @media (min-width: 721px) {
    display: none; /* Only show burger icon on mobile */
  }
`;
