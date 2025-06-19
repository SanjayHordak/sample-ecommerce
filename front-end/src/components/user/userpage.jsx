import React from 'react'
import Usernav from './usenav'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { jwtDecode } from 'jwt-decode';
import img2 from './assetso/userpage.jpg'
import Form from 'react-bootstrap/Form';
export default function Userhome() {

const [search,setSearch]=useState("")

  const backgroundStyle={
    backgroundImage: `url(${img2})`,
     backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', 
  };

const [product,setProduct]=useState([])
      const token=localStorage.getItem('token')
      const decodedToken=jwtDecode(token)
      useEffect(()=>{
      Axios.get("http://localhost:5000/admin/fetchproduct",{headers:{token:token}})
      .then((res)=>{
          console.log(res.data)
          setProduct(res.data)
      }).catch((err)=>{
          console.log(err)
      })
      },[])
      

      const handleCart=(id)=>{
        Axios.post("http://localhost:5000/user/addtocart",{ProductId:id,quantity:1},{headers:{id:decodedToken.id}})
          .then((res)=>{
            alert(res.data)
          }).catch((err)=>{
            console.log(err)
          })
      }



      const handleSearch=(e)=>{
  setSearch(e.target.value)
}
const filteredproducts=product.filter((items)=>{
 return items.productName.toLowerCase().includes(search.toLowerCase())
})
console.log(filteredproducts)

  return (
    <>
    <div style={backgroundStyle}>
    <Usernav/>
    <h1 style={{textAlign:"center"}}>Welcome User</h1>
    <Form.Control size="lg" type="text" placeholder="Search here" onChange={handleSearch}/>
    <Container className="mt-4">
        <Row  xs={1} md={3} className="g-4">   
        {filteredproducts.map((items)=>{
          return(
          <Col>
            <Card style={{ width: '22rem' }}>
          <Card.Img variant="top" src={`http://localhost:5000/uploads/${items.Image}`} style={{height:"250px"}}/>
          <Card.Body>
            <Card.Title>{items.productName}</Card.Title>
            <Card.Text>
              {items.productDescription}
            </Card.Text>
             <Card.Title>{items.productPrice} <button > + </button>  <button> - </button></Card.Title>
            <Button variant="primary" onClick={()=>handleCart(items._id)}>Add Cart</Button> <Button variant="warning">Buy Now</Button>
          </Card.Body>
        </Card>
          </Col>
          )
        })}
         </Row>
        </Container>
        </div>
    </>
  )
}
