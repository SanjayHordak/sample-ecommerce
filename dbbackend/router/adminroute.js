const express=require('express')
const {adminaddProduct, countDetails, fetchProducts, deleteProduct, AdminOrderview, Updatestatus}=require('../controller/admincntrl')
const multer=require('multer')
const path=require('path')
const adminRouter=express.Router()
const Verfiytoken=require('../Authentication/verifytoken')
const storage=multer.diskStorage({
    destination:(res,req,cb)=>{
        console.log(req)
        cb(null,'uploads/') 
       },
       filename:(req,file,cb)=>{
         cb(null,Date.now()+path.extname(file.originalname))
       }
})
const upload=multer({storage})
adminRouter.post('/addproduct',upload.single("Image"),adminaddProduct)
adminRouter.get('/countdoc',countDetails)
adminRouter.get('/fetchproduct',Verfiytoken,fetchProducts)
adminRouter.delete('/deleteproduct',deleteProduct)
adminRouter.get('/adminorderview',AdminOrderview)
adminRouter.put('/updatestatus',Verfiytoken,Updatestatus)
module.exports=adminRouter