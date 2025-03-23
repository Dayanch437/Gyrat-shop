import React from 'react';
import { lazy, Suspense } from "react";
import { Route, Routes } from 'react-router-dom';

// Hata sınırı bileşeni (aşağıdaki gibi tanımlanabilir)
// import ErrorBoundary from './components/ErrorBoundary';

const Navbar = lazy(() => import("./components/Navbar"));
const Slider = lazy(() => import("./components/Slider"));
const Products = lazy(() => import('./components/Product'));
const ProductDetails = lazy(() => import('./components/ProductDetails'));
const Footer = lazy(() => import("./components/Footer"));
const CategoryProducts = lazy(() => import('./components/CategoryProducts'));
const Contact = lazy(() => import('./components/Contact'));
const Categories = lazy(() => import("./components/Categories"));
const SearchPage = lazy(() => import("./components/SearchPage"));

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Tüm uygulama için Suspense */}
      <Suspense fallback={<div className="flex justify-center items-center h-screen">Yükleniyor...</div>}>
        {/* Hata Sınırı (isteğe bağlı) */}
        {/* <ErrorBoundary> */}
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <Slider />
                <Products />
              </>
            } />
            <Route path="/contact" element={<Contact />} />
            <Route path="/category" element={<Categories />} />
            <Route path="/category/:category" element={<CategoryProducts />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
          <Footer />
        {/* </ErrorBoundary> */}
      </Suspense>
    </div>
  );
};

export default App;