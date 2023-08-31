const express = require("express")
const router = express.Router()
const Election = require("../models/election.model")

router.post('/create',async (req,res) => {
    try{
        const {electionName, electionTopic, electionDescription} = req.body
        if(!electionName || !electionTopic || !electionDescription){
            return res.status(400).json({msg:"Parameter missing", status:false})
        }
        const payload = await Election.create({
            electionName,
            electionTopic, 
            electionDescription
        })
        res.status(200).json({status:true, msg:payload})
    }catch(err){
        console.log(err)
        res.status(500).json({msg:err, status:false})
    }
})


router.get('/:id', async (req,res) => { 
    try {
        const {id} = req.params
        console.log(id)
        const payload = await Election.findOne({
            "_id":id
        })
        if(!payload) return res.status(404).json({msg:"Election not found", status:false })
        res.status(200).json({status:true, msg:payload})
    } catch (err) {
        console.log(err)
        res.status(500).json({msg:err, status:false})
    }
})

module.exports = router