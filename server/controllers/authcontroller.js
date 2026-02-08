const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async(req,res)=>{
    try{
        const {name,email,password,role} = req.body;

        const hashed = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password:hashed,
            role
        });

        res.json(user);
    }catch(err){
        res.status(500).json(err);
    }
};

exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(400).json("User not found");

        const match = await bcrypt.compare(password,user.password);
        if(!match) return res.status(400).json("Invalid credentials");

        const token = jwt.sign(
            {id:user._id, role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );

        res.json({
            token,
            role:user.role,
            name:user.name
        });

    }catch(err){
        res.status(500).json(err);
    }
};

exports.getAllUsers = async (req,res)=>{
   try{
      const users = await User.find().select("-password");
      res.json(users);
   }catch(err){
      res.status(500).json({msg:"Error fetching users"});
   }
};
