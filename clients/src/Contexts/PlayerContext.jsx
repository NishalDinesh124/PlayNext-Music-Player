import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import { getSongsRoute , getLikedSongs} from "../Utils/APIRoutes";



const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
    //STATES///

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongUrl, setCurrentSongUrl] = useState(null);
    const audioRef = useRef(null);
    const [audioProgress, setAudioProgress] = useState(0);
    const [currentSongTitle, setCurrentSongTitle] = useState(null);
    const [currentSongImg, setCurrentSongImage] = useState(null);
    const [artist, setArtist] = useState();
    const [currentTime, setCurrentTime] = useState(0);
    const [apiSongs, setApiSongs] = useState([]);
    const [likedSongs, setLikedSongs] = useState([]);
    const [duration, setDuration] = useState(0);
    const [currentUser, setCurrentUser] = useState([]);

    const [activeTab, setActiveTab] = useState("home") //setting home/playlist component accordingly
    const [sidebar, setSidebar] = useState(true) //setting sidebar visibility

    ///Functions
    const handleEnded = () => {
        setIsPlaying(false);
    };

    // Play/pause Control
    const togglePlay = async (songUrl, songTitle, songImg, artist) => {
        const audio = audioRef.current;
        if (!audio) return;

        if (currentSongUrl === songUrl) {
            console.log("First if");

            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio.play().catch((err) => console.error("Play error:", err));
                setIsPlaying(true);
            }
        } else if (songUrl === null) {
            console.log("second if");

            if (isPlaying) {
                audio.pause();
                setIsPlaying(false)
            } else {
                setIsPlaying(true);
                audio.play().catch((err) => console.error("Play error:", err));
            }
            setIsPlaying(!isPlaying)
        } else {
            console.log("Third if");
            setCurrentSongUrl(songUrl);
            setCurrentSongTitle(songTitle)
            setCurrentSongImage(songImg)
            setArtist(artist)
            setIsPlaying(true);
            console.log(currentSongUrl);

            // Small timeout to wait for src update
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.play().catch((err) => console.error("Switch play error:", err));
                }
            }, 100);
        }
    };

    //Seek on progress bar click
    const handleSeek = (percent) => {
        if (audioRef.current && duration) {
            audioRef.current.currentTime = (percent / 100) * duration;
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        const updateProgress = () => {
            if (audio && audio.duration) {
                setCurrentTime(audio.currentTime);
                setDuration(audio.duration);
                const progress = (audio.currentTime / audio.duration) * 100;
                setAudioProgress(progress);
            }
        };

        audio?.addEventListener('timeupdate', updateProgress);
        audio?.addEventListener('loadedmetadata', () => {
            setDuration(audio.duration);
        });
        return () => {
            audio?.removeEventListener('timeupdate', updateProgress);
        };
    }, []);


    useEffect(() => {
        getCurrentUser();// getting user from local storage
        getApiSongs(); //getting songs from backend
        handleGetLikedSongs(); // getting liked songs by user
    }, [])

    const getCurrentUser = async () => {
         const user =await JSON.parse(localStorage.getItem('playnext-user'));
        setCurrentUser(user)
    }

    const getApiSongs = () => {
        axios.get(getSongsRoute)
            .then(response => {
                console.log(response.data.results);
                setApiSongs(response.data.results);
            })
            .catch(error => {
                console.error('Axios Error:', error);
            });
    }

    const handleGetLikedSongs =async ()=>{
        try{
 const user =await JSON.parse(localStorage.getItem('playnext-user'));
         console.log(user._id);
        const response = await axios.post(getLikedSongs,{
            userId : user._id
        })
        console.log(response.data);
        
        setLikedSongs(response.data)
        }catch(err){
            console.log("An error occured");
            
        }
         
    }
    return (
        <PlayerContext.Provider
            value={{
                togglePlay,
                apiSongs,
                likedSongs,
                isPlaying,
                handleEnded,
                audioRef,
                currentSongUrl,
                currentSongTitle,
                currentSongImg,
                artist,
                audioProgress,
                handleSeek,
                currentTime,
                duration,
                activeTab,
                setActiveTab,
                sidebar,
                setSidebar,
                currentUser
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};
