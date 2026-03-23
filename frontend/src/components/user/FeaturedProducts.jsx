import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const products = [
  {
    id: 1,
    name: 'Organic Mini Soap Trial',
    price: 50,
    oldPrice: 99,
    rating: 5,
    reviews: 1245,
    discount: '50%',
    image: '/cat_skincare_new.png',
  },
  {
    id: 2,
    name: 'Herbal Face Wash Sachet',
    price: 99,
    rating: 4,
    reviews: 890,
    image: '/cat_skincare_new.png',
  },
  {
    id: 3,
    name: 'TIRTIR Mask Fit Dual Concealer',
    price: 650,
    oldPrice: 1650,
    rating: 5,
    reviews: 560,
    discount: '60%',
    image: '/tirtir_concealer_stick.png',
  },
  {
    id: 4,
    name: 'Catkin Oriental Art Lipstick',
    price: 799,
    oldPrice: 1899,
    rating: 5,
    reviews: 342,
    discount: '58%',
    image: '/catkin_oriental_lipstick.png',
  },
  {
    id: 5,
    name: 'Verymiss Kiss Proof Trio + Kajal',
    price: 499,
    oldPrice: 999,
    rating: 4,
    reviews: 856,
    discount: '50%',
    image: '/verymiss_lipstick_set.png',
  },
  {
    id: 6,
    name: 'Rose Gold Eyeshadow Palette',
    price: 899,
    oldPrice: 3250,
    rating: 5,
    reviews: 840,
    discount: '72%',
    image: '/rose_gold_eyeshadow_palette.png',
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-8 bg-brand-pink/10">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-xl md:text-2xl font-serif font-bold mb-1 text-brand-dark uppercase tracking-wide">Featured Products</h2>
          <div className="w-16 h-1 bg-brand-gold mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
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
