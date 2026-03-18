import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import imgTirtirRed from '../../assets/products/tirtir_red_cushion.png';
import imgTirtirPink from '../../assets/products/tirtir_pink_cushion.png';
import imgTirtirConcealer from '../../assets/products/tirtir_concealer_stick.png';
import imgCatkin from '../../assets/products/catkin_oriental_lipstick.png';
import imgVerymiss from '../../assets/products/verymiss_lipstick_set.png';
import imgRoseGold from '../../assets/products/rose_gold_eyeshadow_palette.png';

const products = [
  {
    id: 1,
    name: 'TIRTIR Mask Fit Red Cushion',
    price: 2899,
    oldPrice: 3499,
    rating: 5,
    reviews: 1245,
    discount: '17%',
    image: imgTirtirRed,
  },
  {
    id: 2,
    name: 'TIRTIR Mask Fit All Cover (Pink)',
    price: 2450,
    rating: 4,
    reviews: 890,
    image: imgTirtirPink,
  },
  {
    id: 3,
    name: 'TIRTIR Mask Fit Dual Concealer',
    price: 1650,
    oldPrice: 1950,
    rating: 5,
    reviews: 560,
    discount: '15%',
    image: imgTirtirConcealer,
  },
  {
    id: 4,
    name: 'Catkin Oriental Art Lipstick',
    price: 1899,
    oldPrice: 2200,
    rating: 5,
    reviews: 342,
    discount: '15%',
    image: imgCatkin,
  },
  {
    id: 5,
    name: 'Verymiss Kiss Proof Trio + Kajal',
    price: 999,
    oldPrice: 1499,
    rating: 4,
    reviews: 856,
    discount: '33%',
    image: imgVerymiss,
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
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-10 md:py-12 bg-brand-pink/10">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-4"
        >
          <h2 className="text-lg md:text-xl font-serif font-bold mb-1 text-brand-dark uppercase tracking-wide">Featured Products</h2>
          <p className="text-gray-500 max-w-lg mx-auto font-medium text-[10px] md:text-xs">Discover our curated selection of premium organic beauty essentials.</p>
          <div className="w-12 h-1 bg-brand-gold mx-auto mt-2"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/shop" className="inline-block border-2 border-brand-dark text-brand-dark px-10 py-3 rounded-none text-[10px] font-black uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-all duration-300 shadow-xl active:scale-95">
            Explore All Creations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
