import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler.utils";
import { User } from "../models/user-model";


//get all user
export const getALlUser = asyncHandler(
    async(req:Request,res:Response,next:NextFunction)=>{

        const users:any = await User.find().select("-password")

            res.status(200).json({
                message:'All user fetched',
                status:'success',
                success:true,
                data:users

            })
})
