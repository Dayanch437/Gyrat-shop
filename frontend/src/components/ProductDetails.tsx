import { useParams } from 'react-router-dom';
import { useProduct } from '../Hooks/useProducts';
import { useTranslation } from "react-i18next";

const ProductDetails = () => {
    const {data:products}=useProduct()
    const { t } = useTranslation();
  const { productId } = useParams<{ productId?: string }>();
  const product = products?.find(p => p.id === parseInt(productId || ''));

  if (!product) {
    return <div className="text-center text-gray-500 py-10 min-h-screen flex items-center justify-center">{t("titles.products_not_found")}</div>;
  }

  const { name, image, price, description, images = [] } = product;

  return (
    <div className="mx-auto container">
      <div className="min-h-screen flex flex-col">  {/* Flex layout for responsiveness */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex-grow">
          <div className="md:grid md:grid-cols-2 md:gap-4">
            <div>
              <img src={image} alt={name} className="w-full h-[500px] object-cover rounded" />
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4 overflow-x-auto p-2">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image.image}
                      alt={`${name} - Image ${index + 1}`}
                      className="w-full h-24 object-cover rounded cursor-pointer border border-gray-300 hover:border-blue-500 transition duration-300"
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="p-6 flex flex-col justify-between"> {/* Flex layout for content */}
              <div> {/* Content wrapper */}
                <h2 className="text-xl font-semibold text-gray-700">{name}</h2> {/* Display product name */}
                <div className="flex justify-between items-center mb-4">
                  <div className="text-lg font-semibold text-gray-700">{price}</div>
                </div>
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">{t('navbar.pro_desk')}</h2>
                  <p className="text-gray-700 leading-relaxed">{description}</p>
                </div>
              </div>
              {/* You can add related products or other content here. It will be pushed to the bottom */}
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;