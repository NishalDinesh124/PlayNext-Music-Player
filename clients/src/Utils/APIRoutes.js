export const host = process.env.REACT_APP_API_URL;


export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const getSongsRoute = `${host}/api/songs/getSongs`;
export const addToLiked = `${host}/api/songs/addToLiked`;
export const getLikedSongs = `${host}/api/songs/getLikedSongs`;
export const dislikeRoute = `${host}/api/songs/dislike`;