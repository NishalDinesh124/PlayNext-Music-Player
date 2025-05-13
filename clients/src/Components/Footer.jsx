import React from 'react'
import styled from 'styled-components'
import { AiTwotonePlayCircle, AiTwotonePauseCircle } from "react-icons/ai";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";


    ///styling///
    const ControlSection = styled.div`
        background-color: #171927;
        display: flex;
        width: 100%;
        border-top: solid 1px #2e2f4b;
        border-bottom-left-radius: 1em;
        border-bottom-right-radius: 1em;
        flex-direction: row;
        align-items: center;
    `

    const IconSection = styled.div`
    padding: 3vh;
    `
    const InfoSection = styled.div`
    width: 40%;
    margin-left:5px;
    `
    const Controllers = styled.div`
    width: 30%;
    svg{
        font-size: xxx-large;
    }
    `

    const Others = styled.div`
        width: 25%;
    `
    const ImgSection = styled.div`
    width: 50px;
    height: 50px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25), 0 4px 6px rgba(0, 0, 0, 0.1);
   border-radius: 3em; 
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; 
    img{
      max-height: 100%;
  max-width: 100%;
  object-fit: contain;
    }
    `
    const Timer = styled.div`
        
    `

export default function Footer(props) {

    

    return (
        <ControlSection>
            <IconSection>
                <ImgSection>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/The_Weeknd_Portrait_by_Brian_Ziff.jpg/250px-The_Weeknd_Portrait_by_Brian_Ziff.jpg" alt="" />
                </ImgSection>
            </IconSection>
            <InfoSection>
                <p>{props.currentSongTitle}</p>
                <Timer>
                    {/* <div className='h-2 bg-green-500 rounded' style={{width: `${progressPervent}%`}}>

                    </div> */}
                </Timer>
            </InfoSection>
            <Controllers>
                <MdSkipPrevious /> <span onClick={()=> props.togglePlay(null,null)}>
                    {props.isPlaying ? <AiTwotonePauseCircle />
                        : <AiTwotonePlayCircle />}
                </span>


                <MdSkipNext />
            </Controllers>
            <Others></Others>
        </ControlSection>
    )
}
