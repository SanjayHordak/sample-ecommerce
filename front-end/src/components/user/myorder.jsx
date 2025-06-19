import React, { useEffect, useState } from "react";
import Axios from 'axios'
import { jwtDecode } from "jwt-decode";
import Usernav from "./usenav";
import Table from 'react-bootstrap/Table';

export default function Myorder(){

const token=localStorage.getItem("token")
const decodedtoken=jwtDecode(token)
const [order,setOrder]=useState([])
useEffect(()=>{
    Axios.get("http://localhost:5000/user/vieworder",{headers:{id:decodedtoken.id}})
    .then((res)=>{
       setOrder(res.data)
    }).catch((err)=>{
        console.log(err)
    })
},[])
      return(
<>
{/* <Usernav/> */}
<Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Products</th>
          <th>Delivery Address</th>
          <th>Total Amount</th>
          <th>Payment Details</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {order.map((orderdetails,index)=>{
            return(
                <tr key={orderdetails._id}>
                    <td>{index+1}
                        {orderdetails.cartId.Product.map((items)=>{
                            return(
                                <tr>
                                    <td>{items.ProductId.productName}</td>
                                    <td>{items.quantity}</td>
                                </tr>
                            )
                        })}
                    </td>
                    <td>{orderdetails.DeliveryAddress}</td>
                    <td>{orderdetails.TotalAmount}</td>
                    <td>{orderdetails.payment}</td>
                    <td>{orderdetails.status}</td>
                </tr>
            )
        })}

      </tbody>
      </Table>

</>

    )
}