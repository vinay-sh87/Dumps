import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper_custom.css";

export default function HeroSlider() {
  const slides = [
    {
      tag: "CHAIR",
      title: "THE GOOD STUFF",
      image: "/images/slide1.jpg",
    },
    {
      tag: "SOFA",
      title: "MODERN COMFORT",
      image: "/images/slide2.jpg",
    },
    {
      tag: "LIGHT",
      title: "WARM AMBIENCE",
      image: "/images/slide3.png",
    },
  ];

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        style={{ height: "100%" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 6rem",
                background: `url(${slide.image}) center/cover no-repeat`,
              }}
            >
              <div style={{ maxWidth: 500 }}>
                <p style={{ color: "#d97706", letterSpacing: 2 }}>
                  {slide.tag}
                </p>
                <h1 style={{ fontSize: "2.5rem", fontWeight: 600 }}>
                  {slide.title}
                </h1>
                <button
                  style={{
                    marginTop: "1.5rem",
                    padding: "0.75rem 2rem",
                    border: "1px solid #d97706",
                    background: "transparent",
                    cursor: "pointer",
                    color: "#d97706",
                    fontWeight: "500",
                  }}
                >
                  VIEW MORE →
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
