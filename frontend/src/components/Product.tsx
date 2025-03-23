import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useProduct } from '../Hooks/useProducts';
import { motion } from "framer-motion";

const Products: React.FC = () => {
  const { t } = useTranslation();
  const { data: products } = useProduct();

  return (
    <div className="container mx-auto mt-10 mb-10 p-5 min-h-screen">
      <motion.h1 
        className="text-xllg:text-3xl font-semibold pb-5 text-center text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t("titles.latest")}
      </motion.h1>
      
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <motion.div 
            key={product.id} 
            whileHover={{ scale: 1.05 }} 
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Link 
              to={`/products/${product.id}`} 
              className="block bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden transition duration-300"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-52 object-cover"
              />
              <div className="p-4">
                <h2 className="font-bold text-lg text-gray-900">{product.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-lg font-semibold text-blue-600">${product.price}</span>
                
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Products;
