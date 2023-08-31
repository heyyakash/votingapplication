const mongoose = require("mongoose")
const {Schema} = mongoose

const election = new Schema({
    electionName:{
        type:String,
        required:true
    },
    electionTopic:{
        type:String,
        required:true
    },
    electionDescription:{
        type:String,
        required:true
    },
    candidates:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'candidate'
    }]
})


module.exports = mongoose.model("elections", election)