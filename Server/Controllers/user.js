import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import UserModel from '../Models/user.js'


export const signin=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const exisitingUser=await UserModel.findOne({email});
        if (!exisitingUser) {
            return res.status(404).json({message:"User doesn't exist."})
        }else{
            const isPasswordCorrect=await bcrypt.compare(password,exisitingUser.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({message:"Invalid Credentials."})
            }else{
                const token=jwt.sign({email:exisitingUser.email,id:exisitingUser._id},"test",{expiresIn:'1h'});
                res.status(200).json({result:exisitingUser,token});
            }
        }
    } catch (error) {
        res.status(500).json({message:"somthing went wrong in backend signin"});
    }
}


export const signup=async(req,res)=>{
    console.log("backend Came here");
    const {email,password,confirmPassword,firstName,lastName}=req.body;
    
    try {
        const exisitingUser=await UserModel.findOne({email});
        if (exisitingUser) {
            return res.status(400).json({message:"User already exist."})
        }

        

        if (password!==confirmPassword) {
            return res.status(400).json({message:"Passwords Mismatch"})
        }

        

        const hashedPassword=await bcrypt.hash(password,12);
        
        const result=await UserModel.create({
            email:email,
            password:hashedPassword,
            name:`${firstName} ${lastName}`
        })
        console.log("already came here ",result);
        
        const token=jwt.sign({email:result.email,id:result._id},"test",{expiresIn:'1h'});
        res.status(200).json({result,token});

    } catch (error) {
        res.status(500).json({message:"somthing went wrong in backend signUp"});
    }
    
}