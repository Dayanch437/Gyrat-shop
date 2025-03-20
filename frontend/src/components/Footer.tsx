import { FaShoppingCart } from "react-icons/fa";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 px-4 md:px-16 lg:px-24">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Social Media Links */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <a href="https://www.instagram.com/gyrat_" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="h-6 w-6 text-white hover:text-gray-400" />
          </a>
          <a href="https://www.tiktok.com/@gyrat_" target="_blank" rel="noopener noreferrer">
            <FaTiktok className="h-6 w-6 text-white hover:text-gray-400" />
          </a>
        </div>

        {/* Logo and Text */}
        <div className="mb-4 md:mb-0 flex items-center">
          <FaShoppingCart className="h-12 w-12 text-white mr-2" />
          <span className="text-lg font-semibold">Market</span>
        </div>

        {/* Phone Number */}
        <div className="text-center md:text-right">
          <a href="tel:+99361983821" className="text-white hover:text-gray-400">+99361983821</a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-4 text-center border-t border-gray-700 pt-2 text-sm">
        <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
