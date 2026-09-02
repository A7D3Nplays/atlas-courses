import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { byId, type Course } from '@/data/courses';

interface CartState {
  items: Course[];
  count: number;
  subtotal: number;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
}

const CartContext = createContext<CartState | null>(null);
const STORAGE_KEY = 'atlas-cart-v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: string[] = raw ? JSON.parse(raw) : [];
      return parsed.filter((id) => byId(id));
    } catch {
      return [];
    }
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  const value = useMemo<CartState>(() => {
    const items = ids.map((id) => byId(id)!).filter(Boolean);
    return {
      items,
      count: items.length,
      subtotal: items.reduce((s, c) => s + c.price, 0),
      add: (id) => {
        setIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
        setDrawerOpen(true);
      },
      remove: (id) => setIds((prev) => prev.filter((x) => x !== id)),
      clear: () => setIds([]),
      has: (id) => ids.includes(id),
      drawerOpen,
      setDrawerOpen,
    };
  }, [ids, drawerOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
