import { useState, useEffect } from 'react';

export function useProduct(slug) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const productData = await import(`../data/products/${slug}.json`);
        setProduct(productData.default);
        setError(null);
      } catch (err) {
        setError(`Product ${slug} not found`);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadProduct();
    }
  }, [slug]);

  return { product, loading, error };
}
