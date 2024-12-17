import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ImageCarousel Component
export default function ImageCarousel({ images }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      className="w-full h-48"
    >
      {images && images.length > 0 ? (
        images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <img
            src="/default-image-url.jpg"
            alt="Default"
            className="w-full h-full object-cover rounded-lg"
          />
        </SwiperSlide>
      )}
    </Swiper>
  );
}
