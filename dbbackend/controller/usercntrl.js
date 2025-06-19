// const userModel = require('../model/usermodel')
const jwt=require('jsonwebtoken')
const Usermodel=require('../model/usermodel')
const Cart = require('../model/cartmodel')
const Order = require('../model/ordermodel')
const bcrypt=require('bcrypt')
const registerUser=async(req,res)=>{
try{
const {fullname,email,password,address,phone}=req.body
const data=await Usermodel.findOne({email})
const username=await Usermodel.findOne({fullname})
if(username){
    res.json({message:"Username already exist",status:400})
}
else{
    if(data){
        res.json({message:"Email already exist",status:400})
    }
else{
    const saltRound=10
    const salt= await bcrypt.genSalt(saltRound)
    const hashpassword=await bcrypt.hash(password,salt)
const user=await Usermodel({
             fullname,email,password:hashpassword,address,phone
})
await user.save()
res.json({message:"User Registered successfully",status:200})
}
}
}
catch(err){
    console.log(err)
}
}
const fetchUsers=async(req,res)=>{
    try{
const users=await Usermodel.find({})
res.json({Userdetails:users})
}
catch(err){
    console.log(err)
}
}
const fetchUserbyid=async(req,res)=>{
    try{
        const id=req.headers.id
        const users=await Usermodel.findById(id)
        console.log(users)
        res.json({Userdetails:users})
    }catch(err){
        console.log(err)
    }
}

const deleteUser=async(req,res)=>{
    try{
        const id=req.headers.id
        await Usermodel.findByIdAndDelete(id)
        res.json({message:"User has been Deleted",status:200})
    }catch(err){
        console.log(err)
    }
}

const updateUser=async(req,res)=>{
    try{
       const id=req.headers.id
       const user=await Usermodel.findByIdAndUpdate(id,req.body)
      await user.save()
       res.json({message:"User Updated Successfully",status:200})
    }
    catch(err){
        console.log(err)
    }
}
const userLogin=async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(email=="admin123@gmail.com"&& password=="admin123"){
            const token=jwt.sign({email,password},"userjwt123",{expiresIn:"1h"})
            res.json({message:"Welcome Admin",status:200,token:token,role:"admin"})
        }
        else{
        const loggedUser=await Usermodel.findOne({email})
        if(loggedUser){
            const hashpassword=await bcrypt.compare(password,loggedUser.password)
            if(hashpassword){
                const gentoken=jwt.sign({id:loggedUser._id},"userjwt123",{expiresIn:"1h"})
                res.json({message:"Succesfully loggined",status:200,token:gentoken,role:"user"})
            }else{
                res.json({message:"Invalid password",status:400})
            }
        }else{
            res.json({message:"User not found",status:400})
        }
    }
    }catch(err){
        console.log(err)
    }
}
const addCart=async(req,res)=>{
    try{
       const userId=req.headers.id
       console.log(userId)
       const{ProductId,quantity}=req.body
       const cart=await Cart.findOne({userId:userId})
       if(cart){
        const ProductIndex=cart.Product.findIndex(p=>p.ProductId==ProductId)
        if(ProductId>-1){
            cart.Product[ProductIndex].quantity+=quantity+1 || 1
        }else{
            cart.Product.push({ProductId,quantity})
        }
        await cart.save()
       }else{
        const cart=await Cart({
            userId,
            Product:[{
            ProductId,
            quantity
        }]
        })
        await cart.save()
        res.json("Product added to Cart")
       }
    }catch(err){
        console.log(err)
    }
}

const viewCart=async(req,res)=>{
    try{
    const id=req.headers.id
    const cart=await Cart.findOne({userId:id,status:'cart'}).populate('Product.ProductId')
    res.json(cart)
}catch(err){
    console.log(err)
}
}

const placeOrder=async(req,res)=>{
    try{
        const id=req.headers.id
        console.log("userId",id)
        const{cartId,DeliveryAddress,payment,TotalAmount}=req.body
        const orders=await Order({
              userId:id,
              cartId,
              DeliveryAddress,
              payment,
              TotalAmount

        })
        await orders.save()
        const cartitems=await Cart.findOne({_id:cartId})
        console.log(cartitems)
        cartitems.status="ordered"
        await cartitems.save()
        res.json("Order Placed")
    }catch(err){
        console.log(err)
    }
}

const UserOrderview=async(req,res)=>{
    try{
       const id=req.headers.id
       const order=await Order.find({userId:id}).populate({
        path:"cartId",
        populate:{
            path:"Product.ProductId"
        }
       })
       res.json(order)
    }catch(err){
        console.log(err)
    }
}



module.exports={registerUser,fetchUsers,fetchUserbyid,deleteUser,updateUser,userLogin,addCart,viewCart,placeOrder,UserOrderview,}
