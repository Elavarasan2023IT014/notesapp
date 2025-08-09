const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const Register = async(req,res)=>{
    try {
        const { name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({msg:'Please enter all fields'});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({msg:'Email already exists'});
        }
        
        const user = await User.create({
            name,
            email,
            password
        })

        res.status(201).json({
            message:"User registed successfully",
            user:{id:user._id,name:user.name,email:user.email}
        });
    }catch(error){
        res.status(500).json({
            message:"Error registering user",
        })
    }
};

const Login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({msg:'Please enter all fields'});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:'Invalid credentials'});
        }

        const match = await bcryptjs.compare(password,user.password);
        if(!match){
            return res.status(400).json({msg:'Invalid credentials'});
        }
        const token = jwt.sign(
            {user_id:user._id, email:user.email},
            process.env.SECRET_KEY,
            {expiresIn:'1h'},

        );
        res.status(200).json({
            message:"User logged in successfully",
            token
            });
    }catch(error){
        res.status(500).json({
            message:"Error logging in user",
            });
    }
}

module.exports = {Register,Login};