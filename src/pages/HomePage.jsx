import { Link } from 'react-router-dom';
import productsData from '../data/products.json';

export default function HomePage() {
  const { products } = productsData;

  const calculateDiscount = (oldPrice, newPrice) => {
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  };

  return (
    <>
      {/* Hero Banner */}
      <section className="home-hero">
        <div className="home-hero-content">
          <h1>اكتشفي أناقتك</h1>
          <p>تشكيلة فاخرة من الملابس العصرية بأسعار مناسبة</p>
          <a href="#products" className="btn hero-btn">تسوقي الآن</a>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <span className="trust-icon">🚚</span>
              <h4>توصيل مجاني</h4>
              <p>لجميع أنحاء المغرب</p>
            </div>
            <div className="trust-item">
              <span className="trust-icon">💵</span>
              <h4>الدفع عند الاستلام</h4>
              <p>بدون مخاطر</p>
            </div>
            <div className="trust-item">
              <span className="trust-icon">✨</span>
              <h4>جودة مضمونة</h4>
              <p>منتجات أصلية 100%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="products-section">
        <div className="container">
          <div className="section-header">
            <h2>منتجاتنا المميزة</h2>
            <div className="header-line"></div>
          </div>
          <div className="product-grid">
            {products.map((product) => (
              <Link
                to={`/product/${product.slug}`}
                key={product.slug}
                className="product-card"
              >
                {product.oldPrice > product.price && (
                  <span className="sale-badge">
                    -{calculateDiscount(product.oldPrice, product.price)}%
                  </span>
                )}
                <div className="card-image">
                  <img src={product.thumbnail} alt={product.name} />
                  <div className="card-overlay">
                    <span className="view-btn">عرض المنتج</span>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{product.name}</h3>
                  <p>{product.shortDescription}</p>
                  <div className="price-info">
                    {product.oldPrice > product.price && (
                      <span className="old-price"><s>{product.oldPrice} درهم</s></span>
                    )}
                    <span className="current-price">{product.price} درهم</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us-section">
        <div className="container">
          <div className="section-header">
            <h2>لماذا تختارينا؟</h2>
            <div className="header-line"></div>
          </div>
          <div className="why-us-grid">
            <div className="why-us-item">
              <span className="why-icon">👗</span>
              <h4>تصاميم عصرية</h4>
              <p>أحدث صيحات الموضة بلمسة مغربية أصيلة</p>
            </div>
            <div className="why-us-item">
              <span className="why-icon">💎</span>
              <h4>خامات فاخرة</h4>
              <p>أقمشة عالية الجودة تدوم طويلاً</p>
            </div>
            <div className="why-us-item">
              <span className="why-icon">🎁</span>
              <h4>عروض حصرية</h4>
              <p>خصومات وعروض خاصة لزبوناتنا</p>
            </div>
            <div className="why-us-item">
              <span className="why-icon">📞</span>
              <h4>خدمة عملاء</h4>
              <p>فريق متاح للإجابة على استفساراتك</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
