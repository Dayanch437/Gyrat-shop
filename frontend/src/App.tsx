import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import Products from './components/Product';
import ProductDetails from './components/ProductDetails';
import Footer from "./components/Footer";
import CategoryProducts from './components/CategoryProducts'; // Import the correct component
import Contact from './components/Contact';
import Categories from "./components/Categories"
import SearchPage from "./components/SearchPage"


const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Slider />
            <Products />
          </>
        } />
        <Route path="/contact" element={<Contact />} />
        {/* Correct route for dynamic categories */}
        <Route path="/Category" element={<Categories />} />
        {/* Dynamic route */}
        <Route path="/category/:category" element={<CategoryProducts />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/product/:productId" element={<ProductDetails />} /> 
        <Route path="/search" element={<SearchPage />} /> {/* Search Page route */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;