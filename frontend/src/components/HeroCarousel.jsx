import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import hero1 from '../assets/images/hero1.png';
import hero2 from '../assets/images/hero2.png';
import hero3 from '../assets/images/hero3.png';

const slides = [
  {
    image: hero1,
    title: 'Glow Naturally with Soundarya Shrinagar',
    subtitle: 'Discover the secret to radiant skin with our 100% natural formulations.',
    buttonText: 'Explore Skincare',
    link: '/shop?category=skincare'
  },
  {
    image: hero2,
    title: 'Flat 30% Off on Skincare Products',
    subtitle: 'Limited time offer! Upgrade your beauty routine with our bestsellers.',
    buttonText: 'Shop the Sale',
    link: '/shop'
  },
  {
    image: hero3,
    title: 'Pure Beauty Inspired by Nature',
    subtitle: 'Ethically sourced, dermatologically tested, and cruelty-free beauty.',
    buttonText: 'Wellness Kit',
    link: '/shop?category=beauty kits'
  },
];

const HeroCarousel = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full overflow-hidden">
              {/* Image Overlay */}
              <div className="absolute inset-0 bg-black/5 z-10"></div>
              
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover object-center transform scale-105"
              />
              
              <div className="absolute inset-0 z-20 flex items-end justify-start pb-10 md:pb-14">
                <div className="px-6 md:px-20">
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-lg text-left text-white"
                  >
                    <h2 className="text-sm md:text-lg lg:text-xl font-serif font-bold mb-2 drop-shadow-sm uppercase tracking-wide leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-[10px] md:text-xs mb-5 opacity-80 drop-shadow-sm font-medium max-w-xs">
                      {slide.subtitle}
                    </p>
                    <Link to={slide.link} className="inline-block bg-brand-gold text-white px-6 py-2 rounded-none text-[9px] md:text-[10px] font-bold uppercase tracking-widest hover:bg-brand-dark transition-all duration-300 shadow-md">
                      {slide.buttonText}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
