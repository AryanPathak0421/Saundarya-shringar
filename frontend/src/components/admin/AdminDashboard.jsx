import React from 'react';
import { motion } from 'framer-motion';
import AdminLayout from './AdminLayout';
import { 
  FiArrowUpRight, 
  FiPackage, 
  FiUsers, 
  FiLayers, 
  FiImage,
  FiPlus,
  FiMoreVertical,
  FiLogOut,
  FiClock,
  FiRotateCcw,
  FiAlertTriangle,
  FiHome,
  FiShoppingBag,
  FiTag
} from 'react-icons/fi';
import { HiCurrencyRupee } from 'react-icons/hi2';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { initialProducts } from '../../data/products';
import catSkincare from '../../assets/images/cat_skincare_new.png';
import catHaircare from '../../assets/images/cat_haircare_new.png';
import catMakeup from '../../assets/images/cat_makeup_new.png';
import catSoaps from '../../assets/images/cat_soaps.png';
import catJewellery from '../../assets/images/cat_jewellery.png';
import catInnerwear from '../../assets/images/cat_innerwear.png';
import catWellness from '../../assets/images/cat_wellness_new.png';
import catBeautyKits from '../../assets/images/cat_beautykits_new.png';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useShop();

  const categories = [
    { id: 'Skincare', name: 'Skincare', image: catSkincare },
    { id: 'Soaps', name: 'Soaps', image: catSoaps },
    { id: 'Makeup', name: 'Makeup', image: catMakeup },
    { id: 'Jewellery', name: 'Jewellery', image: catJewellery },
    { id: 'Innerwear', name: 'Innerwear', image: catInnerwear },
    { id: 'Haircare', name: 'Haircare', image: catHaircare },
    { id: 'Wellness', name: 'Wellness', image: catWellness },
    { id: 'Combos', name: 'Combos', image: catBeautyKits },
  ];

  const handleExport = () => {
    alert('Generating Inventory Vault Report... Download starting soon.');
  };

  const handleExit = () => {
    if (window.confirm('Securely terminating admin session. Proceed to exit?')) {
      setIsAuthenticated(false);
      setUser(null);
      navigate('/admin/login');
    }
  };

  const recentOrders = [
    { id: '#8821', customer: 'Ananya Sharma', product: initialProducts[0].name, date: '2 mins ago', status: 'Processing', amount: `₹${initialProducts[0].price}` },
    { id: '#8820', customer: 'Rahul Verma', product: initialProducts[1].name, date: '15 mins ago', status: 'Shipped', amount: `₹${initialProducts[1].price}` },
    { id: '#8819', customer: 'Priya Patel', product: initialProducts[2].name, date: '1 hour ago', status: 'Delivered', amount: `₹${initialProducts[2].price}` },
    { id: '#8818', customer: 'Sneha Gupta', product: initialProducts[3].name, date: '3 hours ago', status: 'Pending', amount: `₹${initialProducts[3].price}` },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-6">
      {/* Welcome Section */}
      <div className="pt-2">
        <h1 className="text-xl md:text-2xl font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-1">
          Store Overview
        </h1>
        <p className="text-gray-400 text-[9px] font-black uppercase tracking-[0.2em] opacity-70">
          Platform Analytics & Quick Controls
        </p>
      </div>

      {/* Quick Management Section */}
      <div className="space-y-3">
        <h3 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-1">QUICK MANAGEMENT</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { title: 'ADD PRODUCT', icon: <FiPlus />, color: 'bg-[#F1FDF8]', iconColor: 'text-[#50C878]', link: '/admin/products?add=true' },
            { title: 'CREATE COUPON', icon: <FiTag />, color: 'bg-[#FFF5F8]', iconColor: 'text-[#FF69B4]', link: '/admin/categories' },
            { title: 'PENDING ORDERS', icon: <FiClock />, color: 'bg-[#FFFBF2]', iconColor: 'text-[#FFB347]', link: '/admin/orders' },
            { title: 'CHECK RETURNS', icon: <FiRotateCcw />, color: 'bg-[#FEF5F5]', iconColor: 'text-[#FF5C5C]', link: '/admin/orders' },
            { title: 'STOCK ALERTS', icon: <FiAlertTriangle />, color: 'bg-[#FEF7F5]', iconColor: 'text-[#FF8C69]', link: '/admin/products' },
            { title: 'MANAGE SELLERS', icon: <FiHome />, color: 'bg-[#F2F9FF]', iconColor: 'text-[#4A90E2]', link: '/admin/users' },
          ].map((item, i) => (
            <Link to={item.link} key={i}>
              <motion.div 
                whileHover={{ y: -2 }}
                className={`${item.color} p-3 rounded-xl flex flex-col items-center justify-center gap-2 shadow-sm border border-black/5 cursor-pointer h-24`}
              >
                <div className={`p-1 rounded-lg ${item.iconColor}`}>
                  {React.cloneElement(item.icon, { size: 16 })}
                </div>
                <span className="text-[8px] font-black text-gray-700 uppercase tracking-wider text-center px-1 leading-tight">
                  {item.title}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { title: 'TOTAL USERS', value: '0', icon: <FiUsers />, iconBg: 'bg-[#E3F2FD]', iconColor: 'text-[#1976D2]', link: '/admin/users' },
          { title: 'TOTAL REVENUE', value: '₹0', icon: <HiCurrencyRupee />, iconBg: 'bg-[#E8F5E9]', iconColor: 'text-[#43A047]', link: '/admin/finance' },
          { title: 'TOTAL SELLERS', value: '0', icon: <FiHome />, iconBg: 'bg-[#F3E5F5]', iconColor: 'text-[#9C27B0]', link: '/admin/users' },
          { title: 'TOTAL ORDERS', value: '0', icon: <FiShoppingBag />, iconBg: 'bg-[#E1F5FE]', iconColor: 'text-[#039BE5]', link: '/admin/orders' },
          { title: 'PENDING ORDERS', value: '0', icon: <FiClock />, iconBg: 'bg-[#FFF3E0]', iconColor: 'text-[#FB8C00]', link: '/admin/orders' }
        ].map((stat, i) => (
          <Link to={stat.link} key={i}>
            <motion.div 
              whileHover={{ y: -2 }}
              className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer"
            >
              <div className="flex flex-col">
                <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{stat.title}</span>
                <span className="text-xl font-bold text-gray-800">{stat.value}</span>
              </div>
              <div className={`w-10 h-10 ${stat.iconBg} ${stat.iconColor} rounded-lg flex items-center justify-center shadow-inner`}>
                {React.cloneElement(stat.icon, { size: 18 })}
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-800">Revenue Analytics</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Growth vs Last Month: +24%</p>
            </div>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-blue-500"></span>
               <span className="text-[9px] font-bold text-gray-500 uppercase">Weekly</span>
            </div>
          </div>
          <div className="h-44 w-full relative">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 700 160">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4A90E2" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#4A90E2" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0, 40, 80, 120, 160].map(y => (
                <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="#F0F0F0" strokeWidth="1" strokeDasharray="4 4" />
              ))}
              <motion.path
                d="M0,130 Q100,60 200,100 T400,30 T700,50"
                fill="none" stroke="#4A90E2" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "easeInOut" }}
              />
              <motion.path
                d="M0,130 Q100,60 200,100 T400,30 T700,50 V160 H0 Z"
                fill="url(#chartGradient)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              />
              {[
                { x: 0, l: 'Mon' }, { x: 100, l: 'Tue' }, { x: 200, l: 'Wed' }, 
                { x: 300, l: 'Thu' }, { x: 400, l: 'Fri' }, { x: 500, l: 'Sat' }, 
                { x: 600, l: 'Sun' }, { x: 700, l: 'Next' }
              ].map((p, i) => (
                <text key={i} x={p.x} y="180" textAnchor="middle" className="text-[10px] fill-gray-400 font-bold uppercase">{p.l}</text>
              ))}
            </svg>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4">
          <h3 className="text-sm font-bold text-gray-800">Distribution</h3>
          <div className="flex-1 space-y-4 py-2">
            {[
              { name: 'SKINCARE', value: '75%', color: 'bg-teal-400' },
              { name: 'FRAGRANCE', value: '45%', color: 'bg-pink-400' },
              { name: 'WELLNESS', value: '60%', color: 'bg-purple-400' },
              { name: 'COMBOS', value: '30%', color: 'bg-amber-400' }
            ].map(cat => (
              <div key={cat.name} className="space-y-1.5">
                <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                  <span>{cat.name}</span>
                  <span>{cat.value}</span>
                </div>
                <div className="h-1.5 bg-gray-50 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: cat.value }} transition={{ duration: 1.5 }} className={`h-full ${cat.color}`} />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-2.5 text-[9px] font-bold uppercase tracking-widest text-[#4A90E2] border border-[#4A90E2]/10 rounded-xl hover:bg-blue-50 transition-colors">View reports</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-800">Recent Transactions</h3>
            <button className="text-[10px] font-bold text-[#4A90E2] uppercase tracking-wider">See all</button>
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-5 py-3 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="px-5 py-3 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Order ID</th>
                  <th className="px-5 py-3 text-[9px] font-bold text-gray-400 uppercase tracking-widest">Amount</th>
                  <th className="px-5 py-3 text-[9px] font-bold text-gray-400 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { name: 'Amit Sharma', id: '#9921', amount: '₹1,240', status: 'PAID', dot: 'bg-green-500' },
                  { name: 'Rahul V.', id: '#9920', amount: '₹890', status: 'PENDING', dot: 'bg-yellow-500' },
                  { name: 'Sneha P.', id: '#9919', amount: '₹2,100', status: 'PAID', dot: 'bg-green-500' },
                  { name: 'Vikki R.', id: '#9918', amount: '₹450', status: 'FAILED', dot: 'bg-red-500' }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/30 transition-colors">
                    <td className="px-5 py-3.5 flex items-center gap-2">
                       <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-500">{row.name[0]}</div>
                       <span className="text-xs font-bold text-gray-700">{row.name}</span>
                    </td>
                    <td className="px-5 py-3.5 text-xs font-bold text-gray-400 uppercase tracking-tighter">{row.id}</td>
                    <td className="px-5 py-3.5 text-xs font-bold text-gray-700">{row.amount}</td>
                    <td className="px-5 py-3.5 text-right">
                       <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8px] font-bold uppercase ${
                         row.status === 'PAID' ? 'bg-green-50 text-green-600' :
                         row.status === 'PENDING' ? 'bg-yellow-50 text-yellow-600' :
                         'bg-red-50 text-red-600'
                       }`}>
                         <span className={`w-1 h-1 rounded-full ${row.dot}`}></span>
                         {row.status}
                       </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Small Action List */}
        <div className="space-y-4">
           {/* Simulate and Manage buttons moved here or kept bottom */}
            <Link to="/admin/users" className="block">
              <motion.div 
                whileHover={{ scale: 0.98 }}
                className="bg-[#EEF2FF] rounded-2xl p-6 border border-blue-100/50 shadow-sm flex flex-col items-center justify-center text-center gap-3 group cursor-pointer hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm mb-1">
                  <FiHome size={24} />
                </div>
                <span className="text-[10px] font-black text-blue-900 uppercase tracking-[0.2em]">SIMULATE SELLER</span>
              </motion.div>
            </Link>
            <Link to="/admin/users" className="block">
              <motion.div 
                whileHover={{ scale: 0.98 }}
                className="bg-[#E0F7FA] rounded-2xl p-6 border border-cyan-100/50 shadow-sm flex flex-col items-center justify-center text-center gap-3 group cursor-pointer hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-cyan-600 shadow-sm mb-1">
                  <FiShoppingBag size={24} />
                </div>
                <span className="text-[10px] font-black text-cyan-900 uppercase tracking-[0.2em]">MANAGE SELLERS</span>
              </motion.div>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
