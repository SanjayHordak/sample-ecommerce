import React, { useState } from "react";
import img5 from '../assets/regbg.jpg'
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Regpage(){
    const backgroundStyle={
        backgroundImage:`url(${img5})`,
        backgroundSize:"cover",
        backgroundPosition:"center",
        height: '100vh', 
        display: 'flex',
        justifyContent:"center",
        alignItems:"center"
    }
    const [user,setUser]=useState({
        fullname:"",
        email:"",
        password:"",
        address:"",
        phone:"",
        
    });
    const[message,setMessage]=useState("");
    const[messagecolor,setMessageColor]=useState("red");
    const navigate=useNavigate()
    const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    console.log(user)
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("userdetails",user)
        const{fullname,email,password,address,phone}=user;
        if(!fullname||!email||!password||!address||!phone)
        {
            setMessage("REQUIRED FIELDS MISSING");
            setMessageColor("red")
        }else if(!fullname.match(/^[A-Za-z]+/)){
            setMessage("Enter Valid Name")
            setMessageColor('red')
        }else if(!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
            setMessage("Enter Valid Email id")
            setMessageColor("red")
        }else if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)){
            setMessage("Enter a valid password")
            setMessageColor("red")
        }
        else if(!phone.match(/^[6-9]\d{9}$/)){
            setMessage("Enter valid phone number")
            setMessageColor('red')
        }else{
        axios.post("http://localhost:5000/user/reg",user)
        .then((res)=>{
            alert(res.data.message)
            if(res.data.status==200){
                navigate("/log")
            }
        }).catch((err)=>{
                console.log(err)
            })
            
        }
    }
    return(
        <>
        <div style={backgroundStyle}>
           <form style={{borderRadius:"20px",border:"2px solid white", height:"600px", width:"500px",textAlign:"center",bordershadow:"20px2px 2px 4px rgba(0,0,0,0.7)"}} id="myform">
            <h1 style={{fontWeight:"bolder",fontSize:"50px", marginTop:"30px" ,color:"white", textShadow:"2px 2px 4px rgba(0,0,0,0.7)"}}>Registration</h1>
            <p><input type="text" placeholder="Enter your name"  name="fullname" onChange={handleChange}/></p>
            <p> <input type="text" placeholder="Enter your email id"  name="email" onChange={handleChange}/></p>
            <p> <input type="password" placeholder="Enter your password"  name="password" onChange={handleChange}/></p>
            <p> <input type="text" placeholder="Enter your address"  name="address" onChange={handleChange}/></p>
            <p> <input type="number" placeholder="Enter your phone number"  name="phone" onChange={handleChange}/></p>
            <p><button style={{borderRadius:"20px"}} onClick={handleSubmit}>SUBMIT</button></p>
            <p id="output" style={{ color: messagecolor}}>{message}</p>
        <p><a href="log" style={{textDecoration:"none"}}>Already have an account? Login</a></p>
           </form>
        </div>
        </>
    )
}