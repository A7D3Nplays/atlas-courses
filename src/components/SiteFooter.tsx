import { useState } from 'react';
import { Link } from 'react-router';
import { CATEGORIES } from '@/data/courses';

export default function SiteFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="border-t border-[#0a0a0a] bg-[#0a0a0a] text-[#f6f5f4]">
      {/* newsletter */}
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-5 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="section-no text-[#0057f3]">( NEWSLETTER )</p>
          <h2 className="mt-2 max-w-md font-display text-3xl font-extrabold tracking-tight">
            One lesson a week. No noise.
          </h2>
        </div>
        {subscribed ? (
          <p className="label-caps text-[#cdfe00]">You're in. First lesson lands Friday.</p>
        ) : (
          <form
            className="flex w-full max-w-md"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes('@')) setSubscribed(true);
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@work.com"
              className="w-full border border-[#f6f5f4]/30 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-[#f6f5f4]/40 focus:border-[#0057f3]"
              aria-label="Email address"
            />
            <button type="submit" className="btn-pill ml-3 bg-[#0057f3] text-white">
              Join
            </button>
          </form>
        )}
      </div>

      <div className="border-t border-[#f6f5f4]/15">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-8 px-5 py-12 md:grid-cols-4">
          <div>
            <p className="font-display text-xl font-black">
              ATLAS<span className="text-[#0057f3]">.</span>
            </p>
            <p className="mt-3 max-w-[220px] text-[13px] text-[#f6f5f4]/60">
              A course marketplace for people who intend to use what they learn.
            </p>
          </div>
          <div>
            <p className="label-caps text-[#f6f5f4]/50">Catalog</p>
            <ul className="mt-4 space-y-2 text-[13px]">
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <Link to={`/courses?category=${c}`} className="hover:text-[#0057f3]">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label-caps text-[#f6f5f4]/50">Company</p>
            <ul className="mt-4 space-y-2 text-[13px] text-[#f6f5f4]/80">
              <li>About</li>
              <li>Teach on ATLAS</li>
              <li>Careers</li>
              <li>Press</li>
            </ul>
          </div>
          <div>
            <p className="label-caps text-[#f6f5f4]/50">Support</p>
            <ul className="mt-4 space-y-2 text-[13px] text-[#f6f5f4]/80">
              <li>Help center</li>
              <li>Refunds — 30 days, no questions</li>
              <li>Terms</li>
              <li>Privacy</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-[#f6f5f4]/15">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-5 text-[12px] text-[#f6f5f4]/40">
          <span>© {new Date().getFullYear()} ATLAS Learning Co.</span>
          <span className="section-no">LEARN THE CRAFT / OWN THE SKILL</span>
        </div>
      </div>
    </footer>
  );
}
