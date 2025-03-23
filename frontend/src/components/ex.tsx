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
    // Diğer ürün özellikleri...
}

const Navbar: React.FC = () => {
    const { t } = useTranslation();
    const { data } = useCategoryProducts();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    // State management
    const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] = useState(false);
    const [isLanguageDropdownVisible, setIsLanguageDropdownVisible] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
    const [searchResults, setSearchResults] = useState<Product[]>([]);

    const categoryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const languageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const searchInputRef = useRef<HTMLInputElement>(null); // Ref for the search input

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

    const handleLanguageClick = () => {
        setIsLanguageDropdownVisible(!isLanguageDropdownVisible);
    };

    // Mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Arama sonuçlarını getiren fonksiyon
    const fetchSearchResults = async (query: string) => {
        try {
            // API endpoint'i buraya uygun şekilde ayarlayın
            const response = await api.get<Product[]>(`/products?search=${query}`); // Örnek endpoint
            return response.data; // Return the data; don't set state here directly
        } catch (error) {
            console.error("Arama sonuçları alınırken hata oluştu:", error);
            return [];
        }
    };

    // Mobile search - updates the state
    const handleMobileSearch = async (query: string) => {
        console.log("handleMobileSearch - query:", query);
        const results = await fetchSearchResults(query);
        setSearchResults(results);
    };

    // Desktop search - navigates to the search page
    const handleDesktopSearch = (query: string) => {
        console.log("handleDesktopSearch - query:", query);
        navigate(`/search?q=${query}`); // Navigate to the search page
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        console.log("handleSearchInputChange - query:", query);

        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

        searchTimeoutRef.current = setTimeout(() => {
            handleDesktopSearch(query); // Desktop search!
        }, 300);
    };

    // Handle Mobile search input change
    const handleMobileSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        console.log("handleMobileSearchInputChange - query:", query);

        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

        searchTimeoutRef.current = setTimeout(() => {
            handleMobileSearch(query); // Desktop search!
        }, 300);
    };

    // Language change
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

        // Focus the search input on mount (desktop)
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    // Mobile Search Bar Functionality
    const toggleMobileSearch = () => {
        setIsMobileSearchOpen(!isMobileSearchOpen);
        setSearchResults([]); // Arama çubuğu açıldığında sonuçları temizle
        setSearchQuery(''); // Arama çubuğu açıldığında sorguyu temizle
    };

    return (
        <nav className="bg-white mx-auto container">
            <div className="bg-white p-4 text-black flex items-center justify-between transition-all duration-300 ease-in-out">
                {/* Logo Section */}
                <div className="flex items-center">
                    <FaShoppingCart className="text-2xl mr-2" />
                    <span className="font-bold text-xl">Gyrat</span>
                </div>

                {/* Desktop Menu */}
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

                {/* Right Section */}
                <div className="flex items-center ml-auto md:ml-0 space-x-4">

                    {/* Desktop Search Bar */}
                    <div className="relative flex items-center hidden md:block">
                        <form onSubmit={(e) => {
                            e.preventDefault();  // Prevent default form submission
                            handleDesktopSearch(searchQuery); // Manually trigger desktop search
                        }}>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="bg-gray-100 text-black rounded-md px-3 py-1 pl-8 focus:outline-none transition-all duration-300 ease-in-out w-64 sm:w-80"
                                value={searchQuery}
                                onChange={handleSearchInputChange} // Use the *same* change handler
                                ref={searchInputRef} // Add the ref here
                            />
                            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </form>
                    </div>

                    {/* Mobile Search Icon */}
                    <div className="md:hidden cursor-pointer text-xl hover:text-gray-500" onClick={toggleMobileSearch}>
                        <FaSearch />
                    </div>

                    {/* Mobile Language Dropdown */}
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

                {/* Mobile Menu */}
                <div className="md:hidden flex items-center cursor-pointer" onClick={toggleMobileMenu}>
                    <FaBars />
                </div>
                  {/* Mobile Menu Content */}
                                {isMobileMenuOpen && (
                                    <div className="md:hidden fixed top-0 right-0 w-full h-full z-50">
                                        <div
                                            className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
                                            onClick={toggleMobileMenu}
                                        ></div>
                                        <div className="absolute top-0 right-0 w-72 h-full bg-white shadow-lg z-50 p-4 transform transition-transform duration-300 ease-in-out">
                                            <button
                                                onClick={toggleMobileMenu}
                                                className="text-gray-600 focus:outline-none mb-4"
                                            >
                                                <FaTimes className="h-6 w-6" />
                                            </button>
                                            <div className="space-y-4">
                                                <Link
                                                    to="/"
                                                    className="block py-2 text-lg font-medium hover:text-gray-500"
                                                    onClick={toggleMobileMenu}
                                                >
                                                    {t('navbar.main')}
                                                </Link>
                                                <Link
                                                    to="/contact"
                                                    className="block py-2 text-lg font-medium hover:text-gray-500"
                                                    onClick={toggleMobileMenu}
                                                >
                                                    {t('navbar.contact')}
                                                </Link>
                                                <div>
                                                    <div className="flex items-center justify-between py-2 cursor-pointer" onClick={handleCategoryClick}>
                                                        <span className="text-lg font-medium">{t('navbar.categories')}</span>
                                                        <FaCaretDown className="ml-1 text-gray-400" />
                                                    </div>
                                                    {isCategoryDropdownVisible && (
                                                        <ul className="bg-gray-100 rounded-md py-2 mt-2 space-y-2">
                                                            {data?.map((category) => (
                                                                <li key={category.name}>
                                                                    <Link
                                                                        to={`/category/${category.id}`}
                                                                        className="block px-4 py-2 text-gray-700 hover:text-gray-500"
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
                                        </div>
                                    </div>
                                )}

                {/* Mobile Search Bar Popup */}
                {isMobileSearchOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
                        <div className="bg-white rounded-md p-4 w-11/12 max-w-md">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-lg font-semibold">{t('navbar.search')}</span>
                                <button onClick={toggleMobileSearch} className="text-gray-600 hover:text-gray-800 focus:outline-none">
                                    <FaTimes className="h-6 w-6" />
                                </button>
                            </div>
                            <form onSubmit={(e) => {
                                e.preventDefault();

                            }}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder={t('navbar.searchPlaceholder')}
                                        className="w-full bg-gray-100 text-black rounded-md px-3 py-2 pl-10 focus:outline-none transition-all duration-300 ease-in-out"
                                        value={searchQuery}
                                        onChange={handleMobileSearchInputChange}  // Mobile Change Handler
                                    />
                                    <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </form>
                            {/* Arama Sonuçları */}
                            {searchResults.length > 0 && (
                                <ul className="mt-2">
                                    {searchResults.map((result) => (
                                        <li key={result.id} className="py-2 border-b border-gray-200">
                                            <Link
                                                to={`/product/${result.id}`}
                                                onClick={toggleMobileSearch}
                                                className="block hover:text-blue-500"
                                            >
                                                {result.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;