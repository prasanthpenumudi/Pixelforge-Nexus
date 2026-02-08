const jwt = require("jsonwebtoken");

exports.verifyToken = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader) return res.status(401).json("No token provided");

    const token = authHeader.split(" ")[1];

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return res.status(403).json("Invalid token");

        req.user = user;
        next();
    });
};

exports.allowRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json("Access denied");
        }
        next();
    };
};
