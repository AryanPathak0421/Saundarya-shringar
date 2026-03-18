import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AboutSection from './components/AboutSection';
import Contact from './components/Contact';
import Shop from './components/Shop';
import Wishlist from './components/Wishlist';
import Checkout from './components/Checkout';
import TrackOrder from './components/TrackOrder';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

import BlogSection from './components/BlogSection';
import Offers from './components/Offers';

function App() {
  return (
    <ShopProvider>
      <Router>
        <CartDrawer />
        <div className="min-h-screen bg-brand-light">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutSection />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/track-order" element={<TrackOrder />} />
              <Route path="/blog" element={<BlogSection />} />
              <Route path="/offers" element={<Offers />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ShopProvider>
  );
}

export default App;
