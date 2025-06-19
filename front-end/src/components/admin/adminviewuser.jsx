import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
export default function Adminviewuser(){

    const [user,setUser]=useState([])
useEffect(()=>{
    Axios.get("http://localhost:5000/user/hi")
    .then((res)=>{
        console.log(res.data.Userdetails)
        setUser(res.data.Userdetails)
    }).catch((err)=>{
        console.log(err)
    })
})
const handleDelete=(id)=>{
    Axios.delete("http://localhost:5000/user/deluser",{headers:{id:id}})
    .then((res)=>{
    alert(res.data)
}).catch((err)=>{
    console.log(err)
})
}
    return(
        <>
        <h1 style={{alignItems:"center"}}>USERS</h1>
          <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Fullname</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {user.map((customer,index)=>{
            return(
                <tr key={customer._id}>
                    <td>{index+1}</td>
                    <td>{customer.fullname}</td>
                    <td>{customer.email}</td>
                    <td>{customer.address}</td>
                    <td>{customer.phone}</td>
                    <td><Button variant="danger" onClick={()=>{handleDelete(customer._id)}}>DELETE</Button></td>
                </tr>
            )
        })}
      </tbody>
    </Table>
        </>
    )
}