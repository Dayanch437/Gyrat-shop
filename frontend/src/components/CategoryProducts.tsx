import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCategoryProducts } from '../Hooks/useCategoryProducts';
import { useTranslation } from "react-i18next";
  
const CategoryProducts: React.FC = () => {

    const {data}=useCategoryProducts()
    const { category } = useParams();
    const { t } = useTranslation();

    // Kategoriye göre ürünleri bul
    const selectedCategory = data?.find((cat) => String(cat.id) === category);

    return (
        <div className='min-h-screen container mx-auto '>
            {selectedCategory ? (
                <>
                    <h1 className="text-black font-normal pb-5  pt-5 text-4xl">{selectedCategory.name}</h1>

                    <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {selectedCategory.products.map((product) => (
                            <li key={product.id} className="border p-4 rounded shadow"> {/* List item stilleri eklendi */}
                                <Link to={`/product/${product.id}`}> {/* Link eklendi! */}
                                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
                                    <h2 className="font-bold">{product.name}</h2>
                                </Link>
                                <p>{product.type}</p>
                                <p className="font-bold">${product.price}</p>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>{t("titles.products_not_found")}</p>
            )}
        </div>
    );
};


export default CategoryProducts;