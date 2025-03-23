import { useParams } from 'react-router-dom';
import { useProduct } from '../Hooks/useProducts';
import { useTranslation } from "react-i18next";

const ProductDetails = () => {
    const { data: products } = useProduct();
    const { t } = useTranslation();
    const { productId } = useParams<{ productId?: string }>();
    const product = products?.find(p => p.id === parseInt(productId || ''));

    if (!product) {
        return <div className="text-center text-gray-500 py-10 min-h-screen flex items-center justify-center">{t("titles.products_not_found")}</div>;
    }

    const { name, image, price, description, images = [] } = product;

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="min-h-screen flex flex-col">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                    {/* Product Image Section */}
                    <div className="w-full md:w-1/2">
                        <img src={image} alt={name} className="w-full h-[500px] object-cover rounded-lg" />
                        {images.length > 0 && (
                            <div className="grid grid-cols-3 gap-3 mt-6 overflow-x-auto p-2">
                                {images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.image}
                                        alt={`${name} - Image ${index + 1}`}
                                        className="w-full h-20 object-cover rounded-lg cursor-pointer transition transform hover:scale-105 hover:border-2 hover:border-blue-500"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info Section */}
                    <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-4">{name}</h2>
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-2xl font-semibold text-indigo-500">{price}</div>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">{t('navbar.pro_desk')}</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
                        </div>
                        {/* Add to Cart / Button Section (optional) */}
                        <div className="mt-auto">
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
