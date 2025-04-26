import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCategoryProducts } from '../Hooks/useCategoryProducts';
import { useTranslation } from "react-i18next";

const CategoryProducts: React.FC = () => {
    const { data } = useCategoryProducts();
    const { category } = useParams();
    const { t } = useTranslation();

    // Find the selected category from fetched data
    const selectedCategory = data?.find(cat => String(cat.id) === category);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white px-4 py-10">
            {selectedCategory ? (
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10">
                        {selectedCategory.name}
                    </h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                        {selectedCategory.products.map(product => (
                            <div
                                key={product.id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
                            >
                                <Link to={`/product/${product.id}`} className="block">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-52 object-cover"
                                    />
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                                            {product.name}
                                        </h2>
                                        <p className="text-sm text-gray-500 mb-2">{product.type}</p>
                                        <p className="text-xl font-bold text-indigo-600">${product.price}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-20 text-gray-600 text-lg">
                    {t("titles.products_not_found")}
                </div>
            )}
        </div>
    );
};

export default CategoryProducts;