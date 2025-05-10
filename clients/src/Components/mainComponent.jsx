import React from 'react'
import styled from 'styled-components'

export default function MainComponent() {

  const MainComponent = styled.div`
  display: grid;
 grid-template-rows: 60% 40%;
  border: solid 1px magenta;
  width: 85%;
  `
  const TitleSection = styled.div`
    padding: 3em;
    display: flex;
    border: solid 1px green;
    flex-direction: row;
    gap: 1em;
  `
  const ImgSection = styled.div`
     display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    border: solid 1px green;
    border-radius: 2em;
    img{
      width: 100%;
    }
  `
  const InfoSection = styled.div`
    display: flex;
    flex: 1.5;
    flex-direction: column;

  `
  const MusicSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    border: solid 1px yellow;
    background-color: aliceblue;
    align-items: center;
    gap: 1em;
  `
  const Contents = styled.div`
    display: flex;
    border: solid 1px magenta;
    width: 90%;
  `
  return (
    <MainComponent>
      <TitleSection>
        <ImgSection>
        <img src="https://as2.ftcdn.net/v2/jpg/12/74/26/03/1000_F_1274260358_myCasiFNWvnZHdqxlLfQQufPKEUzFkyS.webp" alt="" />
        </ImgSection>
        <InfoSection>
          <h1>The Colors</h1>
          <p>Unknown Artist</p>
        </InfoSection>
      </TitleSection>
      <MusicSection>
        <Contents>In the Forest</Contents>
         <Contents>In the Forest</Contents>
          <Contents>In the Forest</Contents>
           <Contents>In the Forest</Contents>

      </MusicSection>
    </MainComponent>
  )
}

