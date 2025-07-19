import { NextFunction, Request, Response } from "express";
import { User } from "../models/user-model";
import { hashPassword } from "../utils/bcrypt.utils";

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