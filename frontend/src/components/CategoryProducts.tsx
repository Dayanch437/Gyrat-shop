import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCategoryProducts } from '../Hooks/useCategoryProducts';
import { useTranslation } from "react-i18next";

const CategoryProducts: React.FC = () => {
    const { data } = useCategoryProducts();
    const { category } = useParams();
    const { t } = useTranslation();

    // Kategoriye göre ürünleri bul
    const selectedCategory = data?.find((cat) => String(cat.id) === category);

    return (
        <div className='min-h-screen bg-gray-50 py-8'>
            {selectedCategory ? (
                <>
                    <h1 className="text-4xl font-semibold text-gray-800 text-center mb-6">{selectedCategory.name}</h1>

                    <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {selectedCategory.products.map((product) => (
                            <li key={product.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
                                <Link to={`/product/${product.id}`} className="block">
                                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                                    <h2 className="font-semibold text-lg text-gray-700">{product.name}</h2>
                                </Link>
                                <p className="text-sm text-gray-500">{product.type}</p>
                                <p className="font-semibold text-xl text-gray-900">${product.price}</p>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p className="text-center text-gray-600">{t("titles.products_not_found")}</p>
            )}
        </div>
    );
};

export default CategoryProducts;
