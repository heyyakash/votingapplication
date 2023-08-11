const { Schema, default: mongoose } = require("mongoose");

const vote = new Schema({
    candidate:{
        type:String,
        required:true
    },
    voter:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("votes",vote)

