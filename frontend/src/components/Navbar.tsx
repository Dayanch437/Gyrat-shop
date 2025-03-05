import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaGlobe, FaCaretDown, FaBars, FaTimes } from 'react-icons/fa';
import { useCategoryProducts } from '../Hooks/useCategoryProducts';
import { api } from '../api';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

// interface Product {
//     id: number;
//     name: string;
//     description: string;
//     //... diğer product properties
//  }

const Navbar: React.FC = () => {
    const { t } = useTranslation();
    const { data } = useCategoryProducts();
    const queryClient = useQueryClient();
    const navigate = useNavigate(); // useNavigate hook'u eklendi

    // State for category dropdown
    const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] =
        useState(false);
    const categoryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null
    );

    // State for language dropdown
    const [isLanguageDropdownVisible, setIsLanguageDropdownVisible] =
        useState(false);
    const languageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // State for mobile menu
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    

    // Arama İşlemi State'leri
    const [searchQuery, setSearchQuery] = useState('');
    const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);


    // Function to handle mouse enter event on the category dropdown
    const handleCategoryMouseEnter = () => {
        if (categoryTimeoutRef.current) {
            clearTimeout(categoryTimeoutRef.current);
        }
        setIsCategoryDropdownVisible(true);
    };

    // Function to handle mouse leave event on the category dropdown
    const handleCategoryMouseLeave = () => {
        categoryTimeoutRef.current = setTimeout(() => {
            setIsCategoryDropdownVisible(false);
        }, 200);
    };

    // Function to toggle category dropdown visibility on click
    const handleCategoryClick = () => {
        setIsCategoryDropdownVisible(!isCategoryDropdownVisible);
    };

    // Function to handle mouse enter event on the language dropdown
    const handleLanguageMouseEnter = () => {
        if (languageTimeoutRef.current) {
            clearTimeout(languageTimeoutRef.current);
        }
        setIsLanguageDropdownVisible(true);
    };

    // Function to handle mouse leave event on the language dropdown
    const handleLanguageMouseLeave = () => {
        languageTimeoutRef.current = setTimeout(() => {
            setIsLanguageDropdownVisible(false);
        }, 200);
    };

    // Function to toggle language dropdown visibility on click
    const handleLanguageClick = () => {
        setIsLanguageDropdownVisible(!isLanguageDropdownVisible);
    };
    
    // Function to toggle mobile menu
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

   // Arama Fonksiyonu
    const handleSearch = async (query: string) => {
        if (query) {
            navigate(`/search?q=${query}`);
         }
    };


   // Arama Input Değişiklik İşleyicisi
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        if (searchTimeoutRef.current) {
           clearTimeout(searchTimeoutRef.current);
        }

       searchTimeoutRef.current = setTimeout(() => {
            handleSearch(query);
       }, 300); // Add debounce for input changes
    };

    // Modified: Dil seçimini işleyeek fonksiyon with i18n.changeLanguage
    const handleLanguageChange = (selectedOption: string) => {
        const language = selectedOption;
       
        localStorage.setItem("language", language); // set in local storage
        api.defaults.headers.common["Accept-Language"] = language; // set in api

        i18n.changeLanguage(language).then(() => {
            queryClient.invalidateQueries(); // Invalidate react-query
            setIsLanguageDropdownVisible(false); //close dropdown
        });
    };

   // Modified: Sayfa yüklendiğinde localStorage'den dil ayarını al
   useEffect(() => {
        const language = localStorage.getItem("language") || "tk";
        i18n.changeLanguage(language); // Set i18n initial language
        api.defaults.headers.common["Accept-Language"] = language;
    }, []);

    return (
         <nav className="bg-white mx-auto container ">
            <div className="bg-white p-4 text-black flex items-center justify-between">
                {/* Logo section */}
                <div className="flex items-center">
                    <FaShoppingCart className="text-2xl mr-2" />
                    <span className="font-bold text-xl">Gyrat</span>
                </div>

                {/* Center menu for desktop */}
                <div className="hidden md:flex space-x-4">
                    <Link to="/" className="hover:text-gray-300">
                       {t("navbar.main")}
                    </Link>
                    <div
                        className="relative hover:text-gray-300 px-2"
                        onMouseEnter={handleCategoryMouseEnter}
                        onMouseLeave={handleCategoryMouseLeave}
                    >
                        {/* Category dropdown */}
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={handleCategoryClick}
                        >
                            <Link to="/category" className="flex items-center">
                            {t("navbar.categories")} <FaCaretDown className="ml-1 text-gray-400" />
                            </Link>
                        </div>
                        {isCategoryDropdownVisible && (
                            <ul className="absolute bg-white rounded-md shadow py-2 mt-2 w-48 z-10">
                                {data?.map((category) => (
                                    <li key={category.name}>
                                        <Link
                                            to={`/category/${category.id}`}
                                            className="block px-4 py-1 whitespace-nowrap text-gray-700 hover:text-gray-500"
                                        >
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <Link to="/contact" className="hover:text-gray-300">
                       {t("navbar.contact")}
                    </Link>
                </div>


               {/* Right section */}
                   <div className="flex items-center ml-auto md:ml-0">
                   
                    <div className="relative mr-4 flex items-center">
                       <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSearch(searchQuery);
                            }}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="bg-gray-100 text-black rounded-md px-3 py-1 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={searchQuery}
                                        onChange={handleSearchInputChange}
                                    />
                                    <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                       </form>
                        
                        {/* Mobile Menu Button - moved to right of search on mobile only */}
                        <div className="md:hidden ml-2">
                            <button onClick={toggleMobileMenu} className="text-gray-600 focus:outline-none">
                                {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                            </button>
                        </div>
                    </div>

                      {/* Language dropdown - hidden on mobile */}
                      <div
                        className="relative text-xl hover:text-gray-300 hidden md:flex"
                        onMouseEnter={handleLanguageMouseEnter}
                        onMouseLeave={handleLanguageMouseLeave}
                       >
                        <div className="cursor-pointer" onClick={handleLanguageClick}>
                            <FaGlobe />
                        </div>
                        {isLanguageDropdownVisible && (
                            <ul className="absolute bg-white rounded-md shadow py-2 mt-2 w-16 z-10 right-0 px-1">
                                <li>
                                    <button
                                        className="block px-4 py-1 text-gray-700 hover:text-gray-500 w-full text-left"
                                        onClick={() => handleLanguageChange("en")}
                                    >
                                        en
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="block px-4 py-1 text-gray-700 hover:text-gray-500 w-full text-left"
                                        onClick={() => handleLanguageChange("ru")}
                                    >
                                        ru
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="block px-4 py-1 text-gray-700 hover:text-gray-500 w-full text-left"
                                        onClick={() => handleLanguageChange("tk")}
                                    >
                                        tk
                                    </button>
                                </li>
                            </ul>
                        )}
                     </div>
                </div>
                {/* Mobile Menu */}
                   {isMobileMenuOpen && (
                      <div className="md:hidden fixed top-0 right-0 w-full h-full z-50">
                           {/* Background overlay */}
                            <div
                                className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
                                onClick={toggleMobileMenu}
                            ></div>

                          <div className={`absolute top-0 right-0 h-full bg-white shadow-md z-50 transform transition-transform duration-300 ease-in-out w-72 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                                {/* Close button */}
                                <div className="p-4 flex justify-start">
                                      <button onClick={toggleMobileMenu} className="text-gray-600 focus:outline-none">
                                        <FaTimes className="h-6 w-6" />
                                    </button>
                                </div>
                                <div className="flex flex-col p-4">
                                    <Link to="/" className="block py-2 hover:text-gray-500 text-lg font-medium" onClick={toggleMobileMenu}>
                                       {t("navbar.main")}
                                    </Link>
                                    <div className="relative">
                                       <div className="flex items-center justify-between py-2 cursor-pointer" onClick={handleCategoryClick}>
                                        <span className="text-lg font-medium">{t("navbar.categories")}</span>  <FaCaretDown className="ml-1 text-gray-400" />
                                    </div>
                                      {isCategoryDropdownVisible && (
                                        <ul className="bg-gray-100 rounded-md py-2 mt-1 w-full">
                                           {data?.map((category) => (
                                               <li key={category.name} className="p-2 hover:bg-gray-200">
                                               <Link
                                                    to={`/category/${category.id}`}
                                                    className="block py-2 whitespace-nowrap text-gray-700 hover:text-gray-500"
                                                    onClick={toggleMobileMenu}
                                                 >
                                                    {category.name}
                                               </Link>
                                              </li>
                                           ))}
                                        </ul>
                                       )}
                                    </div>
                                    <Link to="/contact" className="block py-2 hover:text-gray-500 text-lg font-medium" onClick={toggleMobileMenu}>
                                     {t("navbar.contact")}
                                  </Link>
                                    {/* Language Dropdown - inside mobile menu */}
                                    <div
                                        className="relative text-xl hover:text-gray-300 mt-4"
                                        onMouseEnter={handleLanguageMouseEnter}
                                        onMouseLeave={handleLanguageMouseLeave}
                                    >
                                       <div className="cursor-pointer" onClick={handleLanguageClick}>
                                            <FaGlobe />
                                        </div>
                                        {isLanguageDropdownVisible && (
                                            <ul className="absolute bg-white rounded-md shadow py-2 mt-2 w-24 z-10 right-32 px-1">
                                                <li>
                                                    <button
                                                        className="block px-4 py-1 text-gray-700 hover:text-gray-500 w-full text-left"
                                                        onClick={() => {handleLanguageChange("en"); toggleMobileMenu();}}
                                                    >
                                                        en
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className="block px-4 py-1 text-gray-700 hover:text-gray-500 w-full text-left"
                                                        onClick={() =>{ handleLanguageChange("ru"); toggleMobileMenu();}}
                                                    >
                                                        ru
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className="block px-4 py-1 text-gray-700 hover:text-gray-500 w-full text-left"
                                                        onClick={() =>{ handleLanguageChange("tk"); toggleMobileMenu();}}
                                                    >
                                                        tk
                                                    </button>
                                                </li>
                                            </ul>
                                        )}
                                     </div>

                                </div>
                            </div>
                      </div>
                   )}
            </div>
        </nav>
    );
};

export default Navbar;