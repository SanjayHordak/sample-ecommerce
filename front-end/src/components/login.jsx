import React, { useState } from "react";
import img4 from '../assets/login.jpg'
import  Axios  from "axios";
import { useNavigate } from "react-router-dom";
import Navigationbar from "./navbar";
export default function Loginpage(){
     const backgroundStyle = {
        backgroundImage: `url(${img4})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
     const [user,setUser]=useState({email:"",password:"",})
    const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    console.log(user)
    const navigate=useNavigate()
    const handleSubmit=(e)=>{
        e.preventDefault()
        Axios.post("http://localhost:5000/user/login",user)
        .then((res)=>{
            alert(res.data.message)
            if(res.data.status==200 && res.data.role=="admin"){
                localStorage.setItem("token",res.data.token)
                navigate('/adminhome')
            }
            else if(res.data.status==200 && res.data.role=="user"){
                localStorage.setItem("token",res.data.token)
                navigate('/userhome')
            }
            else {
               console.log(res.data.message)
            }
        }).catch((err)=>{
                console.log(err)
            })
    }
    return(
        <>
        <div style={backgroundStyle}>
            <form style={{ borderRadius:"20px",border:"2px solid white", height:"500px", width:"400px",textAlign:"center",textshadow:"20px2px 2px 4px rgba(0,0,0,0.7)",backgroundColor:"shaded black"}}>
                <p><h1 style={{fontWeight:"bolder",fontSize:"50px",marginTop:"100px", color:"white"}}>Login Page</h1></p>
                <p><input type="text" name="email" placeholder="Enter your username" onChange={handleChange}/></p>
                <p><input type="password" name="password" placeholder="Enter your Password" onChange={handleChange}/></p>
                <p><button style={{borderRadius:"10px"}} onClick={handleSubmit}>LOGIN</button></p>
                <p><a href="reg" style={{textDecoration:"none"}}>New User? Register</a></p>
            </form>
        </div>
        </>
    )
}
