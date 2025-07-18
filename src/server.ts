import 'dotenv/config'
import express from "express";
import { connectdb } from './config/db.config';
import authRoutes from './routes/auth.routes'

const PORT = process.env.PORT ?? 8080
const DB_URI = process.env.DB_URI ?? ""
const app = express()
console.log('DB_URI:', DB_URI);

//db connect
connectdb(DB_URI)

app.use(express.urlencoded({extended:true,limit:'5mb'}))
app.use(express.json({limit:'5mb'}))

app.get('/',(req,res)=>{
    res.status(200).json({
        message:'server is up and running'
    })
})


//routes
app.use('/api/auth',authRoutes)


app.listen(PORT,()=>{
    console.log(`sever is running at http://localhost:${PORT}`)
})