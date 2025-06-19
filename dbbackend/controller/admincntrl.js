const Product=require('../model/productmodel')
const adminModel=require('../model/productmodel')
const User=require('../model/usermodel')
const Order=require('../model/ordermodel')
 const adminaddProduct=async(req,res)=>{
    try{
        const{productName,productPrice,productDescription,productQuantity,}=req.body
        const Image=req.file.filename
        const addproduct=await adminModel({
            productName,
            productPrice,
            productDescription,
            productQuantity,
            Image
        })
        await addproduct.save()
        res.json({message:"PRODUCT ADDED SUCCESSFULLY",status:200})
    }catch(err){
        console.log(err)
    }
 }
 const countDetails=async(req,res)=>{
    try{
        const userCount=await User.countDocuments()
        const productCount=await Product.countDocuments()
        res.json({user:userCount,products:productCount})
    }catch(err){
        console.log(err)
    }
 }

 const fetchProducts=async(req,res)=>{
    try{
       const viewProducts=await Product.find()
       res.json(viewProducts)
    }catch(err){
        console.log(err)
    }
 }

 const deleteProduct=async(req,res)=>{
        try{
        const id=req.headers.id
        await adminModel.findByIdAndDelete(id)
        res.json({message:"User has been Deleted",status:200})
    }catch(err){
        console.log(err)
    }
 }

 const AdminOrderview=async(req,res)=>{
    try{
       const id=req.headers.id
       const order=await Order.find().populate({
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
 
const Updatestatus=async(req,res)=>{
    try{
        const id=req.headers.id
        const {status}=req.body
        const Update=await Order.findOne({_id:id})
        Update.status=status
        await Update.save()
        res.json("STATUS UPDATED")
    }catch(err){
        console.log(err)
    }
}

 module.exports={adminaddProduct,fetchProducts,countDetails,deleteProduct,AdminOrderview,Updatestatus};