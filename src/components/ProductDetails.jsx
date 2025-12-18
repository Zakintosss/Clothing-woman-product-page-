import ImageCarousel from './ImageCarousel';

const productImages = [
  { src: '/files/product.jpg', alt: 'تفاصيل المعطف 1' },
  { src: '/files/product 1.jpg', alt: 'تفاصيل المعطف 2' },
  { src: '/files/product 2.jpg', alt: 'تفاصيل المعطف 3' },
  { src: '/files/product 3.jpg', alt: 'تفاصيل المعطف 4' },
  { src: '/files/product4.jpg', alt: 'تفاصيل المعطف 5' },
  { src: '/files/product5.jpg', alt: 'تفاصيل المعطف 6' },
  { src: '/files/product6.jpg', alt: 'تفاصيل المعطف 7' },
];

export default function ProductDetails() {
  return (
    <section style={{ background: '#fff' }}>
      <div className="container">
        <h2>تفاصيل المنتج</h2>
        <ImageCarousel images={productImages} slidesPerView={2} />
      </div>
    </section>
  );
}
