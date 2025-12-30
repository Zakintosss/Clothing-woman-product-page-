import ImageCarousel from '../shared/ImageCarousel';

export default function ProductDetails({ data }) {
  const { sectionTitle, images } = data;

  return (
    <section style={{ background: '#fff' }}>
      <div className="container">
        <h2>{sectionTitle}</h2>
        <ImageCarousel images={images} slidesPerView={2} />
      </div>
    </section>
  );
}
