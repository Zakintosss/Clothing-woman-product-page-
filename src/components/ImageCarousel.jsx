import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ImageCarousel({ images, slidesPerView = 1 }) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop={images.length > 1}
      breakpoints={{
        768: {
          slidesPerView: slidesPerView,
        },
      }}
      className="image-carousel"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <img src={img.src} alt={img.alt} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
