import React, { useState } from 'react';
import { useProduct } from '../Hooks/useProducts';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiFilter, FiX, FiChevronRight } from 'react-icons/fi';

const Categories: React.FC = () => {
  const { t } = useTranslation();
  const { data: products } = useProduct();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Get unique categories
  const uniqueCategories = [...new Set(products?.map(product => product.type))];

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setMobileFiltersOpen(false); // Close mobile filters after selection
  };

  // Filter products based on selected category
  const filteredProducts = products?.filter(product =>
    selectedCategory === '' || product.type === selectedCategory
  );

  // Reset filter to show all products
  const resetFilter = () => setSelectedCategory('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile filter dialog */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)} />
          <motion.div 
            className="absolute inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-xl"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">{t("titles.categories")}</h2>
                <button 
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 rounded-md hover:bg-gray-100"
                >
                  <FiX className="h-6 w-6 text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={resetFilter}
                    className={`w-full text-left py-3 px-4 rounded-lg transition-all ${!selectedCategory ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}
                  >
                    {t("allCategories")}
                  </button>
                </li>
                {uniqueCategories.map(category => (
                  <li key={category}>
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className={`w-full text-left py-3 px-4 rounded-lg transition-all flex items-center justify-between ${selectedCategory === category ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}
                    >
                      {category}
                      <FiChevronRight className="text-gray-400" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title and mobile filter button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
          >
            <FiFilter className="h-5 w-5" />
            <span>{t("filters")}</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop sidebar */}
          <motion.div
            className="hidden lg:block w-72 flex-shrink-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{t("titles.categories")}</h2>
              <motion.ul
                className="space-y-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <li>
                  <button
                    onClick={resetFilter}
                    className={`w-full text-left py-3 px-4 rounded-lg transition-all ${!selectedCategory ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}
                  >
                    {t("allCategories")}
                  </button>
                </li>
                {uniqueCategories.map(category => (
                  <motion.li 
                    key={category}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <button
                      onClick={() => handleCategoryClick(category)}
                      className={`w-full text-left py-3 px-4 rounded-lg transition-all flex items-center justify-between ${selectedCategory === category ? 'bg-blue-100 text-blue-600 font-medium' : 'hover:bg-gray-100'}`}
                    >
                      {category}
                      <FiChevronRight className="text-gray-400" />
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>

          {/* Main content */}
          <div className="flex-1">
            {/* Category filter indicator */}
            {selectedCategory && (
              <motion.div 
                className="mb-6 flex items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="text-gray-600 mr-2">Filtered by:</span>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  {selectedCategory}
                </span>
                <button 
                  onClick={resetFilter}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <FiX className="h-4 w-4" />
                </button>
              </motion.div>
            )}

            {/* Products grid */}
            {filteredProducts?.length === 0 ? (
              <motion.div 
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or browse all categories</p>
                <button
                  onClick={resetFilter}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Reset filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts?.map(product => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <Link to={`/product/${product.id}`} className="block">
                      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col border border-gray-100">
                        <div className="relative pt-[100%] overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.type}
                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.type}</h3>
                          <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.description}</p>
                          <div className="mt-auto flex items-center justify-between">
                            <span className="text-lg font-bold text-gray-900">${product.price}</span>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medsium">
                              View details
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
