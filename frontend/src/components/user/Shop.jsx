import React, { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiChevronDown, FiGrid, FiList, FiCheck, FiFilter, FiX } from 'react-icons/fi';

// Assets
import imgTirtirRed from '../../assets/products/tirtir_red_cushion.png';
import imgTirtirPink from '../../assets/products/tirtir_pink_cushion.png';
import imgTirtirConcealer from '../../assets/products/tirtir_concealer_stick.png';
import imgCatkin from '../../assets/products/catkin_oriental_lipstick.png';
import imgVerymiss from '../../assets/products/verymiss_lipstick_set.png';
import imgRoseGold from '../../assets/products/rose_gold_eyeshadow_palette.png';
import imgLakmePowder from '../../assets/products/lakme_face_powder.png';
import imgLipGloss from '../../assets/products/plumping_lip_gloss.png';
import imgMascara from '../../assets/products/volumizing_mascara.png';
import imgLipstick from '../../assets/products/lakme_2_in_1_lipstick.png';
import imgHighlighter from '../../assets/products/liquid_highlighter.png';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'skincare', name: 'Skincare' },
  { id: 'haircare', name: 'Haircare' },
  { id: 'makeup', name: 'Makeup' },
  { id: 'bath & body', name: 'Bath & Body' },
  { id: 'organic wellness', name: 'Organic Wellness' },
  { id: 'beauty kits', name: 'Beauty Kits' },
  { id: 'fragrances', name: 'Fragrances' },
  { id: 'essential oils', name: 'Essential Oils' },
];

const subCategoriesMap = {
  skincare: ['Cleanser', 'Face Wash', 'Toner', 'Serum', 'Moisturizer', 'Sunscreen', 'Face Oil', 'Face Mask'],
  haircare: ['Shampoo', 'Conditioner', 'Hair Mask', 'Hair Oil', 'Serum'],
  makeup: ['Foundation', 'Compact', 'Lipstick', 'Lip Balm', 'Kajal / Eyeliner', 'Mascara', 'Blush', 'Highlighter'],
  'bath & body': ['Body Wash', 'Body Scrub', 'Hand Cream', 'Foot Cream', 'Soap'],
  'organic wellness': ['Supplements', 'Herbal Tea', 'Detox Kits'],
  'beauty kits': ['Festive Combos', 'Bridal Kits', 'Travel Sets'],
  fragrances: ['Perfume', 'Body Mist', 'Attar', 'Scented Candles'],
  'essential oils': ['Pure Oils', 'Blended Oils', 'Diffusers'],
};

const initialProducts = [
  // --- SKINCARE ---
  {
    id: 1,
    name: 'Hydrating Cleanser',
    price: 850,
    rating: 5,
    reviews: 120,
    image: imgTirtirPink,
    category: 'skincare',
    subCategory: 'Cleanser',
    description: 'Gentle hydration for a fresh reset.',
    label: 'Bestseller',
    skinType: 'Dry',
    concern: 'Dryness'
  },
  {
    id: 101,
    name: 'Purifying Foam Wash',
    price: 550,
    rating: 4,
    reviews: 89,
    image: imgTirtirConcealer,
    category: 'skincare',
    subCategory: 'Face Wash',
    description: 'Deep pore cleansing with tea tree.',
    skinType: 'Oily',
    concern: 'Acne'
  },
  {
    id: 102,
    name: 'Rose Water Toner',
    price: 450,
    rating: 5,
    reviews: 210,
    image: imgLipstick,
    category: 'skincare',
    subCategory: 'Toner',
    description: 'Pore tightening floral mist.',
    skinType: 'Sensitive',
    concern: 'Glow'
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
    subCategory: 'Serum',
    description: 'Pure Vitamin C for an instant radiance.',
    label: 'New',
    skinType: 'Combination',
    concern: 'Pigmentation'
  },
  {
    id: 104,
    name: 'Deep Sea Moisturizer',
    price: 1250,
    rating: 4,
    reviews: 167,
    image: imgTirtirPink,
    category: 'skincare',
    subCategory: 'Moisturizer',
    description: '24-hour hydration lock.',
    skinType: 'Dry',
    concern: 'Dryness'
  },
  {
    id: 105,
    name: 'Invisible Sunscreen SPF 50',
    price: 950,
    rating: 5,
    reviews: 340,
    image: imgLakmePowder,
    category: 'skincare',
    subCategory: 'Sunscreen',
    description: 'Ultra-light protection with zero white cast.',
    skinType: 'All',
    concern: 'Anti-aging'
  },
  {
    id: 106,
    name: 'Kumkumadi Face Oil',
    price: 2450,
    rating: 5,
    reviews: 567,
    image: imgHighlighter,
    category: 'skincare',
    subCategory: 'Face Oil',
    description: 'The miracle elixir for overnight glow.',
    label: 'Limited Edition',
    skinType: 'All',
    concern: 'Glow'
  },
  {
    id: 107,
    name: 'Saffron & Honey Mask',
    price: 899,
    rating: 5,
    reviews: 123,
    image: imgRoseGold,
    category: 'skincare',
    subCategory: 'Face Mask',
    description: 'Traditional detox for tired skin.',
    skinType: 'All',
    concern: 'Glow'
  },

  // --- HAIRCARE ---
  {
    id: 151,
    name: 'Onion Hair Oil',
    price: 599,
    rating: 5,
    reviews: 890,
    image: imgVerymiss,
    category: 'haircare',
    subCategory: 'Hair Oil',
    description: 'Strengthens roots and reduces hair fall.',
    label: 'Bestseller'
  },
  {
    id: 152,
    name: 'Argan Serum',
    price: 850,
    rating: 4,
    reviews: 320,
    image: imgTirtirConcealer,
    category: 'haircare',
    subCategory: 'Serum',
    description: 'Smooth and frizz-free locks.'
  },

  // --- MAKEUP ---
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
    subCategory: 'Foundation',
    description: 'Breathable HD coverage.',
    label: 'Bestseller'
  },
  {
    id: 202,
    name: 'Velvet Matte Compact',
    price: 750,
    rating: 4,
    reviews: 450,
    image: imgTirtirRed,
    category: 'makeup',
    subCategory: 'Compact',
    description: 'Weightless touch-up for all-day matte.'
  },
  {
    id: 203,
    name: 'Imperial Red Lipstick',
    price: 1599,
    rating: 5,
    reviews: 1200,
    image: imgCatkin,
    category: 'makeup',
    subCategory: 'Lipstick',
    description: 'Carved art meets intense pigment.',
    label: 'Bestseller'
  },
  {
    id: 204,
    name: 'Petal Soft Lip Balm',
    price: 350,
    rating: 5,
    reviews: 230,
    image: imgLipstick,
    category: 'makeup',
    subCategory: 'Lip Balm',
    description: 'Organic tint with cocoa butter.'
  },
  {
    id: 205,
    name: 'Midnight Kajal Pencil',
    price: 450,
    rating: 4,
    reviews: 980,
    image: imgTirtirConcealer,
    category: 'makeup',
    subCategory: 'Kajal / Eyeliner',
    description: 'Smudge-proof 24-hour intense black.'
  },
  {
    id: 206,
    name: 'Volumizing Power Mascara',
    price: 999,
    rating: 5,
    reviews: 1500,
    image: imgMascara,
    category: 'makeup',
    subCategory: 'Mascara',
    description: 'Infinite length and lift.'
  },
  {
    id: 207,
    name: 'Peachy Glow Blush',
    price: 850,
    rating: 4,
    reviews: 320,
    image: imgHighlighter,
    category: 'makeup',
    subCategory: 'Blush',
    description: 'Natural flush of color.'
  },
  {
    id: 208,
    name: 'Divine Shine Highlighter',
    price: 1250,
    rating: 5,
    reviews: 670,
    image: imgHighlighter,
    category: 'makeup',
    subCategory: 'Highlighter',
    description: 'Liquid starlight for high points.',
    label: 'New'
  },

  // --- BATH & BODY ---
  {
    id: 251,
    name: 'Lavender Body Wash',
    price: 450,
    rating: 5,
    reviews: 210,
    image: imgTirtirPink,
    category: 'bath & body',
    subCategory: 'Body Wash',
    description: 'Calming floral escape.'
  },

  // --- ORGANIC WELLNESS ---
  {
    id: 301,
    name: 'Ashwagandha Drops',
    price: 1250,
    rating: 5,
    reviews: 89,
    image: imgVerymiss,
    category: 'organic wellness',
    subCategory: 'Supplements',
    description: 'Stress relief with pure roots.'
  },

  // --- BEAUTY KITS ---
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
    subCategory: 'Bridal Kits',
    description: 'Complete glow ritual for your big day.'
  },

  // --- FRAGRANCES ---
  {
    id: 401,
    name: 'Oud Majesty Perfume',
    price: 3450,
    rating: 5,
    reviews: 120,
    image: imgLipGloss,
    category: 'fragrances',
    subCategory: 'Perfume',
    description: 'Mystical woods in a royal bottle.'
  },

  // --- ESSENTIAL OILS ---
  {
    id: 451,
    name: 'Tea Tree Pure Oil',
    price: 650,
    rating: 5,
    reviews: 890,
    image: imgTirtirConcealer,
    category: 'essential oils',
    subCategory: 'Pure Oils',
    description: 'Organic purity for flawless skin.'
  }
];

import { useSearchParams } from 'react-router-dom';

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCategory = searchParams.get('category') || 'all';
  const urlSort = searchParams.get('sort') || 'New Arrivals';

  const [activeCategory, setActiveCategory] = useState(urlCategory);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [sortBy, setSortBy] = useState(urlSort);

  // Sync state with URL when it changes
  useEffect(() => {
    setActiveCategory(urlCategory);
    setSortBy(urlSort);
  }, [urlCategory, urlSort]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setActiveSubCategory(null);
    setSearchParams({ category: catId, sort: sortBy });
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setIsSortOpen(false);
    setSearchParams({ category: activeCategory, sort: newSort });
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Advanced Filters State
  const [skinTypeFilter, setSkinTypeFilter] = useState('All');
  const [concernFilter, setConcernFilter] = useState('All');
  const [priceRange, setPriceRange] = useState(5000);

  const sortRef = useRef(null);
  const sortOptions = ['Top Rated', 'Price: Low to High', 'Price: High to Low', 'New Arrivals'];

  // Handle outside click for sorting
  useEffect(() => {
    const handleClick = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) setIsSortOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Filter Logic
  const filteredProducts = initialProducts.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSubCategory = !activeSubCategory || p.subCategory === activeSubCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.subCategory?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkin = skinTypeFilter === 'All' || p.skinType === skinTypeFilter || p.skinType === 'All';
    const matchesConcern = concernFilter === 'All' || p.concern === concernFilter;
    const matchesPrice = p.price <= priceRange;

    return matchesCategory && matchesSubCategory && matchesSearch && matchesSkin && matchesConcern && matchesPrice;
  }).sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    if (sortBy === 'Top Rated') return b.rating - a.rating;
    return b.id - a.id; // New Arrivals
  });

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans selection:bg-brand-pink selection:text-white pb-20">
      
      {/* Header - Compact Editorial */}
      <header className="bg-gradient-to-b from-brand-pink/5 to-transparent pt-10 pb-6 text-center">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[8px] md:text-[9px] mb-2 block">Premium Discovery</span>
            <h1 className="text-3xl md:text-5xl font-serif font-black text-[#5C2E3E] leading-[0.9] tracking-tight">
              Soundarya <span className="text-brand-pink italic">Curation</span>
            </h1>
            <div className="w-12 h-1 bg-brand-gold mx-auto mt-4 rounded-full"></div>
          </motion.div>
        </div>
      </header>

      {/* STICKY TOOLBAR: Category & Sub-Category */}
      <div className="sticky top-[60px] md:top-[72px] z-40 bg-white/70 backdrop-blur-xl border-y border-gray-100 shadow-sm">
        <div className="container mx-auto px-0 md:px-8">
          
          {/* Main Categories - Balanced scrolling */}
          <div className="flex items-center lg:justify-center space-x-1.5 py-4 border-b border-gray-50 overflow-x-auto no-scrollbar px-4 lg:px-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`relative whitespace-nowrap px-5 py-2 rounded-full text-[9px] md:text-[11px] font-bold tracking-[0.2em] transition-all uppercase ${
                  activeCategory === cat.id 
                  ? 'bg-[#5C2E3E] text-white shadow-lg' 
                  : 'text-[#5C2E3E]/50 hover:text-brand-pink bg-brand-pink/5'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sub-Category Chips - Dynamic & Scrollable */}
          <AnimatePresence mode="wait">
            {activeCategory !== 'all' && subCategoriesMap[activeCategory] && (
              <motion.div 
                key={activeCategory}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-center space-x-2 py-3 overflow-x-auto no-scrollbar px-4 lg:px-0"
              >
                <button
                  onClick={() => setActiveSubCategory(null)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[9px] font-bold tracking-widest uppercase border transition-all ${
                    !activeSubCategory 
                    ? 'bg-brand-pink border-brand-pink text-white shadow-sm' 
                    : 'border-gray-200 text-[#5C2E3E]/40 hover:border-brand-pink/30'
                  }`}
                >
                  ALL ITEMS
                </button>
                {subCategoriesMap[activeCategory].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setActiveSubCategory(sub)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[9px] font-bold tracking-widest uppercase border transition-all ${
                      activeSubCategory === sub 
                      ? 'bg-brand-pink border-brand-pink text-white shadow-sm' 
                      : 'border-gray-200 text-[#5C2E3E]/40 hover:border-brand-pink/30'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* FILTER & SORT SECTION */}
      <div className="container mx-auto px-4 md:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b border-gray-100">
          
          <div className="flex items-center gap-3">
             <button 
               onClick={() => setIsFilterOpen(!isFilterOpen)}
               className={`flex items-center gap-2 px-5 py-2 rounded-full text-[9px] font-bold tracking-widest uppercase border transition-all ${
                 isFilterOpen ? 'bg-brand-gold border-brand-gold text-white' : 'border-gray-100 text-[#5C2E3E]/60 hover:border-brand-gold/30'
               }`}
             >
               <FiFilter /> Smart Filters
             </button>
             <div className="relative group">
               <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
               <input 
                 type="text" 
                 placeholder="Search products..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="pl-10 pr-4 py-2 bg-white border border-gray-100 rounded-full text-[10px] w-48 transition-all focus:border-brand-pink/30 outline-none placeholder:italic"
               />
             </div>
          </div>

          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-3 px-5 py-2 bg-white border border-gray-100 rounded-full text-[9px] font-bold tracking-widest text-[#5C2E3E] uppercase"
            >
              Sort by: <span className="text-brand-pink underline">{sortBy}</span>
              <FiChevronDown />
            </button>
            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 p-1"
                >
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSortChange(opt)}
                      className={`w-full text-left px-4 py-2.5 text-[9px] font-bold tracking-widest rounded-lg transition-colors ${
                        sortBy === opt ? 'bg-brand-pink/10 text-brand-pink' : 'hover:bg-gray-50 text-[#5C2E3E]/60'
                      }`}
                    >
                      {opt.toUpperCase()}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Filter Drawer / Accordion */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden bg-[#F9F6F4] rounded-2xl p-6 mt-4 border border-gray-100 flex flex-wrap gap-8"
            >
                <div className="space-y-3 w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5C2E3E]">Skin Type</h4>
                  <div className="flex gap-2 overflow-x-auto flex-nowrap no-scrollbar pb-1">
                    {['All', 'Dry', 'Oily', 'Combination', 'Sensitive'].map(t => (
                      <button 
                        key={t}
                        onClick={() => setSkinTypeFilter(t)}
                        className={`whitespace-nowrap px-4 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all ${
                          skinTypeFilter === t ? 'bg-[#5C2E3E] text-white' : 'bg-white border text-gray-400'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 w-full">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5C2E3E]">Skin Concern</h4>
                  <div className="flex gap-2 overflow-x-auto flex-nowrap no-scrollbar pb-1">
                    {['All', 'Acne', 'Pigmentation', 'Anti-aging', 'Dryness', 'Glow'].map(c => (
                      <button 
                        key={c}
                        onClick={() => setConcernFilter(c)}
                        className={`whitespace-nowrap px-4 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all ${
                          concernFilter === c ? 'bg-[#5C2E3E] text-white' : 'bg-white border text-gray-400'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 min-w-[200px]">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5C2E3E]">Price Range</h4>
                    <span className="text-[9px] font-bold text-brand-gold">UP TO ₹{priceRange}</span>
                  </div>
                  <input 
                    type="range" min="500" max="5000" step="100" 
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                  />
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* PRODUCT GRID */}
      <main className="container mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <p className="text-[9px] text-gray-400 font-bold tracking-widest uppercase flex items-center gap-2">
            Discovering <span className="text-brand-pink">{filteredProducts.length}</span> curated treasures
            <span className="h-[1px] w-12 bg-gray-100"></span>
          </p>
        </div>

        <motion.div layout className="grid grid-cols-2 lg:grid-cols-4 border-t border-l border-gray-100 bg-gray-50/10">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div key={product.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <h3 className="text-xl font-serif font-black text-[#5C2E3E] mb-2 opacity-30 italic">"Glow not found..."</h3>
            <p className="text-[10px] text-gray-400 mb-6 uppercase tracking-widest">Adjust filters to find your match</p>
            <button 
              onClick={() => {setSearchQuery(''); setSkinTypeFilter('All'); setConcernFilter('All'); setActiveCategory('all'); setPriceRange(5000);}}
              className="px-8 py-3 bg-[#5C2E3E] text-white text-[9px] font-bold uppercase tracking-[0.3em] rounded-full shadow-lg"
            >
              Clear All Discovery
            </button>
          </div>
        )}
      </main>

      {/* COMPACT CONSULTATION CTA */}
      <section className="container mx-auto px-4 md:px-8 py-10">
        <div className="bg-[#5C2E3E] rounded-[2.5rem] p-8 md:p-12 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-brand-pink opacity-0 group-hover:opacity-5 transition-opacity duration-1000"></div>
          <div className="relative z-10 max-w-lg mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-black text-white mb-4 leading-tight italic">
              Divine <span className="text-brand-gold">Personalization</span>
            </h2>
            <p className="text-white/60 text-[10px] md:text-xs mb-8 font-serif leading-relaxed px-4">
              Connect with our master consultants for a bespoke organic curation tailored to your unique skin essence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button className="w-full sm:w-auto bg-brand-gold text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[9px] shadow-2xl hover:bg-white hover:text-brand-gold transition-all">
                Book Ritual
              </button>
              <button className="w-full sm:w-auto bg-white/5 text-white backdrop-blur-md px-8 py-3 rounded-full font-bold uppercase tracking-widest text-[9px] border border-white/10">
                WhatsApp Chat
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
