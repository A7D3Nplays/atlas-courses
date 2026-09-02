import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { CATEGORIES, COURSES, type Category } from '@/data/courses';
import CourseCard from '@/components/CourseCard';

type SortKey = 'popular' | 'rating' | 'price-asc' | 'price-desc';
const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'All levels'] as const;

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const category = (params.get('category') as Category | null) ?? null;
  const q = (params.get('q') ?? '').toLowerCase();
  const [level, setLevel] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>('popular');

  const results = useMemo(() => {
    let list = COURSES.filter(
      (c) =>
        (!category || c.category === category) &&
        (!level || c.level === level) &&
        (!q ||
          c.title.toLowerCase().includes(q) ||
          c.tagline.toLowerCase().includes(q) ||
          c.instructor.name.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q))
    );
    switch (sort) {
      case 'rating': list = [...list].sort((a, b) => b.rating - a.rating); break;
      case 'price-asc': list = [...list].sort((a, b) => a.price - b.price); break;
      case 'price-desc': list = [...list].sort((a, b) => b.price - a.price); break;
      default: list = [...list].sort((a, b) => b.students - a.students);
    }
    return list;
  }, [category, level, q, sort]);

  const setCategory = (c: Category | null) => {
    const next = new URLSearchParams(params);
    if (c) next.set('category', c); else next.delete('category');
    setParams(next);
  };

  return (
    <main className="mx-auto max-w-[1280px] px-5 py-12">
      <p className="section-no text-[#0057f3]">( CATALOG )</p>
      <h1 className="mt-2 font-display text-[clamp(2rem,4vw,3.2rem)] font-black tracking-tight">
        {category ?? (q ? `“${q}”` : 'All courses')}
      </h1>
      <p className="mt-2 text-[#666]">
        {results.length} result{results.length !== 1 ? 's' : ''}
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr]">
        {/* filters */}
        <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
          <div>
            <p className="label-caps mb-3 text-[#666]">Discipline</p>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start lg:gap-1">
              <button
                onClick={() => setCategory(null)}
                className={`label-caps px-2 py-1 text-left transition-colors ${!category ? 'bg-[#0a0a0a] text-white' : 'hover:text-[#0057f3]'}`}
              >
                All
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(category === c ? null : c)}
                  className={`label-caps px-2 py-1 text-left transition-colors ${category === c ? 'bg-[#0a0a0a] text-white' : 'hover:text-[#0057f3]'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="label-caps mb-3 text-[#666]">Level</p>
            <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start lg:gap-1">
              <button
                onClick={() => setLevel(null)}
                className={`label-caps px-2 py-1 text-left transition-colors ${!level ? 'bg-[#0a0a0a] text-white' : 'hover:text-[#0057f3]'}`}
              >
                Any
              </button>
              {LEVELS.map((l) => (
                <button
                  key={l}
                  onClick={() => setLevel(level === l ? null : l)}
                  className={`label-caps px-2 py-1 text-left transition-colors ${level === l ? 'bg-[#0a0a0a] text-white' : 'hover:text-[#0057f3]'}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* results */}
        <div>
          <div className="mb-6 flex items-center justify-between border-y border-[#0a0a0a] py-3">
            <span className="section-no text-[#666]">SORT</span>
            <div className="flex gap-4">
              {(
                [
                  ['popular', 'Most popular'],
                  ['rating', 'Top rated'],
                  ['price-asc', 'Price ↑'],
                  ['price-desc', 'Price ↓'],
                ] as [SortKey, string][]
              ).map(([k, label]) => (
                <button
                  key={k}
                  onClick={() => setSort(k)}
                  className={`label-caps transition-colors ${sort === k ? 'text-[#0057f3] underline underline-offset-4' : 'text-[#666] hover:text-[#0a0a0a]'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {results.length === 0 ? (
            <div className="border border-[#0a0a0a] bg-white p-16 text-center">
              <p className="font-display text-xl font-bold">Nothing matches that filter.</p>
              <p className="mt-2 text-sm text-[#666]">Try widening the discipline or clearing the search.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
