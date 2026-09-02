import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ArrowLeft, Lock } from 'lucide-react';
import { useCart } from '@/store/cart';
import { formatPrice } from '@/data/courses';
import CourseCover from '@/components/CourseCover';

const PROMO: Record<string, number> = { ATLAS10: 0.1 };

export default function Checkout() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [placing, setPlacing] = useState(false);

  const discount = applied ? subtotal * PROMO[applied] : 0;
  const total = useMemo(() => subtotal - discount, [subtotal, discount]);

  const applyCode = () => {
    const c = code.trim().toUpperCase();
    if (PROMO[c]) {
      setApplied(c);
      setError('');
    } else {
      setError('That code is not valid.');
      setApplied(null);
    }
  };

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPlacing(true);
    const orderNo = `AT-${Date.now().toString(36).toUpperCase()}`;
    setTimeout(() => {
      clear();
      navigate(`/order-success?order=${orderNo}&total=${total.toFixed(0)}`);
    }, 700);
  };

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-[1280px] px-5 py-24 text-center">
        <p className="section-no text-[#0057f3]">( CHECKOUT )</p>
        <h1 className="mt-3 font-display text-3xl font-black">Your cart is empty.</h1>
        <Link to="/courses" className="btn-pill mt-8 bg-[#0a0a0a] text-white">
          Browse catalog
        </Link>
      </main>
    );
  }

  const field =
    'w-full border border-[#0a0a0a] bg-white px-4 py-3 text-[14px] outline-none focus:border-[#0057f3] focus:ring-2 focus:ring-[#0057f3]/20';

  return (
    <main className="mx-auto max-w-[1280px] px-5 py-12">
      <Link to="/courses" className="label-caps inline-flex items-center gap-2 text-[#666] hover:text-[#0057f3]">
        <ArrowLeft size={14} /> Continue shopping
      </Link>
      <h1 className="mt-4 font-display text-[clamp(1.9rem,3.5vw,2.8rem)] font-black tracking-tight">Checkout</h1>

      <form onSubmit={placeOrder} className="mt-10 grid gap-12 lg:grid-cols-[1fr_400px]">
        {/* form column */}
        <div className="space-y-10">
          <section>
            <p className="section-no text-[#0057f3]">( 01 — CONTACT )</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input required placeholder="First name" className={field} aria-label="First name" />
              <input required placeholder="Last name" className={field} aria-label="Last name" />
              <input
                required
                type="email"
                placeholder="Email — course access is sent here"
                className={`${field} md:col-span-2`}
                aria-label="Email"
              />
            </div>
          </section>

          <section>
            <p className="section-no text-[#0057f3]">( 02 — PAYMENT )</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input
                required
                inputMode="numeric"
                placeholder="Card number"
                className={`${field} md:col-span-2`}
                aria-label="Card number"
              />
              <input required placeholder="MM / YY" className={field} aria-label="Expiry" />
              <input required inputMode="numeric" placeholder="CVC" className={field} aria-label="CVC" />
            </div>
            <p className="mt-3 flex items-center gap-2 text-[12px] text-[#666]">
              <Lock size={12} /> Demo checkout — no real charge is made.
            </p>
          </section>
        </div>

        {/* summary rail */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-[#0a0a0a] bg-white">
            <p className="border-b border-[#0a0a0a] px-6 py-4 label-caps">Order summary ({items.length})</p>
            <div className="max-h-[300px] overflow-y-auto px-6">
              {items.map((c) => (
                <div key={c.id} className="flex items-center gap-4 border-b border-[#e5e2df] py-4 last:border-0">
                  <div className="h-[48px] w-[64px] shrink-0">
                    <CourseCover course={c} className="h-full w-full" />
                  </div>
                  <p className="line-clamp-2 flex-1 font-display text-[13px] font-bold leading-snug">{c.title}</p>
                  <p className="font-mono text-[13px]">{formatPrice(c.price)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-[#0a0a0a] px-6 py-4">
              {applied ? (
                <p className="label-caps flex justify-between text-[#0057f3]">
                  <span>Code {applied} applied</span>
                  <button type="button" onClick={() => setApplied(null)} className="text-[#ff5102] underline">
                    Remove
                  </button>
                </p>
              ) : (
                <div className="flex gap-2">
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Promo code"
                    className={`${field} !py-2 text-[13px]`}
                    aria-label="Promo code"
                  />
                  <button type="button" onClick={applyCode} className="btn-pill bg-[#0a0a0a] !px-4 !py-2 text-white">
                    Apply
                  </button>
                </div>
              )}
              {error && <p className="mt-2 text-[12px] text-[#ff5102]">{error}</p>}
            </div>

            <div className="space-y-2 border-t border-[#0a0a0a] px-6 py-4 text-[14px]">
              <div className="flex justify-between text-[#666]">
                <span>Subtotal</span>
                <span className="font-mono">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#0057f3]">
                  <span>Discount ({applied})</span>
                  <span className="font-mono">−{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between border-t border-[#e5e2df] pt-3 font-display text-xl font-extrabold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="px-6 pb-6">
              <button
                type="submit"
                disabled={placing}
                className="btn-pill w-full justify-center bg-[#ff5102] text-white disabled:opacity-60"
              >
                {placing ? 'Processing…' : `Pay ${formatPrice(total)}`}
              </button>
              <p className="mt-3 text-center text-[12px] text-[#666]">30-day money-back guarantee.</p>
            </div>
          </div>
        </aside>
      </form>
    </main>
  );
}
