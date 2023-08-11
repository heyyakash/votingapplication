const express = require("express")
const Login = require("../models/login.model")
const User = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const router = express.Router()

router.post('/login', async (req, res) => {
    try {
        if (req.body.password) {
            let searchUser = await Login.findOne({ email: req.body.email })
            if (!searchUser) {
                return res.status(403).json({ status: false, msg: "User does not exist" })
            }
            const hash = searchUser.password
            const match = await bcrypt.compare(req.body.password, hash)
            if (!match) return res.status(401).json({ msg: "Wrong Password", status: false })
            const data = {
                user: {
                    uid:searchUser.uid
                }
            }
            const authToken = jwt.sign(data, process.env.JWT_SECRET);
            res.status(200).json({ authToken, status: true });
            return;
        }
        res.status(500).json({ color: "red", msg: "Enter Password", status: false });

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ color: "red", err: "Some Error occuerd" })
    }

})

router.post('/create', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await Login.findOne({ email })
        if (existingUser) return res.status(401).json({ color: 'red', msg: "User already exists", status: false });
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const { firstname, lastname, age, gender } = req.body
        const user = await User.create({
            firstname,
            lastname,
            email,
            age,
            gender
        })
        console.log(user)
        await Login.create({
            email,
            password: hashedPass,
            uid: user["_id"]
        })

        res.status(200).json({ color: "green", msg: "User Created statusfully", status: true });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ msg: err, status: false })
    }
})

router.get('/details', async (req, res) => {
    res.json({ msg: "Sucess" })
})

module.exports = router