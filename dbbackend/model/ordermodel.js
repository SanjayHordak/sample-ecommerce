const mongoose=require('mongoose')
const { type } = require('os')

const oderSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    cartId:{type:mongoose.Schema.Types.ObjectId,
        ref:'cart-tbl'
    },
    DeliveryAddress:{type:String},
    payment:{type:String},
    TotalAmount:{type:Number},
    status:{type:String,
        default:"ordered"
    }
},{timestamps:true})

const Order=mongoose.model('order_tbl',oderSchema)
module.exports=Order;