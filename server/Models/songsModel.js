const mongoose = require('mongoose');

const songsSchema = new mongoose.Schema({
    title :{
        type: String,
        required : true,
    },
   url:{
    type: String,
    required: true,
   },
   img:{
    type: String,
    required: true
   },
   artist:{
    type: String,
    required: true
   },
   user:{
    type: String,
    required: true
   },
}) 

module.exports = mongoose.model("LikedSongs", songsSchema);