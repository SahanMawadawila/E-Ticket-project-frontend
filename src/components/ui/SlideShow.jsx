import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function SlideShow({ slides, slideStyle, imageStyle, baseURL }) {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={slideStyle}
      >
        {slides.map((slide, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={baseURL ? `${baseURL}/bus/${slide}` : slide}
                alt={`Slide ${index + 1}`}
                className={imageStyle}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
