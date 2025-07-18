import { NextFunction, Request, Response } from "express";
import { User } from "../models/user-model";

export const register = async(req:Request,res:Response,next:NextFunction)=>{
    const{firstName,lastName,email,phone,gender,password} = req.body

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        phone,
        gender
    })

    res.status(201).json({
        message:'user registered successfully',
        success:true,
        status:'success',
        data:user
    })
}