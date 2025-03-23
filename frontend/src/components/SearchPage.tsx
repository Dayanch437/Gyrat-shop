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
            return response.data || [];
        },
        enabled: !!query,
    });

    if (!query) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
            <p className="text-xl text-gray-600">{t("titles.search_query")}</p>
        </div>;
    }

    if (!data || data.length === 0) {
        return <div className="container min-h-screen mx-auto flex items-center justify-center py-12 bg-gray-50">
            <p className="text-lg font-bold text-gray-500">{t("titles.products_not_found")} "{query}".</p>
        </div>;
    }

    return (
        <div className="container mx-auto px-6 py-12 min-h-screen bg-gray-50">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">{t("titles.search_results")} "{query}"</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {data.map((product: Product) => (
                    <div key={product.id} className="bg-white shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
                        <Link to={`/product/${product.id}`} className="block p-4 hover:text-teal-500">
                            <h3 className="text-xl font-semibold text-gray-800 truncate">{product.name}</h3>
                            <p className="text-sm text-gray-500 mt-2 truncate">{product.description}</p>
                            <p className="text-lg font-semibold text-gray-900 mt-4">{product.price} $</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
