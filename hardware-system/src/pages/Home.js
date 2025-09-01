import React, { useState, useEffect } from 'react'
import pic2 from '../img/pic2.jpg'
import pic3 from '../img/pic3.jpg'
import pic4 from '../img/pic4.jpg'

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [pic2, pic3, pic4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Nguyas Hardware</h1>
          <p>Your one-stop shop for all hardware needs</p>
          <a href="/shop" className="shop-now-button">Shop Now</a>
        </div>

        <div className="hero-image">
          {images.map((image, index) => (
            <img 
              key={index}
              src={image} 
              alt={`Hardware showcase ${index + 1}`}
              className={`slideshow-image ${index === currentImageIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      <h2>Why choose Us</h2>
    </div>
  )
}

export default Home;