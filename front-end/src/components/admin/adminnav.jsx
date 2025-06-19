import React from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
export default function Adminuser(){
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
            Signed in as: <a href="/profile">ADMIN</a>
          </Navbar.Text>
        </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
           <a href="/fetchorder">Orders</a>
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