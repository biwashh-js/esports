import mongoose from "mongoose";
import { Role } from "./enum.types";


export const onlyUser = [Role.PLAYER]
export const onlyAdmin = [Role.HOST]
export const allUserAndAdmins= [Role.HOST,Role.PLAYER]

export interface IPayload {
    _id:mongoose.Types.ObjectId;
    email:string;
    firstName:string;
    lastName:string;
    role:Role
}

export interface IJwtPayload extends IPayload{
    iat:number,
    exp:number
}


