const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username :{
        type: String,
        required : true,
        min : 3,
        max: 20,
    },
    email:{
        type: String,
        required : true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required : true,
        min: 5,
        unique: true
    }
}) 

module.exports = mongoose.model("Users", userSchema);