const { Schema, default: mongoose } = require("mongoose");

const candidate = new Schema({
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    election:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    votes:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model('candidates',candidate)