import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function App() {
  const slides = [
    "images/background4.jpg",
    "images/background3.jpg",
    "images/background1.jpg",
    "images/background2.jpg",
  ];
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
        className="mySwiper"
        style={{ height: "80vh" }}
      >
        {slides.map((slide, index) => {
          return (
            <SwiperSlide key={index}>
              <img src={slide} alt={`Slide ${index + 1}`} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
