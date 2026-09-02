import { Link, useParams } from 'react-router';
import { Check, Clock, PlayCircle, ShoppingBag, Infinity as InfinityIcon, Award, MonitorSmartphone } from 'lucide-react';
import { byId, formatPrice, formatStudents, related } from '@/data/courses';
import { useCart } from '@/store/cart';
import CourseCard, { Stars } from '@/components/CourseCard';
import CourseCover from '@/components/CourseCover';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function CourseDetail() {
  const { id } = useParams();
  const course = byId(id ?? '');
  const { add, has } = useCart();

  if (!course) {
    return (
      <main className="mx-auto max-w-[1280px] px-5 py-24 text-center">
        <h1 className="font-display text-3xl font-black">Course not found.</h1>
        <Link to="/courses" className="link-underline label-caps mt-4 inline-block">
          Back to catalog
        </Link>
      </main>
    );
  }

  const lessonCount = course.chapters.reduce((s, ch) => s + ch.lessons.length, 0);
  const inCart = has(course.id);

  return (
    <main>
      {/* breadcrumbs */}
      <nav className="mx-auto max-w-[1280px] px-5 pt-6 text-[12px] text-[#666]" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-[#0057f3]">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/courses" className="hover:text-[#0057f3]">Catalog</Link>
        <span className="mx-2">/</span>
        <Link to={`/courses?category=${course.category}`} className="hover:text-[#0057f3]">{course.category}</Link>
      </nav>

      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-10 lg:grid-cols-[1fr_360px]">
        {/* ── main column ── */}
        <div>
          <p className="section-no text-[#0057f3]">( {course.category.toUpperCase()} / {course.level.toUpperCase()} )</p>
          <h1 className="mt-3 font-display text-[clamp(1.9rem,3.6vw,3rem)] font-black leading-[1.02] tracking-tight">
            {course.title}
          </h1>
          <p className="mt-3 max-w-xl text-[17px] text-[#666]">{course.tagline}</p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
            <span className="flex items-center gap-2">
              <span className="font-mono font-bold text-[#ff5102]">{course.rating.toFixed(1)}</span>
              <Stars rating={course.rating} />
              <span className="text-[#999]">({course.ratingCount.toLocaleString()} ratings)</span>
            </span>
            <span className="section-no text-[#666]">{formatStudents(course.students)} STUDENTS</span>
            <span className="flex items-center gap-1 text-[#666]"><Clock size={13} /> {course.hours} hours</span>
          </div>

          <div className="cover-stack mt-8 aspect-[16/9] border border-[#0a0a0a]">
            <CourseCover course={course} variant="a" className="h-full w-full" />
            <div className="cover-b"><CourseCover course={course} variant="b" className="h-full w-full" /></div>
          </div>

          {/* (01) overview */}
          <section className="mt-14">
            <p className="section-no text-[#0057f3]">( 01 — OVERVIEW )</p>
            <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed">{course.description}</p>
          </section>

          {/* (02) outcomes */}
          <section className="mt-14">
            <p className="section-no text-[#0057f3]">( 02 — WHAT YOU'LL BE ABLE TO DO )</p>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {course.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 border border-[#0a0a0a] bg-white p-4 text-[14px]">
                  <Check size={16} className="mt-[2px] shrink-0 text-[#0057f3]" strokeWidth={3} />
                  {o}
                </li>
              ))}
            </ul>
          </section>

          {/* (03) curriculum — numbered accordion */}
          <section className="mt-14">
            <div className="flex items-end justify-between">
              <p className="section-no text-[#0057f3]">( 03 — CURRICULUM )</p>
              <p className="section-no text-[#666]">{course.chapters.length} CHAPTERS · {lessonCount} LESSONS</p>
            </div>
            <Accordion type="multiple" className="mt-5 border border-[#0a0a0a] bg-white">
              {course.chapters.map((ch, i) => (
                <AccordionItem key={ch.title} value={`ch-${i}`} className="border-[#0a0a0a]/15 px-5">
                  <AccordionTrigger className="py-4 hover:no-underline">
                    <span className="flex items-baseline gap-4 text-left">
                      <span className="section-no text-[#ff5102]">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-display text-[15px] font-bold tracking-tight">{ch.title}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1 pb-4">
                      {ch.lessons.map((l) => (
                        <li
                          key={l.title}
                          className="flex items-center gap-3 px-2 py-2 text-[13.5px] hover:bg-[#f6f5f4]"
                        >
                          <PlayCircle size={14} className={l.free ? 'text-[#0057f3]' : 'text-[#999]'} />
                          <span className="flex-1">{l.title}</span>
                          {l.free && <span className="label-caps text-[#0057f3]">Preview</span>}
                          <span className="font-mono text-[12px] text-[#999]">{l.duration}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* (04) instructor */}
          <section className="mt-14">
            <p className="section-no text-[#0057f3]">( 04 — INSTRUCTOR )</p>
            <div className="mt-5 flex items-center gap-5 border border-[#0a0a0a] bg-white p-6">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center font-display text-xl font-black text-white"
                style={{ background: course.palette.accent === '#cdfe00' ? '#0a0a0a' : course.palette.accent }}
              >
                {course.instructor.name.split(' ').map((w) => w[0]).join('')}
              </div>
              <div>
                <p className="font-display text-lg font-bold">{course.instructor.name}</p>
                <p className="text-[13px] text-[#666]">{course.instructor.role}</p>
              </div>
            </div>
          </section>
        </div>

        {/* ── sticky pricing rail ── */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-[#0a0a0a] bg-white">
            <div className="border-b border-[#0a0a0a] p-6">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-4xl font-black tracking-tight">{formatPrice(course.price)}</span>
                {course.originalPrice && (
                  <>
                    <span className="text-[15px] text-[#999] line-through">{formatPrice(course.originalPrice)}</span>
                    <span className="label-caps bg-[#ff5102] px-2 py-1 text-white">
                      −{Math.round((1 - course.price / course.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
              <p className="section-no mt-2 text-[#666]">ONE-TIME · LIFETIME ACCESS</p>
              <button
                onClick={() => add(course.id)}
                disabled={inCart}
                className={`btn-pill mt-5 w-full justify-center ${
                  inCart ? 'cursor-default bg-[#e5e2df] text-[#666]' : 'bg-[#0057f3] text-white'
                }`}
              >
                {inCart ? 'In your cart' : <><ShoppingBag size={15} /> Add to cart</>}
              </button>
              {inCart && (
                <Link to="/checkout" className="btn-pill mt-3 w-full justify-center bg-[#0a0a0a] text-white">
                  Go to checkout
                </Link>
              )}
            </div>
            <ul className="space-y-3 p-6 text-[13.5px]">
              {[
                [InfinityIcon, 'Lifetime access, all updates included'],
                [MonitorSmartphone, `${course.hours} hours on any device`],
                [Award, 'Certificate of completion'],
                [Check, '30-day money-back guarantee'],
              ].map(([Icon, text]) => {
                const I = Icon as typeof Check;
                return (
                  <li key={text as string} className="flex items-center gap-3">
                    <I size={15} className="shrink-0 text-[#0057f3]" />
                    {text as string}
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>

      {/* related */}
      <section className="border-t border-[#0a0a0a]">
        <div className="mx-auto max-w-[1280px] px-5 py-14">
          <p className="section-no text-[#0057f3]">( 05 — KEEP GOING )</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight">Related courses</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related(course).map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
