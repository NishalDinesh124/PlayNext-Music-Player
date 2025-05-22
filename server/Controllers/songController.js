const axios = require('axios')
const LikedSongs = require('../Models/songsModel')

module.exports.getSongs = async (req, res, next) => {
    try {
        const response = await axios.get('https://itunes.apple.com/search?term=lofi&media=music');
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch from Deezer' });
        console.log("Error happened");

    }
}


module.exports.addToLiked = async (req, res, next) => {
    try {
        const { title, url, img, artist, user } = req.body;
        await LikedSongs.create({
            title,
            url,
            img,
            artist,
            user
        });
        return res.json({ status: true })
    } catch (err) {
        next(err)
    }
}

module.exports.getLikedSongs = async (req, res, next) => {
    try {
        const { userId } = req.body
        const songs = await LikedSongs.find({ user: userId.toString() });
        if (songs) {
            res.json(songs)
        } else {
            return res.json({ status: false })
        }
    } catch (err) {
        console.error("Error happened:", err);  // <-- this will show the actual error
    res.status(500).json({ error: 'Failed to fetch from Deezer' });
    }
}