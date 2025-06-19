import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import Adminuser from "./adminnav";
import './adminhome.css'


export default function Adminviewproduct(){
     const token=localStorage.getItem("token")
    const navigate=useNavigate()
const [product,setProduct]=useState([])
useEffect(()=>{
    Axios.get("http://localhost:5000/admin/fetchproduct",{headers:{token:token}})
    .then((res)=>{
        console.log(res.data)
        setProduct(res.data)
    }).catch((err)=>{
        console.log(err)
    })
},[])
 const handleDelete=(id)=>{
    Axios.delete("http://localhost:5000/admin/deleteproduct",{headers:{id:id}})
    .then((res)=>{
        alert(res.data)
    }).catch((err)=>{
        console.log(err)
    })
 } 
    return(
        <>
        <Adminuser/>
        <h1 style={{alignItems:"center"}}>PRODUCTS</h1>
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Product Name</th>
          <th>Product Price</th>
          <th>Product Description</th>
          <th>Product Quantity</th>
          <th>Image</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {product.map((items,index)=>{
            return(
                <tr key={items._id}>
                    <td>{index+1}</td>
                    <td>{items.productName}</td>
                    <td>{items.productPrice}</td>
                    <td>{items.productDescription}</td>
                    <td>{items.productQuantity}</td>
                    <td><img src={`http://localhost:5000/uploads/${items.Image}`} alt={items.Image}style={{width:"200px"}} /></td>
                    <td><Button variant="danger" onClick={()=>{handleDelete(items._id)}}>DELETE</Button></td>
                </tr>
            )
        })}
        </tbody>
    </Table>
    <div className="float-btn" onClick={()=>navigate('/adminaddproduct')}>
        <h1>+</h1>
    </div>
        </>
     )
    }