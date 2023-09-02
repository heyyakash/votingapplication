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
    createdBy:{ 
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    candidates:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'candidates'
    }],
    votersList:[{
        type:Schema.Types.ObjectId
    }],
    endDate:{
        type:String,
        required:true
    }
})


module.exports = mongoose.model("elections", election)