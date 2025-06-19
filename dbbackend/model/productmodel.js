const mongoose=require('mongoose')
const productSchema=new mongoose.Schema({
    productName:{type:String},
    productPrice:{type:Number},
    productDescription:{type:String},
    productQuantity:{type:Number},
    Image:{type:String}
},{timeStamps:true})

const productModel=mongoose.model('product',productSchema)
module.exports=productModel;