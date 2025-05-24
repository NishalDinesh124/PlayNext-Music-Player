import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import { getLikedSongs, getSongsRoute } from "../Utils/APIRoutes";



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
    const [duration, setDuration] = useState(0);
    const [currentUser, setCurrentUser] = useState([]);
    const [likedSongs, setLikedSongs] = useState([]);
    const [search, setSearch] = useState(""); // search states
    const [activeTab, setActiveTab] = useState("home") //setting home/playlist component accordingly
    const [sidebar, setSidebar] = useState(false) //setting sidebar visibility
    const [filteredSongs, setFilteredSongs] = useState([]);// filtredsongs with liked and api songs
    const [currentIndex, setCurrentIndex] = useState(null); // current playing song index

    ///Functions
    const handleEnded = () => {
        handleNext();
    };

    // Play/pause Control
    const togglePlay = async (songUrl, songTitle, songImg, artist, index = null) => {
        const audio = audioRef.current;
        if (!audio) return;
        if (index !== null) {
            setCurrentIndex(index); // Set index when playing from list
        }
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
    // handle next/previous
    const handleNext = () => {
        if (filteredSongs.length === 0 || currentIndex === null) return;
        const nextIndex = (currentIndex + 1) % filteredSongs.length;
        const nextSong = filteredSongs[nextIndex];
        setCurrentIndex(nextIndex);
        togglePlay(nextSong.audioUrl, nextSong.title, nextSong.img, nextSong.artist, nextIndex);
    };

    const handlePrevious = () => {
        if (filteredSongs.length === 0 || currentIndex === null) return;
        const prevIndex = (currentIndex - 1 + filteredSongs.length) % filteredSongs.length;
        const prevSong = filteredSongs[prevIndex];
        setCurrentIndex(prevIndex);
        togglePlay(prevSong.audioUrl, prevSong.title, prevSong.img, prevSong.artist, prevIndex);
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
        console.log("Error adding song");
        getCurrentUser();// getting user from local storage
        getApiSongs(); //getting songs from backend
        handleGetLikedSongs(); // getting liked songs from database
    }, [])

    //==== FUNCTIONS ====//
    const getCurrentUser = async () => {
        const user = await JSON.parse(localStorage.getItem('playnext-user'));
        setCurrentUser(user)
    }

    /// getting songs from api 
    const getApiSongs = () => {
        try {
            axios.get(getSongsRoute)
                .then(response => {
                    console.log(response.data.results);
                    setApiSongs(response.data.results);
                })
                .catch(error => {
                    console.error('Axios Error:', error);
                });
        } catch (err) {
            console.log("An error occured", err);
        }

    }
    const handleGetLikedSongs = async () => {  /// getting liked songs
        try {
            console.log("Liked songs fetching");

            const user = await JSON.parse(localStorage.getItem('playnext-user'));
            console.log(user._id);
            const response = await axios.post(getLikedSongs, {
                userId: user._id
            })
            console.log(response.data);

            setLikedSongs(response.data)
        } catch (err) {
            console.log("An error occured", err);

        }

    }

    // ==== Categorising liked and unliked songs from API ====//
    useEffect(() => {
        console.log("Error adding song");
        const allSongsMap = new Map();

        apiSongs.forEach(song => {
            allSongsMap.set(song.previewUrl, {
                id: song.previewUrl,
                title: song.trackCensoredName,
                artist: song.artistName,
                audioUrl: song.previewUrl,
                img: song.artworkUrl100,
                type: 'api',
                isLiked: false
            });
        });

        likedSongs.forEach(song => {
            allSongsMap.set(song.url, {
                id: song.url,
                title: song.title,
                artist: song.artist,
                audioUrl: song.url,
                img: song.img,
                type: 'liked',
                isLiked: true
            });
        });

        const allSongsCombined = Array.from(allSongsMap.values());
        const filterdSearchSongs = allSongsCombined.filter((song) => /// filtering for search
            song.title.toLowerCase().includes(search.toLowerCase()) ||
            song.artist.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredSongs(filterdSearchSongs);
    }, [apiSongs, likedSongs, search]); // Only runs when these change




    return (
        <PlayerContext.Provider
            value={{
                togglePlay,
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
                currentUser,
                setCurrentUser,
                likedSongs,
                setLikedSongs,
                handleGetLikedSongs,
                filteredSongs,
                setFilteredSongs,
                search,
                setSearch,
                handleNext,
                handlePrevious,
                currentIndex,
                setCurrentIndex,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};
