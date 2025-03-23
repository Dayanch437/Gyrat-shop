import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSlider } from "../Hooks/useSlider";
import { motion } from "framer-motion"; // Framer Motion ekliyoruz

const BannerSlider: React.FC = () => {
  const { data: banner } = useSlider();
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {banner?.map((banner) => (
          <div key={banner.id} className="relative w-full">
            {/* Banner içeriği (görsel efektler ve modern tasarım) */}
            <motion.div
              className="w-full relative h-[300px] md:h-[400px] lg:h-[500px]"
              style={{
                backgroundImage: `url(${banner.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white p-6 md:p-12">
                <motion.h1 
                  className="text-3xl md:text-5xl font-bold mb-4 text-center"
                  whileHover={{ scale: 1.1, textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {banner.title}
                </motion.h1>
                {banner.sub_title && (
                  <motion.p 
                    className="text-lg md:text-2xl mb-8 text-center leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    {banner.sub_title}
                  </motion.p>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
