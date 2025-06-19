import React, { useEffect, useState } from 'react'
import Usernav from './usenav'
import { jwtDecode } from 'jwt-decode'
import Axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
export default function Profileuser(){
    const [user,setUser]=useState({})
    const token=localStorage.getItem("token")
    const dectoken=jwtDecode(token)
    useEffect(()=>{
        Axios.get("http://localhost:5000/user/hum",{headers:{id:dectoken.id}})
    .then((res)=>{
        console.log(res.data.Userdetails)
        setUser(res.data.Userdetails)
    }).catch((err)=>{
        console.log(err)
    })
    },[])

    const navigate=useNavigate()
    const handleEdit=(id)=>{
        navigate(`/editprofile/${id}`)
    }
    return(
        <>
        <Navigationbar/>
        <Usernav/>
                <Card style={{ width: '100%',height:"50vh",display:"flex",justifyContent:"center",alignItems:"center",marginTop:"75px" }}>
               <Card.Body  style={{border:"1px solid black",padding:"25px",borderRadius:"10px",height:"100%",width:"50%"}}>
                <Card.Title>{user.fullname}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{user.phone}</Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">{user.address}</Card.Subtitle>
                <Button variant="warning" onClick={()=>handleEdit(user._id)}>Edit Profile</Button>
                </Card.Body>
            </Card>
        </>
    )
}