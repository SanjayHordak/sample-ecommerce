const mongoose=require('mongoose')
const cartSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,
    ref:'user'
    },
    Product:[{
        ProductId:{type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    },
    quantity:{
        type:Number,
        default:1
    }
    }
    ],
    status:{
        type:String,
        default:"cart"
    }
},{timeStamp:true})
const Cart=mongoose.model("cart-tbl",cartSchema)
module.exports=Cart;