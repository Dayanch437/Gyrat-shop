import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaGlobe, FaCaretDown, FaBars, FaTimes } from 'react-icons/fa';
import { useCategoryProducts } from '../Hooks/useCategoryProducts';
import { api } from '../api';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

interface Product {
    id: number;
    name: string;
}

const Navbar: React.FC = () => {
    const { t } = useTranslation();
    const { data } = useCategoryProducts();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] = useState(false);
    const [isLanguageDropdownVisible, setIsLanguageDropdownVisible] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [searchResults, setSearchResults] = useState<Product[]>([]);

    const categoryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const languageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleCategoryMouseEnter = () => {
        if (categoryTimeoutRef.current) clearTimeout(categoryTimeoutRef.current);
        setIsCategoryDropdownVisible(true);
    };

    const handleCategoryMouseLeave = () => {
        categoryTimeoutRef.current = setTimeout(() => {
            setIsCategoryDropdownVisible(false);
        }, 200);
    };

    const handleCategoryClick = () => {
        setIsCategoryDropdownVisible(!isCategoryDropdownVisible);
    };

    const handleLanguageMouseEnter = () => {
        if (languageTimeoutRef.current) clearTimeout(languageTimeoutRef.current);
        setIsLanguageDropdownVisible(true);
    };

    const handleLanguageMouseLeave = () => {
        languageTimeoutRef.current = setTimeout(() => {
            setIsLanguageDropdownVisible(false);
        }, 200);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const fetchSearchResults = async (query: string) => {
        try {
            const response = await api.get<Product[]>(`/products?search=${query}`);
            return response.data;
        } catch (error) {
            console.error("Search error:", error);
            return [];
        }
    };

    const handleMobileSearch = async (query: string) => {
        const results = await fetchSearchResults(query);
        setSearchResults(results);
    };

    const handleDesktopSearch = (query: string) => {
        navigate(`/search?q=${query}`);
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = setTimeout(() => {
            handleDesktopSearch(query);
        }, 300);
    };

    const handleMobileSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
        searchTimeoutRef.current = setTimeout(() => {
            handleMobileSearch(query);
        }, 300);
    };

    const handleLanguageChange = (selectedOption: string) => {
        localStorage.setItem('language', selectedOption);
        api.defaults.headers.common['Accept-Language'] = selectedOption;
        i18n.changeLanguage(selectedOption).then(() => {
            queryClient.invalidateQueries();
            setIsLanguageDropdownVisible(false);
        });
    };

    useEffect(() => {
        const language = localStorage.getItem('language') || 'tk';
        i18n.changeLanguage(language);
        api.defaults.headers.common['Accept-Language'] = language;
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    const toggleMobileSearch = () => {
        setIsMobileSearchOpen(!isMobileSearchOpen);
        setSearchResults([]);
        setSearchQuery('');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <FaShoppingCart className="text-xl text-indigo-600" />
                    <span className="font-bold text-xl">Gyrat</span>
                </div>
                <div className="hidden md:flex space-x-6 items-center">
                    <Link to="/" className="hover:text-indigo-600 font-medium">{t('navbar.main')}</Link>
                    <div onMouseEnter={handleCategoryMouseEnter} onMouseLeave={handleCategoryMouseLeave}>
                        <div className="relative">
                            <button onClick={handleCategoryClick} className="flex items-center font-medium hover:text-indigo-600">
                                {t('navbar.categories')} <FaCaretDown className="ml-1" />
                            </button>
                            {isCategoryDropdownVisible && (
                                <ul className="absolute bg-white border mt-2 rounded shadow-md w-48 z-10">
                                    {data?.map((category) => (
                                        <li key={category.name}>
                                            <Link to={`/category/${category.id}`} className="block px-4 py-2 hover:bg-gray-100">
                                                {category.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <Link to="/contact" className="hover:text-indigo-600 font-medium">{t('navbar.contact')}</Link>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="hidden md:block relative">
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            placeholder="Search..."
                            className="px-3 py-1 pl-9 w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <FaSearch className="md:hidden text-xl cursor-pointer" onClick={toggleMobileSearch} />
                    <div onMouseEnter={handleLanguageMouseEnter} onMouseLeave={handleLanguageMouseLeave} className="relative cursor-pointer">
                        <FaGlobe className="text-xl" />
                        {isLanguageDropdownVisible && (
                            <ul className="absolute right-0 mt-2 w-20 bg-white border rounded shadow z-10">
                                {['en', 'ru', 'tk'].map((lang) => (
                                    <li key={lang}>
                                        <button onClick={() => handleLanguageChange(lang)} className="block w-full text-left px-3 py-1 hover:bg-gray-100">
                                            {lang}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <FaBars className="md:hidden text-2xl cursor-pointer" onClick={toggleMobileMenu} />
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-white z-40 flex flex-col p-4 space-y-4">
                    <FaTimes className="self-end text-xl cursor-pointer" onClick={toggleMobileMenu} />
                    <Link to="/" onClick={toggleMobileMenu} className="text-lg font-medium hover:text-indigo-600">{t('navbar.main')}</Link>
                    <Link to="/contact" onClick={toggleMobileMenu} className="text-lg font-medium hover:text-indigo-600">{t('navbar.contact')}</Link>
                    <div>
                        <div className="flex justify-between items-center py-2 cursor-pointer" onClick={handleCategoryClick}>
                            <span className="text-lg font-medium">{t('navbar.categories')}</span>
                            <FaCaretDown className="ml-1 text-gray-400" />
                        </div>
                        {isCategoryDropdownVisible && (
                            <ul className="bg-gray-100 rounded-md py-2 mt-2">
                                {data?.map((category) => (
                                    <li key={category.name}>
                                        <Link
                                            to={`/category/${category.id}`}
                                            className="block px-4 py-2 hover:bg-gray-200"
                                            onClick={toggleMobileMenu}
                                        >
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}

            {isMobileSearchOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded-md w-11/12 max-w-md">
                        <div className="flex justify-between mb-2">
                            <span className="text-lg font-semibold">{t('navbar.search')}</span>
                            <FaTimes onClick={toggleMobileSearch} className="cursor-pointer" />
                        </div>
                        <input
                            type="text"
                            placeholder={t('navbar.searchPlaceholder')}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={searchQuery}
                            onChange={handleMobileSearchInputChange}
                        />
                        {searchResults.length > 0 && (
                            <ul className="mt-2">
                                {searchResults.map((result) => (
                                    <li key={result.id} className="py-2 border-b">
                                        <Link to={`/product/${result.id}`} onClick={toggleMobileSearch} className="hover:text-indigo-600">
                                            {result.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;