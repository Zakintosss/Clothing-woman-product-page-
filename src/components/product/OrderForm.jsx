import { useState, useEffect } from 'react';

export default function OrderForm({ data, productSlug }) {
  const { sectionTitle, sizes, availableColors, pricing, maxQuantity, webhookUrl } = data;

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const [colors, setColors] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [timer, setTimer] = useState(8 * 60 * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleColorChange = (color) => {
    if (colors.includes(color)) {
      setColors(colors.filter(c => c !== color));
    } else if (colors.length < quantity) {
      setColors([...colors, color]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!size) newErrors.size = true;
    if (colors.length === 0) newErrors.colors = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    const payload = {
      productSlug,
      name,
      phone,
      city,
      size,
      quantity,
      colors: colors.join(', '),
      total: pricing[quantity].total,
    };

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        if (window.fbq) window.fbq('track', 'Purchase');
        setSubmitted(true);
      } else {
        alert('حدث خطأ، يرجى المحاولة مرة أخرى');
      }
    } catch {
      alert('حدث خطأ، يرجى المحاولة مرة أخرى');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="order">
        <div className="container">
          <div className="thank-you-box">
            <div className="success-icon">✓</div>
            <h2>تم تأكيد طلبك بنجاح!</h2>
            <p className="thank-you-main">شكراً لثقتك بنا</p>
            <div className="order-summary">
              <p><strong>ملخص الطلب:</strong></p>
              <p>{quantity} قطعة - مقاس {size}</p>
              <p>الألوان: {colors.join('، ')}</p>
              <p className="total-highlight">{pricing[quantity].total} درهم</p>
            </div>
            <p className="thank-you-note">سيتواصل معك فريقنا خلال 24 ساعة لتأكيد التوصيل</p>
            <div className="delivery-info">
              <span>🚚 التوصيل مجاني</span>
              <span>💵 الدفع عند الاستلام</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="order">
      <div className="container">
        <h2>{sectionTitle}</h2>
        <div className="offer-box">
          <p className="urgency">
            ⏰ العرض ينتهي خلال: <span id="timer">{formatTime(timer)}</span>
          </p>

          <form onSubmit={handleSubmit}>
            {/* Quantity */}
            <p className="label">اختاري الكمية:</p>
            <div className="qty-options">
              {Array.from({ length: maxQuantity }, (_, i) => i + 1).map(q => (
                <label key={q} className={quantity === q ? 'selected' : ''}>
                  <input
                    type="radio"
                    name="quantity"
                    value={q}
                    checked={quantity === q}
                    onChange={() => {
                      setQuantity(q);
                      setColors(colors.slice(0, q));
                    }}
                  />
                  {q} {q === 1 ? 'قطعة' : 'قطع'}
                </label>
              ))}
            </div>

            {/* Size */}
            <p className="label">اختاري المقاس:</p>
            {errors.size && <p className="error">يرجى اختيار المقاس</p>}
            <div className="size-options">
              {sizes.map(s => (
                <label key={s} className={size === s ? 'selected' : ''}>
                  <input
                    type="radio"
                    name="size"
                    value={s}
                    checked={size === s}
                    onChange={() => setSize(s)}
                  />
                  {s}
                </label>
              ))}
            </div>

            {/* Colors */}
            <p className="label">اختاري اللون ({colors.length}/{quantity}):</p>
            {errors.colors && <p className="error">يرجى اختيار لون واحد على الأقل</p>}
            <div className="color-options">
              {availableColors.map(c => (
                <label
                  key={c}
                  className={colors.includes(c) ? 'selected' : ''}
                  style={{ opacity: !colors.includes(c) && colors.length >= quantity ? 0.5 : 1 }}
                >
                  <input
                    type="checkbox"
                    checked={colors.includes(c)}
                    onChange={() => handleColorChange(c)}
                    disabled={!colors.includes(c) && colors.length >= quantity}
                  />
                  {c}
                </label>
              ))}
            </div>

            {/* Price */}
            <div className="price-display">
              <p className="old-price"><s>{pricing[quantity].oldPrice} درهم</s></p>
              <p className="total-price">{pricing[quantity].total} درهم</p>
              <p className="unit-price">({pricing[quantity].unit} درهم للقطعة)</p>
              <p className="discount-note">{pricing[quantity].note}</p>
            </div>

            {/* Customer Info */}
            <input
              type="text"
              placeholder="الاسم الكامل"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="رقم الهاتف"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="المدينة"
              value={city}
              onChange={e => setCity(e.target.value)}
              required
            />

            <button
              type="submit"
              className="btn submit-btn"
              disabled={isLoading}
              style={{ opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading ? (
                <span className="loading-text">
                  <span className="spinner"></span>
                  جاري الإرسال...
                </span>
              ) : (
                'تأكيد الطلب'
              )}
            </button>
          </form>

          <p className="legal-note">
            الدفع عند الاستلام · التوصيل مجاني
          </p>
        </div>
      </div>
    </section>
  );
}
