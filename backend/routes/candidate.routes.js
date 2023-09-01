const express = require("express")
const router = express.Router()
const { VerifyUser } = require("../middlewares/verify")
const Election = require("../models/election.model")
const User = require('../models/user.model')
const Candidate = require('../models/candidate.model')

router.post('/create', VerifyUser, async (req, res) => {
    try {
        const { email } = req.body
        if (!email) return res.status(400).json({ status: false, msg: "Email not provided" })
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ status: false, msg: "user not found" })
        const result = await Candidate.create({
            uid:user["_id"]
        })
        res.status(200).json({
            status:true,
            msg:{
                candidate: result["_id"],
                user
            }
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: err, status: false })
    }
})

router.delete('/:id',VerifyUser, async(req,res)=>{
    try {
        const {id} = req.params
        if(!id) return res.status(400).json({status:false, msg:"ID not sent"})
        await Candidate.findOneAndDelete({_id:id})
        res.status(200).json({status:true, msg:"Successfully Deleted"})

    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: err, status: false })
    }
})
