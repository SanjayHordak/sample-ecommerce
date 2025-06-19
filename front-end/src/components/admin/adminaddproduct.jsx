import React from "react";
import './addproduct.css'
import Axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Adminaddproducts(){
const [product,setProduct]=useState({
    productName:"",
    productPrice:"",
    productDescription:"",
    productQuantity:"",
})
const[Image,setImage]=useState(null)
const handleChange=(e)=>{
    setProduct({...product,[e.target.name]:e.target.value})
}
const handleImage=(e)=>{
     setImage(e.target.files[0])
}
const handleSubmit=(e)=>{
    e.preventDefault();
    const formdata=new FormData()
    formdata.append('productName',product.productName)
    formdata.append('productPrice',product.productPrice)
    formdata.append('productDescription',product.productDescription)
    formdata.append('productQuantity',product.productQuantity)
    if(Image){
        formdata.append('Image',Image)
    }
    Axios.post("http://localhost:5000/admin/addproduct",formdata,{headers:{'Content-Type':"multipart/form-data"}
    }).then((res)=>{
        alert(res.data.message)
    }).catch((err)=>{
        console.log(err)
    })
}

    return(
        <>
        <form onSubmit={handleSubmit} id="form-admin">
    <h1>ADD PRODUCTS</h1>
    <p><input type="text" name="productName" className='product-field' required placeholder='productName' onChange={handleChange}/></p>
    <p><input type="number"name="productPrice" className='product-field' required placeholder='productPrice'onChange={handleChange}/></p>
    <p><input type="text" name="productDescription" className='product-field' required placeholder='productDescription'onChange={handleChange}/></p>
    <p><input type="number" name="productQuantity" className='product-field' required placeholder='productQuantity'onChange={handleChange}/></p>
    <p><input type="file" name="Image" className='product-field' onChange={handleImage}/></p>
    <p><button type='submit' className="button1" onClick={Navigate('/adminviewproduct')}>ADD PRODUCT</button></p>
   </form>
        </>
    )
}
