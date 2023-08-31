const jwt = require("jsonwebtoken")

exports.VerifyUser = async(req,res,next) => {
    try {
        const {token} = req.headers
        if(!token){
            return res.status(401).json({msg:"Not Allowed", status:false})
        }
        const decoded = await jwt.verify(token,process.env.JWT_SECRET)
        const {user} =decoded
        req.user = user.uid
        next()
    } catch (err) {
        console.log(err)
        res.json(500).json({msg:err, status:false})
    }
}