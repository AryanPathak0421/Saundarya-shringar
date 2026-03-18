import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { useShop } from '../context/ShopContext';

// Assets (re-using some from Shop.jsx or general ones)
import imgTirtirRed from '../assets/products/tirtir_red_cushion.png';
import imgTirtirConcealer from '../assets/products/tirtir_concealer_stick.png';
import imgCatkin from '../assets/products/catkin_oriental_lipstick.png';
import imgVerymiss from '../assets/products/verymiss_lipstick_set.png';
import imgRoseGold from '../assets/products/rose_gold_eyeshadow_palette.png';
import imgLakmePowder from '../assets/products/lakme_face_powder.png';
import imgLipGloss from '../assets/products/plumping_lip_gloss.png';
import imgMascara from '../assets/products/volumizing_mascara.png';

const offerProducts = [
  {
    id: 1,
    name: 'TIRTIR Mask Fit Red Cushion',
    price: 2899,
    oldPrice: 3499,
    rating: 5,
    reviews: 1245,
    discount: '17%',
    image: imgTirtirRed,
    category: 'makeup',
    label: 'Hot Offer'
  },
  {
    id: 103,
    name: 'Glow Vit-C Serum',
    price: 1850,
    oldPrice: 2200,
    rating: 5,
    reviews: 450,
    discount: '15%',
    image: imgTirtirRed,
    category: 'skincare',
    label: 'Limited Time'
  },
  {
    id: 201,
    name: 'Oriental Silk Foundation',
    price: 2850,
    oldPrice: 3200,
    rating: 5,
    reviews: 890,
    discount: '10%',
    image: imgLakmePowder,
    category: 'makeup',
    label: 'Best Deal'
  },
  {
    id: 5,
    name: 'Verymiss Kiss Proof Trio',
    price: 999,
    oldPrice: 1499,
    rating: 4,
    reviews: 856,
    discount: '33%',
    image: imgVerymiss,
    category: 'makeup',
    label: 'Super Saver'
  },
  {
    id: 6,
    name: 'Rose Gold Eyeshadow Palette',
    price: 3250,
    oldPrice: 4000,
    rating: 5,
    reviews: 840,
    discount: '20%',
    image: imgRoseGold,
    category: 'makeup',
    label: 'Exclusive'
  },
  {
    id: 351,
    name: 'Bridal Radiance Kit',
    price: 4500,
    oldPrice: 5500,
    rating: 5,
    reviews: 45,
    discount: '18%',
    image: imgRoseGold,
    category: 'beauty kits',
    label: 'Bundle Deal'
  },
  {
    id: 3,
    name: 'Dual Concealer Stick',
    price: 1650,
    oldPrice: 1950,
    rating: 5,
    reviews: 560,
    discount: '15%',
    image: imgTirtirConcealer,
    category: 'makeup',
    label: 'Flash Sale'
  },
  {
    id: 401,
    name: 'Oud Majesty Perfume',
    price: 3450,
    oldPrice: 3950,
    rating: 5,
    reviews: 120,
    discount: '12%',
    image: imgLipGloss,
    category: 'fragrances',
    label: 'Daily Deal'
  }
];

const Offers = () => {
  return (
    <div className="min-h-screen bg-[#FEFAF6] pb-20">
      {/* Premium Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 opacity-40">
           {/* Decorative background pattern or image could go here */}
           <div className="absolute inset-0 bg-gradient-to-r from-brand-pink/20 to-brand-gold/20 mix-blend-overlay"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-brand-gold font-bold uppercase tracking-[0.6em] text-[10px] md:text-sm block mb-4"
          >
            Exclusive Benefits
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-decorative text-white mb-6 uppercase tracking-tight"
          >
            Divine <span className="text-brand-pink italic">Offers</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="text-white/70 max-w-xl mx-auto text-xs md:text-base font-serif leading-relaxed italic"
          >
            Unveil our most coveted treasures at prices that celebrate your inner radiance. 
            Limited time arrangements curated just for you.
          </motion.p>
        </div>
      </section>

      {/* Offers Grid */}
      <main className="container mx-auto px-4 md:px-8 -mt-10 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-gray-100 pb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-serif font-black text-brand-dark uppercase tracking-wide">
                Active <span className="text-brand-pink">Curation</span>
              </h2>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                {offerProducts.length} Premium items on sale
              </p>
            </div>
            
            <div className="flex gap-2">
               <span className="px-4 py-2 bg-brand-pink/10 text-brand-pink text-[10px] font-black rounded-full uppercase tracking-widest">
                 Upto 40% Off
               </span>
               <span className="px-4 py-2 bg-brand-gold/10 text-brand-gold text-[10px] font-black rounded-full uppercase tracking-widest">
                 Flash Deals
               </span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {offerProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="group relative">
                  {/* Custom Discount Badge for Offers Page */}
                  <div className="absolute top-4 right-4 z-20 bg-brand-pink text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg transform group-hover:scale-110 transition-transform">
                    {product.discount} OFF
                  </div>
                  <ProductCard product={product} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Special Offer Banner */}
      <section className="container mx-auto px-4 md:px-8 mt-20">
         <div className="bg-brand-pink/5 border border-brand-pink/10 rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand-pink/10 rounded-full blur-3xl"></div>
            
            <div className="flex-1 text-center md:text-left relative z-10">
               <span className="text-brand-gold font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Membership Perk</span>
               <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-dark mb-6 leading-tight">
                  Join the <span className="text-brand-pink">Glow Circle</span> <br /> 
                  for Extra 10% Off
               </h2>
               <p className="text-gray-500 text-sm md:text-base mb-10 font-medium leading-relaxed max-w-lg">
                  Become a member today and unlock exclusive access to private sales, early launches, and a permanent 10% discount on all orders.
               </p>
               <button className="bg-brand-dark text-white px-10 py-4 rounded-none text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-brand-gold transition-all shadow-xl active:scale-95">
                  Sign Up For Glow
               </button>
            </div>
            
            <div className="w-full md:w-1/3 aspect-square bg-white rounded-2xl shadow-2xl p-4 flex items-center justify-center relative overflow-hidden group">
               <img 
                 src={imgRoseGold} 
                 alt="Membership Gift" 
                 className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-brand-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-[10px] font-black tracking-widest uppercase border border-white/40 px-6 py-2">Welcome Gift</span>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Offers;
