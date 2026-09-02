import { Routes, Route } from 'react-router';
import { CartProvider } from '@/store/cart';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import CartDrawer from '@/components/CartDrawer';
import Home from '@/pages/Home';
import Catalog from '@/pages/Catalog';
import CourseDetail from '@/pages/CourseDetail';
import Checkout from '@/pages/Checkout';
import OrderSuccess from '@/pages/OrderSuccess';

export default function App() {
  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Catalog />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
        <SiteFooter />
      </div>
      <CartDrawer />
    </CartProvider>
  );
}
