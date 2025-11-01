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
         console.error("Error happened:", err);  
    res.status(500).json({ error: 'Failed to add to liked songs' });
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
        console.error("Error happened:", err);  
    res.status(500).json({ error: 'Failed to get liked songs' });
    }
}

module.exports.dislike = async (req, res, next) => {
    try {
        const {url} = req.body;
        await LikedSongs.deleteOne({url: url})
        return res.json({ status: true })
    } catch (err) {
        console.error("Error happened:", err);  
    res.status(500).json({ error: 'Failed to remove from liked songs' });
    }
}