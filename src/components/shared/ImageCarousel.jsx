import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ImageCarousel({ images, slidesPerView = 1 }) {
  const swiperRef = useRef(null);

  const handleSwiper = (swiper) => {
    swiperRef.current = swiper;
    // Force update after a short delay to fix width calculation
    setTimeout(() => {
      if (swiper && !swiper.destroyed) {
        swiper.update();
      }
    }, 150);
  };

  useEffect(() => {
    // Additional update on mount
    const timer = setTimeout(() => {
      if (swiperRef.current && !swiperRef.current.destroyed) {
        swiperRef.current.update();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Swiper
      onSwiper={handleSwiper}
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={slidesPerView}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={images.length > 1}
      observer={true}
      observeParents={true}
      resizeObserver={true}
      updateOnWindowResize={true}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: Math.min(2, slidesPerView),
          spaceBetween: 15,
        },
        768: {
          slidesPerView: slidesPerView,
          spaceBetween: 20,
        },
      }}
      className="image-carousel"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <img src={img.src} alt={img.alt} loading="lazy" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
