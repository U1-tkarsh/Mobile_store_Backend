const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");
const userModel = require("../model/userModel");

exports.verifyToken = async (req, res, next) => {
    const token = req.headers.auth;
    // console.log(token)
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Sign In Please!!!"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        const userId = decoded.data._id;
        //   console.log(userId);
        if (req.userRole === "student") {
            const user = await userModel.findById(userId);
            // console.log(user);
            req.userRole = user.userRole;
            // req.userId = user.userId;
            req._id = user._id;
        }


        next();
    } catch (err) {
        console.error(err);
        return res.status(403).json({ error: "Invalid token." });
    }
};

exports.isAdmin = async (req, res, next) => {
    
    const token = req.headers.auth || req.query.token || req.body.headers.auth || req.cookies.token;
    // console.log(token);
    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        // console.log(decoded.data);
        //    const userId = decoded.data._id;
        // console.log(decoded.data.userRole)
        if (decoded.data.userRole === "admin") {
            //   console.log("admin")
        }

        // const user = await userModel.findById(userId);
        // console.log(user);
        // req.userRole = user.userRole;

        if (decoded.data.userRole != "admin") {
            return res.status(403).json({ error: "Access denied. Admin role required." });
        }
        next();
    } catch (err) {
        // console.log(err);
        return res.status(403).json({ error: "Invalid token." });
    }
};