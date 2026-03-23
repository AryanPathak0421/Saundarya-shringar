import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { FiSearch, FiUser, FiMail, FiPhone, FiDollarSign, FiShoppingBag, FiArrowLeft, FiClock, FiStar, FiFilter, FiTrendingUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const AdminUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [userList, setUserList] = useState([
    {
      id: 'USR-001',
      name: 'Aditi Sharma',
      email: 'aditi@example.com',
      phone: '9876543210',
      totalSpent: '₹14,500',
      orderCount: 12,
      lastLogin: '2 hours ago',
      joinDate: 'Jan 2024',
      status: 'Active',
      level: 'Gold Customer',
      recentOrders: [
        { id: '#8821', date: '20 Mar', amount: '₹1,250', status: 'Delivered' },
        { id: '#8752', date: '05 Mar', amount: '₹2,400', status: 'Delivered' },
        { id: '#8611', date: '12 Feb', amount: '₹4,100', status: 'Delivered' }
      ]
    },
    {
      id: 'USR-002',
      name: 'Rahul Verma',
      email: 'rahul.v@example.com',
      phone: '8839044030',
      totalSpent: '₹8,200',
      orderCount: 8,
      lastLogin: '5 mins ago',
      joinDate: 'Feb 2024',
      status: 'Active',
      level: 'Regular',
      recentOrders: [
        { id: '#8820', date: '19 Mar', amount: '₹3,400', status: 'In Transit' }
      ]
    },
    {
       id: 'USR-003',
       name: 'Trisha Mishra',
       email: 'trisha@example.com',
       phone: '8839044031',
       totalSpent: '₹25,000',
       orderCount: 22,
       lastLogin: '1 min ago',
       joinDate: 'Dec 2023',
       status: 'Active',
       level: 'Platinum',
       recentOrders: [
         { id: '#8900', date: '20 Mar', amount: '₹5,000', status: 'Processing' }
       ]
    }
  ]);

  const filteredUsers = userList.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteUser = (id) => {
    if (window.confirm('Securely terminate this user account and revoke all access?')) {
      setUserList(userList.filter(u => u.id !== id));
      setSelectedUser(null);
    }
  };

  const handleAction = (type) => {
    alert(`${type} protocol initiated for ${selectedUser?.name || 'user'}. Synchronizing secure databases.`);
  };

  if (selectedUser) {
    return (
      <div className="max-w-7xl mx-auto space-y-3 pb-8 font-serif">
        <div className="flex justify-between items-center mb-1">
          <button 
            onClick={() => setSelectedUser(null)}
            className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-brand-dark/40 hover:text-brand-pink transition-all"
          >
            <FiArrowLeft /> Back to Directory
          </button>
          <button 
            onClick={() => handleDeleteUser(selectedUser.id)}
            className="text-[9px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-all flex items-center gap-2"
          >
            Revoke Access
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* User Profile Card */}
          <div className="lg:col-span-1 space-y-3 font-sans">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-center relative overflow-hidden">
              <div className="w-14 h-14 rounded-xl bg-brand-light flex items-center justify-center mx-auto mb-3 border border-brand-pink/5 shadow-md">
                <span className="text-lg font-serif font-black text-brand-dark">{selectedUser.name[0]}</span>
              </div>
              <h2 className="text-sm font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-1">{selectedUser.name}</h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="bg-brand-gold text-white text-[7px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-widest flex items-center gap-1 shadow-lg shadow-brand-gold/20">
                  <FiStar className="fill-current" /> {selectedUser.level}
                </span>
              </div>
              
              <div className="space-y-2 text-left border-t border-gray-50 pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg text-brand-pink"><FiMail size={12}/></div>
                  <div className="overflow-hidden">
                    <p className="text-[6px] font-black uppercase tracking-widest text-gray-400">Communication</p>
                    <p className="text-[10px] font-bold text-brand-dark truncate">{selectedUser.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg text-brand-gold"><FiPhone size={12}/></div>
                  <div>
                    <p className="text-[6px] font-black uppercase tracking-widest text-gray-400">Secure Line</p>
                    <p className="text-[10px] font-bold text-brand-dark">+91 {selectedUser.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Finance Snapshot */}
            <div className="bg-brand-dark rounded-2xl p-4 text-white border border-white/5 relative overflow-hidden shadow-lg">
               <div className="absolute top-0 right-0 p-4 opacity-5"><FiDollarSign size={32}/></div>
               <h3 className="text-[7px] font-black uppercase tracking-[0.2em] text-brand-gold/60 mb-3 border-b border-white/5 pb-2">Financial Insights</h3>
               <div className="grid grid-cols-2 gap-2">
                 <div>
                   <p className="text-[6px] font-black uppercase tracking-widest text-white/40 mb-0.5">LTV Spent</p>
                   <p className="text-sm font-serif font-black text-brand-gold">{selectedUser.totalSpent}</p>
                 </div>
                 <div>
                   <p className="text-[6px] font-black uppercase tracking-widest text-white/40 mb-0.5">Orders</p>
                   <p className="text-sm font-serif font-black text-white">{selectedUser.orderCount}</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Orders Details Column */}
          <div className="lg:col-span-3 space-y-3 font-sans">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-[10px] font-serif font-black text-brand-dark uppercase tracking-widest leading-none mb-1">Transaction History</h3>
                  <p className="text-[6px] text-gray-400 font-black uppercase tracking-[0.2em]">Verified Secure Logs</p>
                </div>
                <button onClick={() => handleAction('Filter')} className="text-gray-300 hover:text-brand-pink transition-colors"><FiFilter size={12} /></button>
              </div>

              <div className="space-y-2">
                {selectedUser.recentOrders.map((order, i) => (
                  <motion.div 
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-50/50 rounded-xl border border-gray-100 hover:border-brand-pink/20 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-brand-pink shadow-sm"><FiShoppingBag size={10}/></div>
                      <div>
                        <p className="text-[10px] font-bold text-brand-dark uppercase tracking-wide">{order.id}</p>
                        <p className="text-[7px] text-gray-400 font-black uppercase tracking-widest">{order.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                         <p className="text-[10px] font-black text-brand-dark">{order.amount}</p>
                      </div>
                      <div className={`px-2 py-0.5 rounded-lg text-[7px] font-black uppercase tracking-widest border ${order.status === 'Delivered' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-brand-pink/10 text-brand-pink border-brand-pink/20'}`}>
                         {order.status}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-3 font-serif">
      <div className="flex justify-between items-end mb-1">
        <div>
          <h1 className="text-lg font-black text-brand-dark uppercase tracking-widest leading-none mb-1">
            Customer Database
          </h1>
          <p className="text-[7px] text-gray-400 font-bold uppercase tracking-[0.2em] opacity-60">Verified Identity Vault</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl border border-gray-100 w-64 shadow-sm group font-sans">
           <FiSearch className="text-gray-300 group-focus-within:text-brand-pink transition-colors" size={12} />
           <input 
              type="text" 
              placeholder="Query Database..." 
              className="bg-transparent border-none outline-none text-[9px] font-black uppercase w-full placeholder:opacity-50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
           />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 font-sans">
        {filteredUsers.map((u) => (
          <motion.div 
            key={u.id}
            whileHover={{ y: -3 }}
            onClick={() => setSelectedUser(u)}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm cursor-pointer hover:shadow-xl hover:border-brand-pink/20 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-12 h-12 bg-brand-pink/5 rounded-full -mr-6 -mt-6 group-hover:scale-125 transition-transform"></div>
            
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-sm font-serif font-black text-brand-dark shadow-inner border border-brand-pink/5 group-hover:bg-brand-dark group-hover:text-brand-gold transition-all">
                {u.name[0]}
              </div>
              <div className="overflow-hidden">
                 <h3 className="text-[10px] font-serif font-black text-brand-dark uppercase tracking-wider leading-none mb-1 group-hover:text-brand-pink transition-colors truncate">{u.name}</h3>
                 <span className="text-[6px] font-black text-brand-gold uppercase tracking-tighter bg-brand-gold/5 px-1.5 py-0.5 rounded-lg">{u.level}</span>
              </div>
            </div>

            <div className="space-y-1.5 mb-3">
              <div className="flex justify-between items-end border-b border-gray-50 pb-1">
                 <span className="text-[6px] font-black text-gray-400 uppercase tracking-widest">Spent</span>
                 <span className="text-xs font-serif font-black text-brand-dark">{u.totalSpent}</span>
              </div>
              <div className="flex justify-between items-end border-b border-gray-50 pb-1">
                 <span className="text-[6px] font-black text-gray-400 uppercase tracking-widest">Orders</span>
                 <span className="text-[9px] font-black text-brand-dark uppercase">{u.orderCount}</span>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <span className="text-[7px] font-black uppercase tracking-widest text-brand-dark/30 group-hover:text-brand-pink flex items-center gap-1 transition-all">Profile Vault <FiArrowLeft className="rotate-180" size={8} /></span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
