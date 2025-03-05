// src/SearchPage.tsx
import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { Product } from "../Types/Product";
import { useTranslation } from "react-i18next";

const SearchPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const { t } = useTranslation();
    

    const { data } = useQuery({
        queryKey: ['search', query],
        queryFn: async () => {
            if (!query) return [];
            const response = await api.get(`products/?search=${query}`);

            // Let's log the API response to the console for inspection
            console.log("API Response:", response);

            return response.data || []; // We made a change here
        },
        enabled: !!query,
    });

    if (!query) {
        return <div  className="min-h-screen"> <p>{t("titles.search_query")}</p></div>
    }


    if (!data || data.length === 0) {
        return<div className="container min-h-screen mx-auto"> <p className='p-5 font-bold lg:text-xl text-lg' >{t("titles.products_not_found")} "{query}".</p></div>
    }



    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <h2 className="text-2xl font-bold mb-4"> {t("titles.search_results")} "{query}"</h2>
            {data.map((product: Product) => {
                // Let's also log the structure of the product in the console
                
                return (
                    <div key={product.id} className="p-2 hover:bg-gray-100 cursor-pointer">
                        <Link to={`/product/${product.id}`} className="text-black block">
                            {product.name}
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default SearchPage;