const { Schema, default: mongoose } = require("mongoose");

const login = new Schema({
    email:{
        type:String,
        requried:true
    },
    password:{
        type:String,
        required:true,
    },
    uid:{
        type:String,
        requried:true
    }
})

module.exports = mongoose.model('logins',login)