import ImageCarousel from './ImageCarousel';

const customerImages = [
  { src: '/files/customer-1.jpg', alt: 'زبونة بعد التوصل بالطلب' },
  { src: '/files/customer-2.jpg', alt: 'زبونة جرّبت المعطف' },
  { src: '/files/customer-3.jpg', alt: 'تجربة زبونة' },
  { src: '/files/customer-4.jpg', alt: 'زبونة مع المعطف' },
];

export default function CustomerReviews() {
  return (
    <section style={{ background: '#fff' }}>
      <div className="container">
        <h2>تجارب الزبونات بعد التوصل بالطلب</h2>
        <p>صور حقيقية لزبونات جرّبو المعطف وشاركو تجربتهم</p>
        <ImageCarousel images={customerImages} slidesPerView={2} />
      </div>
    </section>
  );
}
