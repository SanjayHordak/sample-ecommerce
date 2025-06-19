const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const dbConnect=async(req,res)=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/expclass")
        console.log("Database connected successfully")
    }
    catch(err){
        console.log(err)
    }
}
dbConnect()
const userRouter=require('./router/routes')
const adminRouter=require('./router/adminroute')
const {urlencoded}=require('body-parser')
app.use('/uploads',express.static('uploads'))
app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.listen(5000,()=>{
    console.log("Server started succesfully http://localhost:5000")
})