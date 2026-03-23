import React, { useState } from 'react';
import { initialProducts } from '../../data/products';
import { 
  FiPackage, 
  FiAlertTriangle, 
  FiArrowUp, 
  FiArrowDown, 
  FiSearch, 
  FiFilter, 
  FiRefreshCw, 
  FiDatabase,
  FiShoppingBag,
  FiActivity
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const AdminInventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All'); // All, Low Stock, Out of Stock

  // Simulate stock data
  const inventoryItems = initialProducts.map(p => ({
    ...p,
    stock: Math.floor(Math.random() * 50),
    reserved: Math.floor(Math.random() * 5),
    warehouse: 'Primary Vault',
    lastUpdated: '2h ago'
  }));

  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.id.toString().includes(searchQuery);
    
    if (filter === 'Low Stock') return matchesSearch && item.stock < 10 && item.stock > 0;
    if (filter === 'Out of Stock') return matchesSearch && item.stock === 0;
    return matchesSearch;
  });

  const stats = [
    { title: 'Total SKUs', value: inventoryItems.length, icon: <FiPackage />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Critical Stock', value: inventoryItems.filter(i => i.stock < 5).length, icon: <FiAlertTriangle />, color: 'text-red-500', bg: 'bg-red-50' },
    { title: 'Units in Transit', value: '142', icon: <FiActivity />, color: 'text-brand-pink', bg: 'bg-brand-light' },
    { title: 'Vault Valuation', value: '₹12.4L', icon: <FiDatabase />, color: 'text-green-600', bg: 'bg-green-50' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-4">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-xl font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-1">
            Inventory Vault
          </h1>
          <p className="text-[8px] text-gray-400 font-black uppercase tracking-[0.2em]">Real-time Stock Audits & Warehousing</p>
        </div>
        <div className="flex items-center gap-2">
           <button className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-none border border-brand-pink/5 text-[8px] font-black uppercase tracking-widest shadow-sm hover:bg-brand-pink/[0.02] transition-colors">
              <FiRefreshCw /> REFRESH LIVE DATA
           </button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -2 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group cursor-default"
          >
            <div className="flex flex-col">
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{stat.title}</span>
              <span className="text-xl font-bold text-gray-800">{stat.value}</span>
            </div>
            <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}>
              {React.cloneElement(stat.icon, { size: 18 })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Inventory Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-3 border border-brand-pink/5 shadow-sm">
        <div className="flex items-center gap-2 w-full md:w-96">
          <div className="flex-1 bg-brand-light/20 border border-brand-pink/5 p-2 flex items-center gap-2 group focus-within:border-brand-pink/20 transition-all">
             <FiSearch size={14} className="text-gray-300" />
             <input 
              type="text" 
              placeholder="Filter by SKU or Product Name..." 
              className="bg-transparent border-none outline-none text-[9px] font-bold uppercase tracking-widest w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
             />
          </div>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 md:pb-0">
          {['All', 'Low Stock', 'Out of Stock'].map(f => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-[8px] font-black uppercase tracking-widest border transition-all ${filter === f ? 'bg-brand-dark text-white border-brand-dark' : 'bg-transparent text-gray-400 border-gray-100 hover:border-brand-pink/20'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white rounded-none border border-brand-pink/10 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-brand-dark text-white">
                <th className="px-6 py-4 text-[8px] font-black uppercase tracking-[0.2em]">Asset info</th>
                <th className="px-6 py-4 text-[8px] font-black uppercase tracking-[0.2em]">Warehouse</th>
                <th className="px-6 py-4 text-[8px] font-black uppercase tracking-[0.2em]">Stock Level</th>
                <th className="px-6 py-4 text-[8px] font-black uppercase tracking-[0.2em]">Reserved</th>
                <th className="px-6 py-4 text-[8px] font-black uppercase tracking-[0.2em] text-right">Valuation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-pink/5">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-brand-light/10 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-light/20 p-1 border border-brand-pink/5 shrink-0 relative">
                        <img src={item.image} alt="" className="w-full h-full object-contain mix-blend-multiply opacity-80" />
                        {item.stock < 10 && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full animate-ping" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black text-brand-dark uppercase truncate max-w-[180px] leading-tight mb-1">{item.name}</h4>
                        <div className="flex items-center gap-2">
                           <span className="text-[7px] font-black text-brand-pink uppercase">ID: {item.id}</span>
                           <span className="w-1 h-1 bg-gray-200 rounded-full" />
                           <span className="text-[7px] font-medium text-gray-400">CAT: {item.category}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[9px] font-bold text-gray-500 uppercase tracking-widest">{item.warehouse}</td>
                  <td className="px-6 py-4">
                    <div className="space-y-1.5 min-w-[120px]">
                      <div className="flex justify-between items-center text-[8px] font-black uppercase">
                        <span className={item.stock < 10 ? 'text-red-500' : 'text-gray-400'}>{item.stock} Units</span>
                        <span className="text-gray-300">Available</span>
                      </div>
                      <div className="h-1 bg-gray-100 rounded-none overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (item.stock / 50) * 100)}%` }}
                          className={`h-full ${item.stock < 10 ? 'bg-red-500' : 'bg-brand-pink'}`}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none">
                    {item.reserved} <span className="text-[7px] font-medium opacity-50 ml-1">UNITS</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="text-[11px] font-black text-brand-dark">₹{item.price * item.stock}</p>
                    <p className="text-[7px] text-gray-400 uppercase tracking-tighter mt-1">Retail Est.</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredItems.length === 0 && (
          <div className="p-20 text-center">
             <div className="text-gray-200 mb-4 flex justify-center"><FiShoppingBag size={48} /></div>
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">No Assets Found In Current Audit</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInventory;
