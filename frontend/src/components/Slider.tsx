import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSlider  } from "../Hooks/useSlider";




const BannerSlider: React.FC = () => {
  const { data: banner } = useSlider()
  const settings = {
    dots: true,
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
    <div className="w-full relative ">
      <Slider {...settings}>
        {banner?.map((banner) => ( // Artık import edilen banners dizisini kullanıyoruz
          <div key={banner.id} className="relative w-full">
            {/* Banner içeriği (aynı kalıyor) */}
            <div
              className="w-full relative h-[300px] md:h-[400px] lg:h-[500px]"
              style={{
                backgroundImage: `url(${banner.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white p-6 md:p-12">
                <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">{banner.title}</h1>
                {banner.sub_title && <p className="text-lg md:text-2xl mb-8 text-center leading-relaxed">{banner.sub_title}</p>}
                
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;