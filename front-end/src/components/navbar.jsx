import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { TiShoppingCart } from "react-icons/ti";
function Navigationbar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home" style={{fontSize:"30px", fontWeight:"bold"}}>TechGiant</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="about">About</Nav.Link>
            <Nav.Link href="stock">Products</Nav.Link>
            <Nav.Link href="log">Login</Nav.Link>
            <Nav.Link href="/viewcart" style={{marginLeft:"1000px",fontSize:"25px",color:"cyan"}}><TiShoppingCart /></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </>
  )}
export default Navigationbar;