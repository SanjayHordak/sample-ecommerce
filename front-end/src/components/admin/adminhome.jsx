import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Adminuser from "./adminnav";
import './adminhome.css'
export default function Admingrid(){
    const[doc,setDoc]=useState({})
    const navigate=useNavigate()
    useEffect(()=>{
         Axios.get('http://localhost:5000/admin/countdoc')
         .then((res)=>{
          setDoc(res.data)
         }).catch((err)=>{
            console.log(err)
         })
    },[])


    return(
        <>
        <div className="grid1">
        <div className="sub1" onClick={()=>navigate("/adminviewuser")}><h1>Users Count:{doc.user}</h1></div>
        <div className="sub1" onClick={()=>navigate("/adminviewproduct")}><h1>Products Count:{doc.products}</h1></div>
        <div className="sub1" onClick={()=>navigate('/vieworder')}><h1>Orders Pending:</h1></div>
        <div className="sub1"><h1>Succesfull Deliveries:</h1></div>
        </div>
        </>
    )
}