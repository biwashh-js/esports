import { NextFunction, Request, Response } from "express";
import { User } from "../models/user-model";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";

export const register = async(req:Request,res:Response,next:NextFunction)=>{
    const{firstName,lastName,email,phone,gender,password} = req.body

    const user = new User({
        firstName,
        lastName,
        email,
        password,
        phone,
        gender
    })
    const hashedPassword = await hashPassword(password)
    user.password = hashedPassword
    await user.save()

    res.status(201).json({
        message:'user registered successfully',
        success:true,
        status:'success',
        data:user
    })
}

export const login = async(req:Request,res:Response,next:NextFunction)=>{
    const {email, password} = req.body
    if(!email){
        throw new Error('email is required')
    }
    if(!password){
        throw new Error('Password is required')
    }

    const user:any = await User.findOne({email})
    if(!user){
        throw new Error('credentials does not match')
    }

    const {password:userPass,...userData} = user?._doc
    const isPassMatched = await comparePassword(password,userPass)

    if(!isPassMatched){
        throw new Error('credentials does not match')
    }

    res.status(201).json({
            message:'login successful',
            status:"success",
            success:true,
            data:{
                data:userData,
            
            }
        })
}
