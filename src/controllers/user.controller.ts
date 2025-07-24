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


//delete user

export const deleteUser = asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
        const {id} = req.params
         const deleteUser = await User.findByIdAndDelete(id)

      if(!deleteUser){
            throw new customError("user not found",404);
        }
    
    
    res.status(200).json({
        message:`user deleted sucessfully`,
        success:true,
        status:'success',
        data:null
    })

})




//update profile
export const updateProfile =asyncHandler(  async(req:Request, res:Response, next:NextFunction) =>{
      const {firstName,lastName,phone,gender} = req.body
      const {id} = req.params
      const user = await User.findById(id)

      if(!user){
            throw new customError("user not found",404);
        }
    
    if(firstName) user.firstName = firstName
    if(lastName) user.lastName = lastName
    if(phone) user.phone = phone
    if(gender) user.gender = gender
    
    await user.save()

    })