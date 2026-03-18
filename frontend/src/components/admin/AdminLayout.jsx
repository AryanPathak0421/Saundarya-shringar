import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-brand-dark text-white min-h-screen p-6">
        <h2 className="text-xl font-serif font-black mb-10 text-brand-gold uppercase tracking-widest">
          Soundarya Admin
        </h2>
        <nav className="flex flex-col gap-4">
          <Link to="/admin" className="hover:text-brand-pink transition-colors">Dashboard</Link>
          <Link to="/admin/products" className="hover:text-brand-pink transition-colors">Products</Link>
          <Link to="/admin/orders" className="hover:text-brand-pink transition-colors">Orders</Link>
          <Link to="/admin/customers" className="hover:text-brand-pink transition-colors">Customers</Link>
          <Link to="/" className="mt-10 text-gray-400 hover:text-white transition-colors text-sm">
            &larr; Back to Store
          </Link>
        </nav>
      </aside>

      {/* Admin Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold font-serif text-brand-dark">Admin Panel</h1>
          <div className="text-sm text-gray-500">Welcome, Admin</div>
        </header>

        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
