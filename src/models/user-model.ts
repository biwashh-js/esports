import mongoose from 'mongoose'
import { Gender, Role } from '../types/enum.types'
import { ok } from 'assert'
const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'first name is required.'],
        trim:true
    },
    lastName:{
        type:String,
        required:[true,'last name is required'],
        trim:true,
    },
    email:{
        type:String,
        required:[true,'email is required'],
        trim:true,
        unique:[true,'user already exists with the provided email.']
    },
    phone:{
        type:String,
        trim:true,
    },
    role:{
        type:String,
        enum:Object.values(Role),
        default:Role.PLAYER
    },
    gender:{
        type:String,
        enum:Object.values(Gender),
        default:Gender.NOT_PREFER
    }
})

export const User = mongoose.model('user',UserSchema)