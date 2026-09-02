import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { CATEGORIES } from '@/data/courses';
import { useCart } from '@/store/cart';

export default function SiteHeader() {
  const { count, setDrawerOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query.trim() ? `/courses?q=${encodeURIComponent(query.trim())}` : '/courses');
    setMenuOpen(false);
  };

  return (
    <>
      {/* announcement bar — editorial commerce pattern */}
      <div className="bg-[#0a0a0a] text-white text-center py-2 px-4 label-caps tracking-[0.18em]">
        Winter enrollment — save up to 40% with code <span className="text-[#cdfe00]">ATLAS10</span> at checkout
      </div>

      <header
        className={`sticky top-0 z-40 border-b border-[#0a0a0a] bg-[#f6f5f4] transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_8px_16px_rgba(0,0,0,0.08)]' : ''
        }`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center gap-6 px-5 py-4">
          <Link to="/" className="font-display text-[22px] font-black tracking-tight">
            ATLAS<span className="text-[#0057f3]">.</span>
          </Link>

          <nav className="hidden items-center gap-5 lg:flex">
            <NavLink to="/courses" className="label-caps hover:text-[#0057f3] transition-colors">
              All courses
            </NavLink>
            {CATEGORIES.slice(0, 4).map((c) => (
              <NavLink
                key={c}
                to={`/courses?category=${c}`}
                className="label-caps text-[#666] hover:text-[#0a0a0a] transition-colors"
              >
                {c}
              </NavLink>
            ))}
          </nav>

          <form onSubmit={submitSearch} className="ml-auto hidden items-center md:flex">
            <div className="flex items-center border border-[#0a0a0a] bg-white px-3 py-2">
              <Search size={14} strokeWidth={2.5} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses"
                className="w-40 bg-transparent px-2 text-[13px] outline-none placeholder:text-[#999]"
                aria-label="Search courses"
              />
            </div>
          </form>

          <button
            onClick={() => setDrawerOpen(true)}
            className="relative ml-auto flex items-center gap-2 md:ml-0"
            aria-label={`Open cart, ${count} items`}
          >
            <ShoppingBag size={20} strokeWidth={2} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#ff5102] font-mono text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>

          <button className="lg:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#0a0a0a] bg-[#f6f5f4] px-5 py-4 lg:hidden">
            <form onSubmit={submitSearch} className="mb-4 flex items-center border border-[#0a0a0a] bg-white px-3 py-2">
              <Search size={14} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses"
                className="w-full bg-transparent px-2 text-[13px] outline-none"
                aria-label="Search courses"
              />
            </form>
            <div className="flex flex-col gap-3">
              <Link to="/courses" onClick={() => setMenuOpen(false)} className="label-caps">
                All courses
              </Link>
              {CATEGORIES.map((c) => (
                <Link
                  key={c}
                  to={`/courses?category=${c}`}
                  onClick={() => setMenuOpen(false)}
                  className="label-caps text-[#666]"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
