import ImageCarousel from './ImageCarousel';

const colorImages = [
  { src: '/files/BLACK.jpg', alt: 'أسود' },
  { src: '/files/BROWN.jpg', alt: 'بني' },
  { src: '/files/GRAY.jpg', alt: 'رمادي' },
  { src: '/files/SAFFRON.jpg', alt: 'زعفراني' },
];

export default function ColorSection() {
  return (
    <section style={{ background: '#fff' }}>
      <div className="container">
        <h2>متوفر في 4 ألوان</h2>
        <ImageCarousel images={colorImages} slidesPerView={2} />
      </div>
    </section>
  );
}
