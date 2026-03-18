import React from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  return (
    <section className="py-20 bg-brand-pink/30">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <div className="max-w-2xl mx-auto italic">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-brand-dark">Join Our Beauty Community</h2>
          <p className="text-gray-600 mb-8 font-medium">Get beauty tips, exclusive offers, and stay updated with our latest organic launches from Soundarya Shrinagar.</p>
          
          <form className="flex flex-col md:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 rounded-none border-none focus:ring-2 focus:ring-brand-gold outline-none shadow-sm bg-white"
              required
            />
            <button 
              type="submit"
              className="bg-brand-dark text-white px-10 py-4 rounded-none font-bold hover:bg-brand-gold transition-colors shadow-lg"
            >
              Subscribe Now
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-4 italic">By subscribing, you agree to our Terms and Privacy Policy.</p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
