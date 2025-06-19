const jwt=require('jsonwebtoken')

const Verfiytoken=(req,res,next)=>{
    try{
    const token=req.headers.token
    if(!token){
       return res.status(400).json("No token found,Access Denied")
    }
    jwt.verify(token,"userjwt123",(err,decode)=>{
        if(err){
        return res.status(400).json("Token is invalid or expired")
        }
        next()
      })
}catch(err){
    console.log(err)
}}

module.exports=Verfiytoken