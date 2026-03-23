import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import { FiSearch, FiFilter, FiExternalLink, FiTruck, FiCheckCircle, FiClock, FiMoreVertical, FiEye, FiArrowLeft, FiUsers } from 'react-icons/fi';

const AdminOrders = () => {
  const dummyOrders = [
    {
      id: '#8821',
      customer: 'Aditi Sharma',
      email: 'aditi@example.com',
      products: 'Rose Water, Lakme Face Powder',
      amount: '₹1,250',
      status: 'Delivered',
      date: '20 Mar 2024'
    },
    {
      id: '#8820',
      customer: 'Rahul Verma',
      email: 'rahul.v@example.com',
      products: 'TIRTIR Cushion (Pink) x2',
      amount: '₹3,400',
      status: 'In Transit',
      date: '19 Mar 2024'
    },
    {
      id: '#8819',
      customer: 'Priya Singh',
      email: 'priyas@example.com',
      products: 'Royal Jhumkas, Lip Gloss',
      amount: '₹2,100',
      status: 'Processing',
      date: '19 Mar 2024'
    },
    {
      id: '#8818',
      customer: 'Suresh Kumar',
      email: 'suresh.k@example.com',
      products: 'Men\'s Grooming Kit',
      amount: '₹850',
      status: 'Delivered',
      date: '18 Mar 2024'
    },
    {
      id: '#8817',
      customer: 'Neha Gupta',
      email: 'neha.g@example.com',
      products: 'Handmade Soap Set of 5',
      amount: '₹1,500',
      status: 'Shipped',
      date: '18 Mar 2024'
    }
  ];

  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = dummyOrders.filter(order => {
    const matchesFilter = filter === 'All' || order.status === filter;
    const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (selectedOrder) {
    return (
      <div className="max-w-7xl mx-auto space-y-3">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setSelectedOrder(null)}
            className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#5C2E3E] hover:text-brand-pink transition-all"
          >
            <FiArrowLeft size={10} /> Back to Logs
          </button>
          <div className="flex gap-1.5">
             <button className="bg-white px-3 py-1.5 border border-brand-pink/10 text-[8px] font-black uppercase tracking-widest shadow-sm">Print</button>
             <button className="bg-brand-dark text-white px-5 py-1.5 text-[8px] font-black uppercase tracking-widest shadow-xl shadow-brand-dark/20">Update</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Order Meta & Items */}
          <div className="lg:col-span-2 space-y-3">
             <div className="bg-white border border-brand-pink/10 p-4 flex flex-col md:flex-row justify-between gap-4 relative">
                 <div className="absolute top-0 left-0 w-1 h-full bg-brand-pink" />
                 <div className="space-y-3 flex-1">
                    <div>
                      <h2 className="text-xl font-serif font-black text-brand-dark leading-none mb-0.5">{selectedOrder.id}</h2>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.1em]">{selectedOrder.date} • {selectedOrder.status}</p>
                    </div>
                    <div className="space-y-1.5">
                       <h3 className="text-[8px] font-bold text-gray-800 uppercase tracking-widest opacity-60">Manifest</h3>
                       <div className="divide-y divide-gray-50 border border-gray-50 p-2.5 bg-gray-50/30">
                          <div className="flex justify-between py-1.5 text-[10px] font-bold text-gray-700">
                             <span className="truncate max-w-[200px]">{selectedOrder.products}</span>
                             <span>{selectedOrder.amount}</span>
                          </div>
                          <div className="flex justify-between py-1.5 text-[10px] font-bold text-gray-700">
                             <span className="text-gray-400 font-medium italic">Shipping Charge (Promotional)</span>
                             <span className="text-green-600 font-black">FREE</span>
                          </div>
                          <div className="flex justify-between pt-2.5 text-xs font-black text-brand-dark">
                             <span>TOTAL COLLECTED</span>
                             <span className="text-brand-pink">{selectedOrder.amount}</span>
                          </div>
                       </div>
                    </div>
                 </div>
                 <div className="bg-brand-light/10 p-4 flex flex-col items-center justify-center text-center space-y-2 min-w-[150px] border border-brand-pink/5">
                    <FiTruck size={24} className="text-brand-pink" />
                    <div>
                      <p className="text-[8px] font-black text-brand-dark uppercase tracking-widest opacity-50">Tracking ID</p>
                      <p className="text-[10px] font-black text-brand-gold">SS-TRACK-9921-X</p>
                    </div>
                 </div>
             </div>

             <div className="bg-brand-dark p-6 text-white relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                   <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-gold/70">Lifecycle Audit</h3>
                   <div className="space-y-4">
                      {[
                        { status: 'Manifest Generated', time: '11:45 AM', active: true },
                        { status: 'Quality Checked', time: '12:20 PM', active: true },
                        { status: 'Packaging Finished', time: '01:05 PM', active: false },
                        { status: 'Dispatch Ready', time: '--', active: false }
                      ].map((log, i) => (
                        <div key={i} className="flex gap-3 items-start relative">
                           {i < 3 && <div className="absolute left-[4px] top-3.5 w-[1px] h-full bg-white/10" />}
                           <div className={`w-2 h-2 rounded-full mt-0.5 border ${log.active ? 'bg-brand-gold border-brand-gold' : 'bg-transparent border-white/20'}`} />
                           <div className="flex-1 -mt-0.5">
                              <p className={`text-[9px] font-bold uppercase tracking-wider ${log.active ? 'text-white' : 'text-white/30'}`}>{log.status}</p>
                              <p className="text-[7px] text-white/30 uppercase font-medium">{log.time}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="absolute -bottom-5 -right-5 opacity-5">
                   <FiCheckCircle size={120} />
                </div>
             </div>
          </div>

          {/* Customer & Sidebar Info */}
          <div className="space-y-3">
             <div className="bg-white border border-brand-pink/10 p-4 space-y-4 shadow-sm">
                <div className="space-y-3">
                   <h3 className="text-[10px] font-black text-brand-dark uppercase tracking-widest flex items-center gap-2 border-b border-gray-50 pb-2">
                     <FiUsers size={12} className="text-brand-pink" /> Customer Detail
                   </h3>
                   <div className="space-y-0.5">
                      <p className="text-[11px] font-black text-gray-800 uppercase tracking-tight">{selectedOrder.customer}</p>
                      <p className="text-[9px] font-medium text-gray-400">{selectedOrder.email}</p>
                      <p className="text-[9px] font-medium text-gray-400">+91 98964 72169</p>
                   </div>
                </div>
                <div className="pt-2 space-y-3">
                   <h3 className="text-[10px] font-black text-brand-dark uppercase tracking-widest flex items-center gap-2 border-b border-gray-50 pb-2">
                     <FiTruck size={12} className="text-brand-pink" /> Shipping To
                   </h3>
                   <p className="text-[9px] font-bold text-gray-400 uppercase leading-relaxed tracking-widest">
                     Plot No. 42, Heritage Enclave, Jaipur,<br />
                     Jaipur, Rajasthan - 302001
                   </p>
                </div>
             </div>

             <div className="bg-brand-light/20 border border-brand-pink/5 p-4 space-y-3">
                <h3 className="text-[10px] font-black text-brand-dark uppercase tracking-widest">Internal Notes</h3>
                <textarea 
                  className="w-full h-24 bg-white/50 border border-brand-pink/10 p-2.5 text-[9px] font-medium outline-none focus:bg-white transition-all uppercase leading-relaxed text-gray-500"
                  placeholder="ADD AUDIT NOTES..."
                ></textarea>
                <button className="w-full py-1.5 bg-brand-pink/10 text-brand-pink text-[8px] font-black uppercase tracking-widest hover:bg-brand-pink hover:text-white transition-all">Submit Audit</button>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-4 font-serif">
      <div className="flex flex-col gap-1">
         <h1 className="text-xl font-black text-brand-dark uppercase tracking-widest leading-none">
           Order Logs
         </h1>
         <p className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.2em] opacity-60">Live Transaction Tracking</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-1 pb-4">
         {/* Filters & Search - Compact */}
         <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 border-b border-gray-50 mb-2">
           <div className="flex bg-gray-50 p-1 rounded-xl">
             {['All', 'Delivered', 'Shipped', 'Processing'].map((tab) => (
               <button 
                 key={tab}
                 onClick={() => setFilter(tab)}
                 className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${filter === tab ? 'bg-brand-dark text-white shadow-lg shadow-brand-dark/20' : 'text-gray-400 hover:text-brand-dark'}`}
               >
                 {tab}
               </button>
             ))}
           </div>
           <div className="relative w-full md:w-64 group">
             <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-brand-pink transition-colors" size={12} />
             <input 
               type="text" 
               placeholder="SEARCH LOGS..." 
               className="w-full bg-gray-50 border border-gray-100 pl-10 pr-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest outline-none focus:border-brand-pink/30 focus:bg-white transition-all shadow-inner"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
           </div>
         </div>

         <div className="overflow-x-auto">
           <table className="w-full text-left font-sans">
             <thead>
               <tr className="border-b border-gray-50">
                 <th className="px-6 py-4 text-[7px] font-black uppercase tracking-widest text-brand-dark/40">Order ID</th>
                 <th className="px-6 py-4 text-[7px] font-black uppercase tracking-widest text-brand-dark/40">Customer</th>
                 <th className="px-6 py-4 text-[7px] font-black uppercase tracking-widest text-brand-dark/40">Total</th>
                 <th className="px-6 py-4 text-[7px] font-black uppercase tracking-widest text-brand-dark/40">Status</th>
                 <th className="px-6 py-4 text-[7px] font-black uppercase tracking-widest text-brand-dark/40 text-right">Actions</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-50">
               {filteredOrders.map((order) => (
                 <tr key={order.id} className="hover:bg-brand-pink/[0.01] transition-colors group">
                   <td className="px-6 py-4">
                     <span className="text-[10px] font-black text-brand-dark hover:text-brand-pink cursor-pointer transition-colors block">{order.id}</span>
                   </td>
                   <td className="px-6 py-4">
                     <div className="flex flex-col">
                       <span className="text-[10px] font-bold text-gray-800 uppercase tracking-tight">{order.customer}</span>
                       <span className="text-[7px] font-bold text-gray-300 uppercase tracking-widest mt-0.5">{order.date}</span>
                     </div>
                   </td>
                   <td className="px-6 py-4 text-[11px] font-black text-brand-dark">{order.amount}</td>
                   <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[6px] font-black uppercase tracking-widest border shadow-sm ${
                        order.status === 'Delivered' ? 'bg-green-50 text-green-600 border-green-100' : 
                        order.status === 'Shipped' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                        'bg-orange-50 text-orange-600 border-orange-100'
                      }`}>
                         {order.status}
                      </span>
                   </td>
                   <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-brand-pink/10 text-brand-pink text-[7px] font-black uppercase tracking-widest rounded-lg shadow-sm hover:bg-brand-pink hover:text-white transition-all transform group-hover:scale-105"
                      >
                         <FiEye size={10} /> View Details
                      </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
      </div>
    </div>
  );
};

export default AdminOrders;
