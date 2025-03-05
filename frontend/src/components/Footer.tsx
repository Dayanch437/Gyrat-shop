import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 px-4 md:px-16 lg:px-24 ">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo and Text */}
        <div className="mb-4 md:mb-0 flex items-center"> {/* Flexbox ile yan yana */}
          <FaShoppingCart className="h-12 w-12 text-white mr-2" /> {/* marginRight ile boşluk */}
          <span className="text-lg font-semibold">Gyrat</span> {/* Yazı */}
        </div>

        {/* Address */}
        <div className="text-center md:text-right">
          <p>123 Example St, Example City, Postal Code</p>
        </div>
      </div>
      {/* Copyright Section (Optional) */}
      <div className="mt-4 text-center border-t border-gray-700 pt-2 text-sm">
        <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;