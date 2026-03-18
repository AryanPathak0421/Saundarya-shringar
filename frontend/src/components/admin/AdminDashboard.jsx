import React from 'react';
import AdminLayout from './AdminLayout';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Total Sales</h3>
          <p className="text-3xl font-serif text-brand-dark">₹45,250</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Orders</h3>
          <p className="text-3xl font-serif text-brand-dark">124</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Customers</h3>
          <p className="text-3xl font-serif text-brand-dark">89</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="font-bold text-lg text-brand-dark">Recent Orders</h3>
        </div>
        <table className="w-full text-left bg-white text-sm text-gray-500">
          <thead className="text-xs uppercase bg-gray-50 font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-6 py-4">#ORD-9821</td>
              <td className="px-6 py-4">Today</td>
              <td className="px-6 py-4">₹2,850</td>
              <td className="px-6 py-4"><span className="text-green-600 bg-green-50 px-2 py-1 rounded">Processing</span></td>
            </tr>
            <tr className="border-b">
              <td className="px-6 py-4">#ORD-9820</td>
              <td className="px-6 py-4">Yesterday</td>
              <td className="px-6 py-4">₹1,150</td>
              <td className="px-6 py-4"><span className="text-blue-600 bg-blue-50 px-2 py-1 rounded">Shipped</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
