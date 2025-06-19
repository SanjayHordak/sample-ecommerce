import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../assets/processor.jpg'
import img2 from '../assets/gcard.jpg'
import img3 from '../assets/store.webp'
function Sliderimg() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src={img1} className="d-block w=100"  alt="No image" style={{width:"100%", height:"100vh"}}/>
        <Carousel.Caption>
          <h3>Processors</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={img2} className="d-block w=100"  alt="No image" style={{width:"100%", height:"100vh"}}/>
        <Carousel.Caption>
          <h3>Graphics card</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={img3} className="d-block w=100"  alt="No image" style={{width:"100%", height:"100vh"}}/>
        <Carousel.Caption>
          <h3>Keyboards</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Sliderimg;