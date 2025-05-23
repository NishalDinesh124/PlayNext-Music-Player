const {getSongs, addToLiked, getLikedSongs,dislike} = require("../Controllers/songController");

const router = require('express').Router();

router.get("/getSongs", getSongs);
router.post("/getLikedSongs", getLikedSongs);
router.post("/addToLiked", addToLiked)
router.post("/dislike",dislike  )

module.exports = router;