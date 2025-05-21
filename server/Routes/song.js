const {getSongs, addToLiked, getLikedSongs} = require("../Controllers/songController");

const router = require('express').Router();

router.get("/getSongs", getSongs);
router.post("/getLikedSongs", getLikedSongs);
router.post("/addToLiked", addToLiked)
module.exports = router;