const bcrypt = require('bcrypt');
const axios = require('axios')
const Users = require('../Models/userModel');

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user)
            return res.json({ msg: "Invalid Email", status: false });
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid)
        return res.json({ msg: "Invalid password", status: false });
        delete user.password
        return res.json({ status: true, user })
    } catch (err) {
        next(err)
        console.log("Error");

    }
}

module.exports.register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const emailCheck = await Users.findOne({ email });    
        if (emailCheck)
            return res.json({ msg: "Email already exist", status: false });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({
            email,
            username,
            password: hashedPassword
        });
        delete user.password;
        return res.json({ status: true, user })
    } catch (err) {
        next(err)
    }
}
