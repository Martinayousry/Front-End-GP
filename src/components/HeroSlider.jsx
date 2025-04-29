import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function HeroSlider() {
  return (
    <div className="w-full  mx-auto sm:px-4 lg:px-8">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        className="shadow-lg"
      >
        {/* Slides */}
        <SwiperSlide>
          <img 
            src="/images/image 51.png" 
            alt="Slide 1" 
            className="w-full h-auto " 
          />
        </SwiperSlide>
        <SwiperSlide>
          <img 
            src="/images/kitten.jpeg" 
            alt="Slide 2" 
            className="w-full h-auto object-cover" 
          />
        </SwiperSlide>
        <SwiperSlide>
          <img 
            src="/images/image 51.png" 
            alt="Slide 3" 
            className="w-full h-auto " 
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
