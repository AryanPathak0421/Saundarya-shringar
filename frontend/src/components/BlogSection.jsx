import React from 'react';
import { motion } from 'framer-motion';
import blogSkincare from '../assets/images/blog_skincare.png';
import blogHaircare from '../assets/images/blog_haircare.png';
import blogVitC from '../assets/images/blog_vit_c.png';

const blogs = [
  {
    id: 1,
    title: 'Skincare Routine for Glowing Skin',
    excerpt: 'Discover the 5 essential steps to achieve a natural, healthy glow every morning.',
    image: '/blog_skincare.png',
    date: 'March 10, 2024',
  },
  {
    id: 2,
    title: 'Natural Hair Care Tips',
    excerpt: 'Say goodbye to damage and split ends with these ancient Ayurvedic hair secrets.',
    image: '/blog_haircare.png',
    date: 'March 05, 2024',
  },
  {
    id: 3,
    title: 'Benefits of Vitamin C Serum',
    excerpt: 'Why Vitamin C is the most important ingredient in your skincare arsenal.',
    image: '/blog_vit_c.png',
    date: 'Feb 28, 2024',
  },
];

const BlogSection = () => {
  return (
    <section className="py-20 bg-brand-light">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16 italic"
        >
          <span className="text-brand-gold font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-3 block">
            Glow & Gossip
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark uppercase tracking-tight">
            BEAUTY <span className="text-brand-gold italic">BLOG</span>
          </h2>
          <div className="w-20 h-1 bg-brand-gold mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <motion.div 
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#FDF6E3] rounded-none overflow-hidden group border border-brand-pink/20 hover:border-brand-gold transition-all duration-500 shadow-sm"
            >
              <div className="h-56 md:h-64 overflow-hidden relative">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="p-5 md:p-6 bg-[#FDF6E3]/50">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-brand-gold text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-0 border-l-2 border-brand-gold pl-2">{blog.date}</span>
                </div>
                <h3 className="text-lg md:text-xl font-serif font-bold mb-3 hover:text-brand-gold cursor-pointer transition-colors leading-snug">
                  {blog.title}
                </h3>
                <p className="text-gray-500 text-xs md:text-sm mb-4 line-clamp-2 font-sans italic opacity-90">
                  {blog.excerpt}
                </p>
                <button className="text-[10px] font-bold uppercase tracking-widest border-b border-brand-gold pb-0.5 hover:text-brand-gold transition-all">
                  Read More
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <button className="bg-brand-dark text-white hover:bg-brand-gold px-10 py-3 rounded-none text-xs font-bold tracking-widest transition-all duration-300 shadow-xl">
            READ ALL ARTICLES
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
