const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    fullname:{type:String},
    email:{type:String},
    password:{type:String},
    address:{type:String},
    phone:{type:Number}
},{timestamps:true})

const userModel=mongoose.model('user',userSchema)
module.exports=userModel;