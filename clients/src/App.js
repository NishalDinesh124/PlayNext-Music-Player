import styled from 'styled-components'
import MainComponent from './Components/mainComponent';
import SideBar from './Components/Sidebar';

const AppContainer = styled.div`
display:flex;
height: 100vh;
margin: 2em;
`;

const MainComponentWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
width: 90vw;
font-family: inter;
`

function App() {
  return (
    <AppContainer>
      <MainComponentWrapper>
 <SideBar />
      <MainComponent />
      </MainComponentWrapper>
     
    </AppContainer>
  );
}

export default App;
