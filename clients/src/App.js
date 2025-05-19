import styled from 'styled-components'
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Home from './Pages/Home';
import Auth from './Pages/Auth'
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <AppContainer>
      <ToastContainer/>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/auth" element={<Auth/>}/>
     </Routes>
      </BrowserRouter>
      
    </AppContainer>

  );
}

/// Styled Components
const AppContainer = styled.div`
display:flex;
height: 100vh;
background-color:#393b45;
justify-content: center;
width: 100vw;
align-items: center;
`;



export default App;
