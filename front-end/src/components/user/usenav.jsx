import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
export default function Usernav(){
const [user,setUser]=useState({})
useEffect(()=>{
    const token=localStorage.getItem("token")
    const decodedtok=jwtDecode(token)
    Axios.get("http://localhost:5000/user/hum",{headers:{id:decodedtok.id}})
    .then((res)=>{
        console.log(res.data.Userdetails)
        setUser(res.data.Userdetails)
    }).catch((err)=>{
        console.log(err)
    })
},[])
const navigate=useNavigate()
const handleLogout=()=>{
    localStorage.clear()
    navigate("/log")
}

    return(
        <>
        <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home"></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="/profile"> {user.fullname}</a>
          </Navbar.Text>
          </Navbar.Collapse>
      </Container>
      <Nav className="me-auto">
        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
      </Nav>
    </Navbar>
        </>
    )
}