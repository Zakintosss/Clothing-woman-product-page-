import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import Hero from '../components/product/Hero';
import ColorSection from '../components/product/ColorSection';
import ProductDetails from '../components/product/ProductDetails';
import StylingIdeas from '../components/product/StylingIdeas';
import CustomerReviews from '../components/product/CustomerReviews';
import OrderForm from '../components/product/OrderForm';

export default function ProductPage() {
  const { slug } = useParams();
  const { product, loading, error } = useProduct(slug);

  if (loading) {
    return (
      <div className="loading">
        <p>جاري التحميل...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-page">
        <h2>المنتج غير موجود</h2>
        <p>عذراً، لم نتمكن من إيجاد هذا المنتج</p>
      </div>
    );
  }

  return (
    <>
      <Hero data={product.hero} />
      <ColorSection data={product.colors} />
      <ProductDetails data={product.gallery} />
      {product.styling?.enabled !== false && <StylingIdeas data={product.styling} />}
      {product.reviews?.enabled !== false && <CustomerReviews data={product.reviews} />}
      <OrderForm data={product.order} productSlug={slug} />
    </>
  );
}
