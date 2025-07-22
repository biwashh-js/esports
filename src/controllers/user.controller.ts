import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import { User } from "../models/user-model";
import customError from "../middlewares/error-handler.middleware";


export const getAllUser = asyncHandler(
    async(req:Request, res: Response, next:NextFunction)=> {
   
        const users:any = await User.find().select("-password")

        res.status(200).json({
            message:'All users fetched',
            status:'success',
            success:true,
            data:users
        })

})


//get by id

export const getById = asyncHandler(async(req:Request, res:Response, next:NextFunction) =>{
const {id} = req.params
        
        const user:any = await User.findById(id).select("-password")
        if(!user){
            throw new customError("user not found",404)
        }
        res.status(200).json({
            message:`user fetched`,
            status:"success",
            success:true,
            data:user
        })

})

