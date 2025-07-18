import express from 'express'
import mongoose from 'mongoose'

export const connectdb = (uri:string)=> {
    mongoose.connect(uri)

    .then(()=>{
        console.log('db connnected')
    })
    .catch((err)=>{
        console.log('error while connecting database')
        console.log(err)
    })

}