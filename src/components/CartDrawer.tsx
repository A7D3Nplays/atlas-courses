import { Link } from 'react-router';
import { X, ArrowRight } from 'lucide-react';
import { useCart } from '@/store/cart';
import { formatPrice } from '@/data/courses';
import CourseCover from './CourseCover';

/** Cart drawer — slides from the right via transform, per reference motion spec. */
export default function CartDrawer() {
  const { items, subtotal, remove, drawerOpen, setDrawerOpen } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          drawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-[#0a0a0a] px-6 py-5">
          <h2 className="font-display text-lg font-extrabold uppercase tracking-tight">
            Cart <span className="section-no text-[#666]">({items.length})</span>
          </h2>
          <button onClick={() => setDrawerOpen(false)} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <p className="label-caps text-[#666]">Your cart is empty</p>
              <p className="max-w-[240px] text-sm text-[#666]">
                Skills compound. Courses are the cheapest leverage you will ever buy.
              </p>
              <Link to="/courses" onClick={() => setDrawerOpen(false)} className="btn-pill bg-[#0a0a0a] text-white">
                Browse catalog
              </Link>
            </div>
          ) : (
            items.map((c) => (
              <div key={c.id} className="flex gap-4 border-b border-[#e5e2df] py-5">
                <Link to={`/course/${c.id}`} onClick={() => setDrawerOpen(false)} className="h-[72px] w-[96px] shrink-0">
                  <CourseCover course={c} className="h-full w-full object-cover" />
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="label-caps text-[#0057f3]">{c.category}</p>
                  <Link
                    to={`/course/${c.id}`}
                    onClick={() => setDrawerOpen(false)}
                    className="mt-1 line-clamp-2 font-display text-[14px] font-bold leading-snug hover:underline"
                  >
                    {c.title}
                  </Link>
                  <p className="mt-1 font-mono text-[13px]">{formatPrice(c.price)}</p>
                </div>
                <button
                  onClick={() => remove(c.id)}
                  className="self-start text-[#999] hover:text-[#ff5102]"
                  aria-label={`Remove ${c.title} from cart`}
                >
                  <X size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[#0a0a0a] px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="label-caps text-[#666]">Subtotal</span>
              <span className="font-display text-xl font-extrabold">{formatPrice(subtotal)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setDrawerOpen(false)}
              className="btn-pill w-full justify-center bg-[#0057f3] text-white"
            >
              Checkout <ArrowRight size={15} />
            </Link>
            <p className="mt-3 text-center text-[12px] text-[#666]">
              Lifetime access. 30-day money-back guarantee.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
