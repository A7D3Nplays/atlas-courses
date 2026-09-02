import { Link } from 'react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CATEGORIES, COURSES, formatStudents } from '@/data/courses';
import CourseCard from '@/components/CourseCard';
import CourseCover from '@/components/CourseCover';

const heroCourse = COURSES.find((c) => c.id === 'typography-masters')!;
const featured = COURSES.filter((c) => c.bestseller);
const fresh = COURSES.filter((c) => c.isNew);

const TESTIMONIALS = [
  {
    quote: 'I rebuilt our entire marketing site two weeks after Typography Masters. Our bounce rate dropped 18%.',
    name: 'Lena Ortiz',
    role: 'Design lead, Series B startup',
    course: 'Typography Masters',
  },
  {
    quote: 'The first React course that treated me like a working engineer. The state architecture module alone paid for it.',
    name: 'Sam Duarte',
    role: 'Senior frontend engineer',
    course: 'React in Production',
  },
  {
    quote: 'I stopped exporting broken CSVs to my manager and started answering the actual question. SQL for Analysts rewired how I work.',
    name: 'Grace Okafor',
    role: 'Operations analyst',
    course: 'SQL for Analysts',
  },
  {
    quote: 'One window, one strobe. My portrait work is unrecognizable from six months ago.',
    name: 'Nils Bergström',
    role: 'Freelance photographer',
    course: 'Photographic Light',
  },
  {
    quote: 'Finally read my own P&L before my board did. That meeting went very differently.',
    name: 'Amara Diallo',
    role: 'Founder, two-person SaaS',
    course: 'Finance for Founders',
  },
];

export default function Home() {
  return (
    <main>
      {/* ── (00) HERO — split-screen 50/50, copy left, full-bleed cover right ── */}
      <section className="grid border-b border-[#0a0a0a] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-16 md:px-12 lg:py-24">
          <p className="section-no text-[#0057f3]">( 00 — CATALOG OPEN )</p>
          <h1 className="mt-4 font-display text-[clamp(2.6rem,5.5vw,4.6rem)] font-black leading-[0.98] tracking-tight">
            Learn the craft.
            <br />
            Own the skill.
          </h1>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[#666]">
            {COURSES.length} studio-grade courses across design, code, data, and business. Taught by practitioners,
            built around assignments, priced like tools — not tuition.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/courses" className="btn-pill bg-[#0a0a0a] text-white">
              Browse the catalog <ArrowRight size={15} />
            </Link>
            <Link to={`/course/${heroCourse.id}`} className="link-underline label-caps text-[#0a0a0a]">
              Featured: {heroCourse.title.split(':')[0]}
            </Link>
          </div>
          <div className="mt-12 flex gap-10 border-t border-[#0a0a0a]/15 pt-6">
            {[
              ['120k+', 'students'],
              ['4.8', 'avg. rating'],
              ['30 days', 'money-back'],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-display text-2xl font-extrabold">{v}</p>
                <p className="section-no mt-1 text-[#666]">{l.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
        <Link to={`/course/${heroCourse.id}`} className="cover-stack block min-h-[320px] lg:min-h-0" aria-label={heroCourse.title}>
          <CourseCover course={heroCourse} variant="a" className="absolute inset-0 h-full w-full" />
          <div className="cover-b">
            <CourseCover course={heroCourse} variant="b" className="h-full w-full" />
          </div>
        </Link>
      </section>

      {/* ── (01) CATEGORIES — flat index row ── */}
      <section className="border-b border-[#0a0a0a]">
        <div className="mx-auto max-w-[1280px] px-5 py-14">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="section-no text-[#0057f3]">( 01 — INDEX )</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Shop by discipline</h2>
            </div>
            <Link to="/courses" className="link-underline label-caps hidden md:block">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 border-l border-t border-[#0a0a0a] md:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map((c) => {
              const n = COURSES.filter((x) => x.category === c).length;
              return (
                <Link
                  key={c}
                  to={`/courses?category=${c}`}
                  className="group flex aspect-[4/3] flex-col justify-between border-b border-r border-[#0a0a0a] p-4 transition-colors duration-300 hover:bg-[#0a0a0a] hover:text-[#f6f5f4]"
                >
                  <ArrowUpRight size={16} className="self-end opacity-0 transition-opacity group-hover:opacity-100" />
                  <div>
                    <p className="font-display text-lg font-bold tracking-tight">{c}</p>
                    <p className="section-no mt-1 text-[#666] group-hover:text-[#f6f5f4]/60">
                      {n} COURSE{n > 1 ? 'S' : ''}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── (02) BESTSELLERS ── */}
      <section className="border-b border-[#0a0a0a]">
        <div className="mx-auto max-w-[1280px] px-5 py-14">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="section-no text-[#0057f3]">( 02 — PROVEN )</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Bestsellers</h2>
            </div>
            <p className="section-no hidden text-[#666] md:block">
              {formatStudents(featured.reduce((s, c) => s + c.students, 0))} STUDENTS ENROLLED
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ── (03) NEW ── */}
      <section className="border-b border-[#0a0a0a] bg-white">
        <div className="mx-auto max-w-[1280px] px-5 py-14">
          <div className="mb-8">
            <p className="section-no text-[#ff5102]">( 03 — JUST DROPPED )</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">New this season</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fresh.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ── (04) TESTIMONIALS — staggered masonry ── */}
      <section className="border-b border-[#0a0a0a]">
        <div className="mx-auto max-w-[1280px] px-5 py-16">
          <p className="section-no text-[#0057f3]">( 04 — RECEIPTS )</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Students, on the record</h2>
          <div className="mt-10 columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6">
            {TESTIMONIALS.map((t, i) => (
              <blockquote
                key={t.name}
                className={`break-inside-avoid border border-[#0a0a0a] bg-white p-6 ${i % 3 === 1 ? 'lg:translate-y-6' : ''}`}
              >
                <p className="font-display text-[17px] font-medium leading-snug">“{t.quote}”</p>
                <footer className="mt-5 border-t border-[#e5e2df] pt-4">
                  <p className="label-caps">{t.name}</p>
                  <p className="mt-1 text-[12px] text-[#666]">{t.role}</p>
                  <p className="section-no mt-2 text-[#0057f3]">{t.course.toUpperCase()}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── (05) CTA ── */}
      <section className="bg-[#0057f3] text-white">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-black leading-tight tracking-tight">
            The skill you buy today compounds for a decade.
          </h2>
          <Link to="/courses" className="btn-pill bg-white text-[#0a0a0a]">
            Start learning <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
