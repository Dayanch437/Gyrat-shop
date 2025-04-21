import { FaShoppingCart, FaInstagram, FaTiktok } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white py-4 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 items-center text-center md:text-left">
        
        {/* Social Media Links */}
        <div className="flex justify-center sm:justify-start space-x-4 sm:space-x-6">
          <motion.a
            href="https://www.instagram.com/gyrat_" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            <FaInstagram className="h-5 w-5 sm:h-6 sm:w-6 hover:text-pink-400 transition duration-300" />
          </motion.a>
          <motion.a
            href="https://www.tiktok.com/@gyrat_" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            <FaTiktok className="h-5 w-5 sm:h-6 sm:w-6 hover:text-gray-400 transition duration-300" />
          </motion.a>
        </div>

        {/* Logo and Text */}
        <div className="flex items-center justify-center sm:justify-center md:justify-start space-x-3">
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="p-1 sm:p-2 bg-gray-800 rounded-full"
          >
            <FaShoppingCart className="h-8 w-8 sm:h-10 sm:w-10 animate-pulse text-yellow-400" />
          </motion.div>
          <motion.span
            className="text-lg sm:text-xl font-semibold"
            whileHover={{ scale: 1.1, textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Market
          </motion.span>
        </div>

        {/* Phone Number */}
        <motion.div 
          className="flex justify-center sm:justify-end"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <a 
            href="tel:+99361983821" 
            className="hover:text-gray-300 transition duration-300 text-sm sm:text-base"
          >
            +993 61 98 38 21
          </a>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="mt-4 sm:mt-6 border-t border-gray-700 pt-3 sm:pt-4 text-center text-xs sm:text-sm text-gray-400">
        <motion.p
          whileHover={{ scale: 1.1, color: "#fff" }}
          transition={{ duration: 0.3 }}
        >
          &copy; {new Date().getFullYear()} All Rights Reserved.
        </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
