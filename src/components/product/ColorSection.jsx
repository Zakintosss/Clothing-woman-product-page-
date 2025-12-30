import ImageCarousel from '../shared/ImageCarousel';

export default function ColorSection({ data }) {
  const { sectionTitle, items } = data;
  const images = items.map(item => ({ src: item.image, alt: item.name }));

  return (
    <section style={{ background: '#fff' }}>
      <div className="container">
        <h2>{sectionTitle}</h2>
        <ImageCarousel images={images} slidesPerView={2} />
      </div>
    </section>
  );
}
