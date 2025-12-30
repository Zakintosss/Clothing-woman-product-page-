export default function Hero({ data }) {
  const { title, subtitle, video, ctaText } = data;

  return (
    <section className="hero-section">
      <div className="container">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <div className="center">
          <a href="#order" className="btn">{ctaText}</a>
        </div>
        {video && (
          <video
            className="hero-video"
            muted
            playsInline
            autoPlay
            preload="auto"
          >
            <source src={video} type="video/mp4" />
          </video>
        )}
      </div>
    </section>
  );
}
