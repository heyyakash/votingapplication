const { Schema } = require("mongoose");

const candidate = new Schema({
    uid:{
        type:String,
        required:true
    },
    votes:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('candidates',candidate)