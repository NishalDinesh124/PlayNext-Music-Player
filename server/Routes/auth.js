const {getSongs, register,login} = require("../Controllers/authController");

const router = require('express').Router();

router.post("/register", register);
router.post("/login", login);


module.exports = router;