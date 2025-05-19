const {getSongs, register,login} = require("../Controllers/authController");

const router = require('express').Router();

router.post("/register", register);
router.post("/login", login);
router.get("/getSongs",getSongs);

module.exports = router;