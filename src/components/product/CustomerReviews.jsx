import ImageCarousel from '../shared/ImageCarousel';

export default function CustomerReviews({ data }) {
  const { sectionTitle, description, images } = data;

  return (
    <section style={{ background: '#fff' }}>
      <div className="container">
        <h2>{sectionTitle}</h2>
        {description && <p>{description}</p>}
        <ImageCarousel images={images} slidesPerView={2} />
      </div>
    </section>
  );
}
