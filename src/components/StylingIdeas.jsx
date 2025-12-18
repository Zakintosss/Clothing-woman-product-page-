import ImageCarousel from './ImageCarousel';

const outfitImages = [
  { src: '/files/outfit 1.jpg', alt: 'إطلالة كاجوال' },
  { src: '/files/outfit 2.jpg', alt: 'إطلالة أنيقة' },
  { src: '/files/outfit 3.jpg', alt: 'إطلالة يومية' },
  { src: '/files/outfit 6.jpg', alt: 'إطلالة شتوية' },
];

export default function StylingIdeas() {
  return (
    <section>
      <div className="container">
        <h2>أفكار للتنسيق</h2>
        <p>كيفاش تلبسي المعطف في إطلالات مختلفة</p>
        <ImageCarousel images={outfitImages} slidesPerView={2} />
      </div>
    </section>
  );
}
