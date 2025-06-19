import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import Usernav from "./usenav";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import './order.css'
export default function Cart(){
     const [cart,setCart]=useState([])
  const [cartId,setCartId]=useState("")
      const [DeliveryAddress,setDeliveryAddress]=useState("")
  const [payment,setPayment]=useState("")

         useEffect(()=>{
        const token=localStorage.getItem("token")
        const decodedtoken=jwtDecode(token)
        Axios.get("http://localhost:5000/user/cartitems",{headers:{id:decodedtoken.id}})
        .then((res)=>{
            console.log(res.data)
            setCart(res.data.Product)
            setCartId(res.data._id)
        }).catch((err)=>{
            console.log(err)
        })
    },[])


     const TotalAmount=cart.reduce((total,items)=>total+(items.quantity*items.ProductId.productPrice),0)
     const token=localStorage.getItem("token")
     const decodedtoken=jwtDecode(token)
     const placeOrder=(e)=>{
        e.preventDefault()
         console.log("Order-Details:",{
            cartId,
            TotalAmount,
            DeliveryAddress,
            payment
         })
         Axios.post("http://localhost:5000/user/placeorder",{cartId,TotalAmount,DeliveryAddress,payment},{headers:{id:decodedtoken.id}})
         .then((res)=>{
            alert(res.data)
         }).catch((err)=>{
             console.log(err)
         })
     }

    return(
        <>
        <Usernav/>
        {cart.length > 0 ? <>
           <div className="cartpage">
      <div className="order">

         <h1>MY CART</h1>
         <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Product Image</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((items,index)=>{
            return(
                <tr key={items._id}>
                    <td>{index+1}</td>
                    <td><img src={`http://localhost:5000/uploads/${items.ProductId.Image}`} alt={items.ProductId.Image} style={{width:"200px",height:"200px"}}/></td>
                    <td>{items.ProductId.productName}</td>
                    <td>{items.quantity}</td>
                    <td>{items.ProductId.productPrice}</td>
                    <td>{items.quantity * items.ProductId.productPrice}</td>
                    <td><Button variant="primary">ORDER</Button></td>
                </tr>
            )
        })}
        </tbody>
    </Table>
    </div>
        <div className="order1">
            <h1>Total Amount:{TotalAmount}</h1>
       <Form onSubmit={placeOrder}> 
      <FloatingLabel controlId="floatingTextarea2" label="Enter Your Address">
        <Form.Control
          as="textarea"
          placeholder="Enter your Address"
          style={{ height: '100px', width:"400px"}} onChange={(e)=>{setDeliveryAddress(e.target.value)}}
        />
      </FloatingLabel>
      <Form.Check type="radio" aria-label="radio 1" name='payment' value="COD"  label="Cash On Delivery" onChange={(e)=>setPayment(e.target.value)} />
      <Form.Check type="radio" aria-label="radio 1" name='payment' value="onlinepayment" label="Online Payment" onChange={(e)=>setPayment(e.target.value)} />
     <Button variant="warning" type='submit'>PLACE ORDER</Button>
    </Form>
   </div>
     </div>
         </>:
         <>
         <h1 style={{textAlign:"center"}}>Cart Is Empty</h1>
         </>}
   </>
)
}