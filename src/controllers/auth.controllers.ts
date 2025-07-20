import { NextFunction, Request, Response } from "express";
import { User } from "../models/user-model";
import { comparePassword, hashPassword } from "../utils/bcrypt.utils";
import customError from "../middlewares/error-handler.middleware";

export const register = async(req:Request,res:Response,next:NextFunction)=>{
    try{
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
    }catch(error){
    next(error)
    }
}


export const login = async(req:Request,res:Response,next:NextFunction)=>{
    try{
    const {email, password} = req.body
    if(!email){
        throw new customError('email is required',400)
    }
    if(!password){
        throw new customError('Password is required',400)
    }

    const user:any = await User.findOne({email})
    if(!user){
        throw new customError('credentials does not match',400)
    }

    const {password:userPass,...userData} = user?._doc
    const isPassMatched = await comparePassword(password,userPass)

    if(!isPassMatched){
        throw new customError('credentials does not match',400)
    }

    res.status(201).json({
            message:'login successful',
            status:"success",
            success:true,
            data:{
                data:userData,
            
            }
        })
    }catch(error){
        next(error)
    }
}
