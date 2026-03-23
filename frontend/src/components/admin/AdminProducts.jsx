import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { initialProducts } from '../../data/products';
import { 
  FiPlus, 
  FiSearch, 
  FiEdit2, 
  FiTrash2, 
  FiMoreVertical, 
  FiX, 
  FiImage, 
  FiChevronDown, 
  FiFilter, 
  FiStar, 
  FiArrowLeft,
  FiUploadCloud
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, Link } from 'react-router-dom';

const AdminProducts = () => {
  const [searchParams] = useSearchParams();
  const [isAdding, setIsAdding] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [filter, setFilter] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Handle Filtering and Searching
  const filteredProducts = products.filter(p => {
    // Category Filter
    const matchesFilter = filter === 'All Categories' || p.category === filter;
    
    // Search Query (Name, ID, or direct price match)
    const searchLower = searchQuery.toLowerCase().trim();
    const nameMatch = (p.name || '').toLowerCase().includes(searchLower);
    const skuMatch = String(p.id).toLowerCase().includes(searchLower);
    const priceMatch = searchQuery !== '' && String(p.price).includes(searchLower);
    const matchesSearch = searchQuery === '' || nameMatch || skuMatch || priceMatch;
    
    // Range Filters
    const pPrice = Number(p.price);
    const min = minPrice !== '' ? Number(minPrice) : -Infinity;
    const max = maxPrice !== '' ? Number(maxPrice) : Infinity;
    
    const matchesMinPrice = pPrice >= min;
    const matchesMaxPrice = pPrice <= max;
    
    return matchesFilter && matchesSearch && matchesMinPrice && matchesMaxPrice;
  });

  const handleDelete = (id) => {
    if (window.confirm('Remove this product from catalog?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    setIsAdding(false);
    alert('Product details saved to vault.');
  };

  useEffect(() => {
    if (searchParams.get('add') === 'true') {
      setIsAdding(true);
    }
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto space-y-5 pb-10">
      <AnimatePresence mode="wait">
        {!isAdding ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="space-y-5"
          >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 tracking-tight mb-1">
                  PRODUCTS
                </h1>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider leading-none">
                  MANAGE YOUR INVENTORY, PRICING, AND PRODUCT DETAILS.
                </p>
              </div>
              
              <button 
                onClick={() => setIsAdding(true)}
                className="bg-[#3D2522] text-white px-6 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg shadow-black/10 hover:bg-black transition-all"
              >
                <FiPlus size={16} /> Add New Product
              </button>
            </div>

            {/* Compact Filter Bar */}
            <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-sm flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[200px] relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" size={14} />
                <input 
                  type="text" 
                  placeholder="Search products by name..." 
                  className="w-full bg-gray-50 border border-transparent focus:border-gray-200 rounded-lg pl-9 pr-4 py-2 text-[11px] font-medium outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <select 
                  className="bg-gray-50 border border-transparent focus:border-gray-200 rounded-lg px-3 py-2 text-[11px] font-bold outline-none cursor-pointer"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  {['All Categories', 'Skincare', 'Soaps', 'Wellness', 'Makeup'].map(c => <option key={c}>{c}</option>)}
                </select>

                <button 
                  onClick={() => { setFilter('All Categories'); setSearchQuery(''); setMinPrice(''); setMaxPrice(''); }}
                  className="bg-gray-50 border border-transparent hover:border-gray-200 rounded-lg px-4 py-2 text-[11px] font-bold text-gray-600 transition-all"
                >
                  All
                </button>

                <div className="flex items-center gap-1 bg-gray-50 border border-transparent rounded-lg px-2 py-1">
                  <span className="text-[10px] text-gray-400 font-bold px-1">₹</span>
                  <input 
                    type="number" 
                    placeholder="Min" 
                    className="w-12 bg-transparent border-none outline-none text-[11px] font-bold"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span className="text-gray-300">-</span>
                  <input 
                    type="number" 
                    placeholder="Max" 
                    className="w-12 bg-transparent border-none outline-none text-[11px] font-bold"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>

                <div className="relative group">
                  <button className="bg-white border border-gray-100 rounded-lg px-4 py-2 text-[11px] font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all">
                    <FiFilter size={14} className="text-gray-400" />
                    Bulk Actions
                    <FiChevronDown size={12} className="text-gray-300" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Table - High Density */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">PRODUCT NAME</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">CATEGORY</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">PLACEMENT</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">PRICE</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">STOCK</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">RATING</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 p-1 flex-shrink-0">
                            <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-gray-800 group-hover:text-[#3D2522] transition-colors">{p.name || 'Saffron Gold Cream'}</span>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">SKU-{String(p.id).toUpperCase()}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-gray-600">{p.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 bg-gray-50 text-gray-400 text-[9px] font-bold uppercase rounded leading-none">{p.subCategory || 'General'}</span>
                          {p.flashSale && (
                            <span className="px-2 py-0.5 bg-[#FFF5F6] text-[#E8B4B8] text-[9px] font-bold uppercase rounded leading-none">Flash Sale</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-gray-800">₹{p.price}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex px-2 py-1 rounded-lg text-[9px] font-bold uppercase leading-none ${p.stock > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                          {p.stock > 0 ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 font-bold text-xs">
                          <FiStar size={12} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-gray-800">4.5</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="add"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Create Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                 <button 
                  onClick={() => setIsAdding(false)}
                  className="w-9 h-9 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-800 hover:shadow-md transition-all shadow-sm"
                 >
                   <FiArrowLeft size={16} />
                 </button>
                <div>
                  <h1 className="text-xl font-bold text-gray-800 tracking-tight mb-0.5">
                    CREATE NEW PRODUCT
                  </h1>
                  <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider leading-none">
                    SETUP YOUR PRODUCT DETAILS
                  </p>
                </div>
              </div>
              
              <button 
                onClick={handleSaveProduct}
                className="bg-[#3D2522] text-white px-7 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg shadow-black/10 hover:bg-black transition-all"
              >
                <FiPlus size={16} /> Publish Product
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left Column: Visuals & Labels */}
              <div className="lg:col-span-4 space-y-4">
                {/* Visual Gallery */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                  <h3 className="text-[9px] font-bold text-gray-800 uppercase tracking-wider">Visual Gallery (Max 5)</h3>
                  <div className="aspect-[4/3] bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 group hover:border-[#3D2522] cursor-pointer transition-all">
                     <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-300 group-hover:text-[#3D2522] transition-colors">
                        <FiUploadCloud size={20} />
                     </div>
                     <span className="text-[9px] text-gray-400 font-bold">Add Shot</span>
                  </div>
                </div>

                {/* Card Display Labels */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                   <h3 className="text-[9px] font-bold text-gray-800 uppercase tracking-wider">Card Display Labels</h3>
                   <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-gray-400 lowercase italic">Status Label (Left)</label>
                        <input type="text" placeholder="e.g. RUNNING SALE" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[10px] font-bold outline-none focus:border-gray-300 transition-all uppercase" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-gray-400 lowercase italic">Corner Badge (Right)</label>
                        <input type="text" placeholder="e.g. NEW ARRIVAL" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[10px] font-bold outline-none focus:border-gray-300 transition-all uppercase" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-gray-400 lowercase italic">Stock Marker (Bottom)</label>
                        <input type="text" placeholder="e.g. ⚡ LIMITED STOCK" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[10px] font-bold outline-none focus:border-gray-300 transition-all uppercase" />
                      </div>
                   </div>
                </div>
              </div>

              {/* Right Column: Core Info */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <h3 className="text-[9px] font-bold text-gray-800 uppercase tracking-wider">Core Information</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500">Product Title</label>
                      <input type="text" placeholder="e.g. Gold Floral Ring" className="w-full bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 text-[13px] font-bold outline-none focus:border-gray-300 transition-all" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                         <label className="text-[10px] font-bold text-gray-500">PRODUCT CATEGORY <span className="text-red-500">*</span></label>
                         <span className="text-[8px] text-gray-400 font-bold bg-gray-50 px-1.5 py-0.5 rounded uppercase">Required</span>
                      </div>
                      <div className="bg-gray-50/50 border border-gray-100 rounded-lg p-4 space-y-2">
                         <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">MAIN CATEGORY</label>
                         <div className="relative">
                            <select className="w-full bg-white border border-gray-100 rounded-lg px-3 py-2 text-xs font-bold outline-none focus:border-gray-300 transition-all appearance-none cursor-pointer">
                               <option>Select Category</option>
                               <option>Skincare</option>
                               <option>Makeup</option>
                               <option>Wellness</option>
                            </select>
                            <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                         </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                  <h3 className="text-[9px] font-bold text-gray-800 uppercase tracking-wider">Navigation Placement</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                     {['SKINCARE', 'MAKEUP', 'SOAPS', 'WELLNESS', 'JEWELLERY', 'INNERWEAR', 'HAIRCARE', 'COMBOS'].map(tag => (
                       <button key={tag} type="button" className="py-2 px-1.5 bg-gray-50 hover:bg-gray-100 border border-transparent hover:border-gray-200 text-[8px] font-bold text-gray-400 hover:text-brand-pink rounded-lg transition-all uppercase tracking-widest leading-none">{tag}</button>
                     ))}
                  </div>
                </div>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminProducts;
