import Header from './components/Header';
import Hero from './components/Hero';
import ColorSection from './components/ColorSection';
import ProductDetails from './components/ProductDetails';
import StylingIdeas from './components/StylingIdeas';
import CustomerReviews from './components/CustomerReviews';
import OrderForm from './components/OrderForm';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* Background blobs */}
      <div className="bg-blob one"></div>
      <div className="bg-blob two"></div>
      <div className="bg-blob three"></div>

      <Header />
      <Hero />
      <ColorSection />
      <ProductDetails />
      <StylingIdeas />
      <CustomerReviews />
      <OrderForm />

      <footer>
        <p>© 2024 جميع الحقوق محفوظة</p>
      </footer>
    </div>
  );
}

export default App;
