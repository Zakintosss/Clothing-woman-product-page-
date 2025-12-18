export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <h1>معطف شتوي أنيق وناعم</h1>
        <p>دفء الشتاء بلمسة فخامة</p>
        <div className="center">
          <a href="#order" className="btn">اطلبي الآن</a>
        </div>
        <video
          className="hero-video"
          muted
          playsInline
          autoPlay
          preload="auto"
        >
          <source src="/files/video-hero.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
