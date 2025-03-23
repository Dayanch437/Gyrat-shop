import React, { useState } from 'react';
import { useProduct } from '../Hooks/useProducts';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Categories: React.FC = () => {
  const { t } = useTranslation();
  const { data: products } = useProduct();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Get unique categories
  const uniqueCategories = [...new Set(products?.map(product => product.type))];

  const handleCategoryClick = (category: string) => setSelectedCategory(category);

  // Filter products based on selected category
  const filteredProducts = products?.filter(product =>
    selectedCategory === '' || product.type === selectedCategory
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 sm:flex-row" id="Category">
      {/* Sidebar */}
      <motion.div
        className="w-full sm:w-1/3 lg:w-1/4 bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">{t("titles.categories")}</h2>
        <motion.ul
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {uniqueCategories.map(category => (
            <motion.li key={category}>
              <button
                className={`text-gray-800 block w-full py-3 px-4 rounded-md transition-all duration-300 ${selectedCategory === category ? 'bg-indigo-500 text-white' : 'hover:bg-gray-200'}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Display filtered products */}
        {filteredProducts?.length === 0 ? (
          <p className="text-center text-lg text-gray-600">No products found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
            {filteredProducts?.map(product => (
              <motion.div
                key={product.id}
                className="bg-white border rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={`/product/${product.id}`} className="block p-4">
                  <img
                    src={product.image}
                    alt={product.type}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-900">{product.type}</h3>
                  <p className="text-sm text-gray-600">${product.price}</p>
                  <p className="text-sm text-gray-500 mt-2 truncate">{product.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
