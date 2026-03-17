import React from 'react';
import { FiFacebook, FiInstagram, FiTwitter, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import logo from '../assets/images/logo_pink.png';
import footerBg from '../assets/images/footer_bg.jpg';

const Footer = () => {
  return (
    <footer className="relative bg-[#FFF0F3] text-brand-dark pt-8 pb-4 border-t border-brand-pink/10 italic overflow-hidden">
      {/* Sketched Cosmetic Background - High Visibility */}
      <div 
        className="absolute inset-0 z-0 opacity-25"
        style={{
          backgroundImage: `url(${footerBg})`,
          backgroundSize: '400px',
          backgroundRepeat: 'repeat',
        }}
      ></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-6">
          {/* Brand Info */}
          <div className="max-w-xs">
            <img src={logo} alt="Logo" className="h-10 w-auto mb-3" />
            <p className="text-gray-500 text-[10px] leading-relaxed mb-4">
              Pure essence of nature. 100% organic and natural beauty products crafted to enhance your natural glow.
            </p>
            <div className="flex space-x-3">
              <a href="https://www.instagram.com/saundaryashringarpvtltd/" target="_blank" rel="noopener noreferrer" className="p-2 border border-brand-pink/20 rounded-full hover:bg-brand-pink/10 transition-colors text-xs text-brand-dark"><FiInstagram /></a>
              <a href="https://www.facebook.com/people/Saundarya-Shringar-Pvt-Ltd/61580709900798/" target="_blank" rel="noopener noreferrer" className="p-2 border border-brand-pink/20 rounded-full hover:bg-brand-pink/10 transition-colors text-xs text-brand-dark"><FiFacebook /></a>
              <a href="https://x.com/LtdShringar" target="_blank" rel="noopener noreferrer" className="p-2 border border-brand-pink/20 rounded-full hover:bg-brand-pink/10 transition-colors text-xs text-brand-dark"><FiTwitter /></a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="md:text-right">
            <h3 className="text-xs font-bold mb-3 uppercase tracking-widest text-brand-gold">Contact Us</h3>
            <ul className="space-y-2 text-gray-500 text-[10px]">
              <li className="flex items-center md:justify-end space-x-2">
                <span>Dehradun, Uttarakhand, India</span>
                <FiMapPin className="text-brand-pink shrink-0" size={10} />
              </li>
              <li className="flex items-center md:justify-end space-x-2">
                <span>+91 86790 76776</span>
                <FiPhone className="text-brand-pink shrink-0" size={10} />
              </li>
              <li className="flex items-center md:justify-end space-x-2">
                <span>hello@soundaryashrinagar.com</span>
                <FiMail className="text-brand-pink shrink-0" size={10} />
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-4 border-t border-brand-pink/10 flex flex-col md:flex-row justify-between items-center text-[9px] text-gray-400">
          <p>© 2024 Saundarya Shringar Pvt Ltd. Crafted with Love.</p>
          <div className="mt-3 md:mt-0 flex space-x-4 grayscale opacity-60">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-3" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
