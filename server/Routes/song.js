const {getSongs, addToLiked} = require("../Controllers/songController");

const router = require('express').Router();

router.get("/getSongs", getSongs);
router.post("/addToLiked", addToLiked)
module.exports = router;