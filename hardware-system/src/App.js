import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';


// Importing page components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Accessories from './pages/Accessories';
import Categories from './pages/Categories';
import Sign from './pages/Sign ';
import Contact from './pages/Contact'; 
import Paint from './pages/Paint';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Footer from './components/Footer';



function App() {
  return (
    <>
    <Router>
      <div className="App">
        <Navbar/>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/sign" element={<Sign />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Paint" element={<Paint />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/footer" element={<Footer />} />
          </Routes>
        </div>
      </div>
    </Router>
    </>
  );
}

export default App;
