import React, { useState } from 'react';
import { useProduct } from '../Hooks/useProducts';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Categories: React.FC = () => {
  const { t } = useTranslation();
  const { data: products } = useProduct();
  const [openCategories, setOpenCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Assuming you want a set of unique category names (strings)
  const uniqueCategories = [...new Set(products?.map(product => product.type))];

  const handleCategoryClick = (category: string) => setSelectedCategory(category);

  const filteredProducts = products?.filter(product =>
    selectedCategory === '' || product.type === selectedCategory
  );

  return (
    <div className="flex min-h-screen " id="Category">
      <div className="w-1/4 bg-gray-100 p-4 rounded mr-4">
        <div className="mb-4">
          <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpenCategories(!openCategories)}>
            <h2 className="text-lg font-semibold">{t("titles.categories")}</h2>
            <span>{openCategories ? '-' : '+'}</span>
          </div>
          {openCategories && (
            <ul className="mt-2 space-y-1">
              {uniqueCategories.map(category => (
                <li key={category}>
                  <button
                    className={`text-blue-500 hover:underline block w-full ${selectedCategory === category ? 'font-bold' : ''}`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="w-3/4 p-4">
        {/* Display filtered products */}
        {filteredProducts?.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts?.map(product => (
              <div key={product.id} className="border rounded p-4 shadow-md">
                <Link to={`/product/${product.id}`}> {/* Link to product details */}
                  <img src={product.image} alt={product.image} className="w-full h-48 object-cover mb-2 rounded" />
                  <h3 className="font-semibold">{product.type}</h3> {/* Assuming you want the first type name */}
                  <p>Price: {product.price} $</p>
                  <p className="text-gray-600 truncate">{product.description}</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;