const axios = require('axios')
const LikedSongs = require('../Models/songsModel')

module.exports.getSongs = async (req, res, next) => {
    try {
        console.log("Songs");
        
        const response = await axios.get('https://itunes.apple.com/search?term=lofi&media=music');
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch from Deezer' });
        console.log("Error happened");

    }
}


module.exports.addToLiked = async (req, res, next) => {
   try {
           const { title, url, img,artist,user } = req.body;
            await LikedSongs.create({
               title,
               url,
               img,
               artist,
               user
           });
           return res.json({ status: true})
       } catch (err) {
           next(err)
       }
}