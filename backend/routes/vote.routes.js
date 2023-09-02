const express = require("express")
const { VerifyUser } = require("../middlewares/verify")
const router = express.Router()
const Candidate = require("../models/candidate.model")
const Election = require("../models/election.model")

router.post('/:election_id', VerifyUser, async (req, res) => {
    try {
        const { election_id } = req.params
        if (!election_id) return res.status(400).json({ msg: "election id is not valid", status: false })
        const { candidate_id } = req.body
        if (!candidate_id) return res.status(400).json({ msg: "candidate id is not valid", status: false })
        await Candidate.updateOne({ _id: candidate_id }, {
            $push:{
                votersList: req.user
            },
            $inc:{
                votes:1
            }
        })
        await Election.updateOne({_id: election_id},{
            $push:{
                votersList:req.user
            }
        })
        res.status(200).json({msg:"Vote Casted Successfully", status:true})
    } catch (err) {
        console.log(err)
        res.status(500).json({ msg: err, status: false })
    }
})

module.exports = router