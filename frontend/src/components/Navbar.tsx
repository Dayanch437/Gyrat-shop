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

    // Category dropdown
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

    // Language dropdown
    const handleLanguageMouseEnter = () => {
        if (languageTimeoutRef.current) clearTimeout(languageTimeoutRef.current);
        setIsLanguageDropdownVisible(true);
    };

    const handleLanguageMouseLeave = () => {
        languageTimeoutRef.current = setTimeout(() => {
            setIsLanguageDropdownVisible(false);
        }, 200);
    };

    // Mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const fetchSearchResults = async (query: string) => {
        try {
            const response = await api.get<Product[]>(`/products?search=${query}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching search results:", error);
            return [];
        }
    };

    const handleMobileSearch = async (query: string) => {
        console.log("Mobile search query:", query);
        const results = await fetchSearchResults(query);
        setSearchResults(results);
    };

    const handleDesktopSearch = (query: string) => {
        console.log("Desktop search query:", query);
        navigate(`/search?q=${query}`); // Navigate to the search page
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        console.log("Search input changed:", query);

        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

        searchTimeoutRef.current = setTimeout(() => {
            handleDesktopSearch(query);
        }, 300);
    };

    const handleMobileSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        console.log("Mobile search input changed:", query);

        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

        searchTimeoutRef.current = setTimeout(() => {
            handleMobileSearch(query);
        }, 300);
    };

    const handleLanguageChange = (selectedOption: string) => {
        const language = selectedOption;
        localStorage.setItem('language', language);
        api.defaults.headers.common['Accept-Language'] = language;
        i18n.changeLanguage(language).then(() => {
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
        <nav className="bg-white mx-auto container">
            <div className="bg-white p-4 text-black flex items-center justify-between transition-all duration-300 ease-in-out">
                <div className="flex items-center">
                    <FaShoppingCart className="text-2xl mr-2" />
                    <span className="font-bold text-xl">Gyrat</span>
                </div>

                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:text-gray-500 transition-all duration-300 ease-in-out">
                        {t('navbar.main')}
                    </Link>

                    <div
                        className="relative group hover:text-gray-500 transition-all duration-300 ease-in-out"
                        onMouseEnter={handleCategoryMouseEnter}
                        onMouseLeave={handleCategoryMouseLeave}
                    >
                        <div className="flex items-center cursor-pointer" onClick={handleCategoryClick}>
                            <Link to="/category" className="flex items-center">
                                {t('navbar.categories')} <FaCaretDown className="ml-1 text-gray-400" />
                            </Link>
                        </div>
                        {isCategoryDropdownVisible && (
                            <ul className="absolute bg-white rounded-md shadow-lg py-2 mt-2 w-48 z-10 transition-all duration-300 ease-in-out">
                                {data?.map((category) => (
                                    <li key={category.name}>
                                        <Link
                                            to={`/category/${category.id}`}
                                            className="block px-4 py-1 text-gray-700 hover:text-gray-500"
                                        >
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <Link to="/contact" className="hover:text-gray-500 transition-all duration-300 ease-in-out">
                        {t('navbar.contact')}
                    </Link>
                </div>

                <div className="flex items-center ml-auto md:ml-0 space-x-4">
                    <div className="relative flex items-center hidden md:block">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleDesktopSearch(searchQuery);
                            }}
                        >
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-gray-100 text-black rounded-md px-3 py-1 pl-8 focus:outline-none transition-all duration-300 ease-in-out w-64 sm:w-80"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                                ref={searchInputRef}
                            />
                            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </form>
                    </div>

                    <div className="md:hidden cursor-pointer text-xl hover:text-gray-500" onClick={toggleMobileSearch}>
                        <FaSearch />
                    </div>

                    <div
                        className="relative cursor-pointer text-xl hover:text-gray-500"
                        onMouseEnter={handleLanguageMouseEnter}
                        onMouseLeave={handleLanguageMouseLeave}
                    >
                        <FaGlobe />
                        {isLanguageDropdownVisible && (
                            <ul className="absolute bg-white rounded-md shadow-lg py-2 mt-2 w-16 z-10 right-0 px-1 transition-all duration-300 ease-in-out">
                                {['en', 'ru', 'tk'].map((language) => (
                                    <li key={language}>
                                        <button
                                            className="block px-4 py-1 text-gray-700 hover:text-gray-500 w-full text-left"
                                            onClick={() => handleLanguageChange(language)}
                                        >
                                            {language}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="md:hidden flex items-center cursor-pointer" onClick={toggleMobileMenu}>
                    <FaBars className='ml-4' />
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden fixed top-0 left-0 w-full h-full z-50">
                        <div
                            className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
                            onClick={closeMobileMenu}
                        ></div>
                        <div className="bg-white p-4 w-4/5 max-w-xs absolute top-0 right-0 z-60">
                            <div className="flex justify-between items-center">
                                <FaTimes onClick={closeMobileMenu} className="cursor-pointer text-xl" />
                            </div>

                            <Link to="/" className="block text-lg py-2" onClick={closeMobileMenu}>
                                {t('navbar.main')}
                            </Link>
                            <Link to="/category" className="block text-lg py-2" onClick={closeMobileMenu}>
                                {t('navbar.categories')}
                            </Link>
                            <Link to="/contact" className="block text-lg py-2" onClick={closeMobileMenu}>
                                {t('navbar.contact')}
                            </Link>

                            {isMobileSearchOpen && (
                                <div className="mt-4">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="bg-gray-100 text-black rounded-md px-3 py-1 focus:outline-none transition-all duration-300 ease-in-out w-full"
                                        value={searchQuery}
                                        onChange={handleMobileSearchInputChange}
                                    />
                                    <ul className="mt-2">
                                        {searchResults.length > 0 &&
                                            searchResults.map((result) => (
                                                <li key={result.id} className="py-2">
                                                    <Link
                                                        to={`/product/${result.id}`}
                                                        className="text-gray-700 hover:text-gray-500"
                                                        onClick={closeMobileMenu}
                                                    >
                                                        {result.name}
                                                    </Link>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
