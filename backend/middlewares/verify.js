const jwt = require("jsonwebtoken")


exports.VerifyUser = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({ msg: "Not Allowed", status: false });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error(err);
                return res.status(401).json({ msg: "Invalid token", status: false });
            }
            const { user } = decoded;
            req.user = user.uid;
            next();
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal Server Error", status: false });
    }
};
