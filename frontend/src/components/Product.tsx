import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useProduct } from '../Hooks/useProducts';

const Products: React.FC = () => {

  const { t } = useTranslation();
    const {data:products}=useProduct()

  return (
    <div className="mx-auto container mt-10 mb-5 min-h-[500px]">
      <div>
        <h1 className='font-normal text-2xl pb-5 pt-5'>{t("titles.latest")}</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map(product => { 
          return (
            <Link key={product.id} className="border rounded p-4 shadow-md" to={`/products/${product.id}`}>
              <img src={product.image} alt={product.image} className="w-full h-48 object-cover mb-2 rounded" />
              <div className="flex justify-between items-center">
                <div className="font-semibold">{product.name}</div>
                <div>${product.price}</div>
              </div>
              <div className="mt-2 text-gray-600">{product.description}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Products;