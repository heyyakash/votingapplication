const { Schema } = require('mongoose')


const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        requried:true
    }    
})