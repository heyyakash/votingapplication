const { Schema, default: mongoose } = require('mongoose')


const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model("users",userSchema)