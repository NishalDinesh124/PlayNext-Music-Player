export const host = process.env.REACT_APP_API_URL;

export const getSongsRoute = `${host}/api/auth/getSongs`;
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;