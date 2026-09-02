import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Check,
  Clock,
  GraduationCap,
  Infinity as InfinityIcon,
  MonitorSmartphone,
  Pause,
  Play,
  PlayCircle,
  ShoppingBag,
  Users,
} from 'lucide-react';
import { byId, formatPrice, formatStudents } from '@/data/courses';
import { useCart } from '@/store/cart';
import { Stars } from '@/components/CourseCard';
import CourseCover from '@/components/CourseCover';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const COURSE_ID = 'typography-masters';
const TRAILER_SECONDS = 167; // 02:47

/** Chapter blurbs — landing-page-only copy, keyed by chapter index. */
const CHAPTER_BLURBS = [
  'Learn to see what a letterform is doing before you try to control it. We dissect classics and modern workhorses until classification stops being trivia and becomes a working tool.',
  'Columns, modules, and hang lines — then the disciplined art of breaking them. You rebuild a real magazine spread and defend every deviation.',
  'Decoration is a confession that hierarchy failed. Three levels, two axes, one rule set — and the exercises that make restraint feel like power.',
  'Pairing is system design, not taste. You leave with a type scale, a variable-font workflow, and a final project reviewed against professional references.',
];

const CREDENTIALS = [
  'Type Director on 40+ editorial and identity programs',
  'Eleven years at Pentagram, New York — partner-level type lead',
  'Work in the permanent collection of the Cooper Hewitt',
  'Juror, Type Directors Club annual competition, 2019–2025',
];

const TESTIMONIALS = [
  {
    quote:
      'I redid our entire marketing site into one type family after Typography Masters. Our bounce rate dropped 18%.',
    name: 'Lena Vogt',
    role: 'Design Lead, fintech',
  },
  {
    quote:
      'The first course that treated me like a working designer. The grid vs. architecture module alone paid for it.',
    name: 'Sam Okafor',
    role: 'Independent brand designer',
  },
  {
    quote:
      'Mara critiques like a partner, not a lecturer. Two of my course spreads went straight into my portfolio.',
    name: 'Yuki Hara',
    role: 'Editorial designer, publishing',
  },
];

const FAQS = [
  {
    q: 'Is this course right for my level?',
    a: 'It is an intermediate course. If you can set a paragraph in any design tool but your layouts still feel accidental, you are exactly who it was built for. Absolute beginners should expect to pause and rewatch; the assignments still work.',
  },
  {
    q: 'How long do I have access?',
    a: 'Lifetime. One payment, every future update included — including the variable-font module refresh planned for next season.',
  },
  {
    q: 'What if it is not for me?',
    a: 'Thirty days, no questions, full refund. Email support and it is done — no exit survey, no retention flow.',
  },
  {
    q: 'Are the assignments really reviewed?',
    a: 'Yes. Every module ends with a critique-driven assignment. Submissions are reviewed against professional references, and standout work is featured in the student showcase.',
  },
  {
    q: 'Do I get a certificate?',
    a: 'A verifiable certificate of completion, issued when you finish the final project. More useful: the four portfolio pieces you build along the way.',
  },
];

const fmt = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

/** Code-drawn trailer player — poster art, play/pause, animated timeline. No external media. */
function TrailerPlayer() {
  const course = byId(COURSE_ID)!;
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (playing) {
      timer.current = setInterval(() => {
        setElapsed((e) => {
          if (e + 1 >= TRAILER_SECONDS) {
            setPlaying(false);
            return TRAILER_SECONDS;
          }
          return e + 1;
        });
      }, 1000);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing]);

  const toggle = () => {
    if (elapsed >= TRAILER_SECONDS) setElapsed(0);
    setPlaying((p) => !p);
  };

  return (
    <div className="border border-[#0a0a0a] bg-[#0a0a0a]">
      <div className="relative aspect-[16/9] overflow-hidden">
        <CourseCover course={course} variant="a" className="h-full w-full" />
        <div className={`absolute inset-0 bg-[#0a0a0a]/45 transition-opacity ${playing ? 'opacity-0' : 'opacity-100'}`} />
        <button
          onClick={toggle}
          aria-label={playing ? 'Pause course trailer' : 'Play course trailer'}
          className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#ff5102] text-white transition-transform hover:scale-105 active:scale-95"
        >
          {playing ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
        </button>
        <p className="section-no absolute left-4 top-4 text-white/90">( TRAILER — 02:47 )</p>
        <p className="label-caps absolute right-4 top-4 bg-[#cdfe00] px-2 py-1 text-[#0a0a0a]">Free preview</p>
      </div>
      {/* timeline */}
      <div className="flex items-center gap-3 border-t border-white/15 px-4 py-3">
        <span className="font-mono text-[12px] text-white/80">{fmt(elapsed)}</span>
        <div className="relative h-[3px] flex-1 bg-white/20">
          <div
            className="absolute inset-y-0 left-0 bg-[#ff5102] transition-[width] duration-300"
            style={{ width: `${(elapsed / TRAILER_SECONDS) * 100}%` }}
          />
        </div>
        <span className="font-mono text-[12px] text-white/50">{fmt(TRAILER_SECONDS)}</span>
      </div>
    </div>
  );
}

export default function CourseLanding() {
  const course = byId(COURSE_ID)!;
  const { add, has } = useCart();
  const inCart = has(course.id);
  const lessonCount = course.chapters.reduce((s, ch) => s + ch.lessons.length, 0);

  return (
    <main>
      {/* ── hero ── */}
      <section className="border-b border-[#0a0a0a]">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-12 lg:grid-cols-2 lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="section-no text-[#ff5102]">( FEATURED COURSE — DESIGN )</p>
            <h1 className="mt-4 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-black leading-[1.0] tracking-tight">
              {course.title}
            </h1>
            <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-[#555]">
              {course.tagline} Fourteen hours, four portfolio pieces, and a critique method
              you will use for the rest of your career.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]">
              <span className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#ff5102]">{course.rating.toFixed(1)}</span>
                <Stars rating={course.rating} />
                <span className="text-[#999]">({course.ratingCount.toLocaleString()})</span>
              </span>
              <span className="flex items-center gap-1 text-[#666]">
                <Users size={13} /> {formatStudents(course.students)} students
              </span>
              <span className="flex items-center gap-1 text-[#666]">
                <Clock size={13} /> {course.hours} hours
              </span>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => add(course.id)}
                disabled={inCart}
                className={`btn-pill ${
                  inCart ? 'cursor-default bg-[#e5e2df] text-[#666]' : 'bg-[#ff5102] text-white'
                }`}
              >
                {inCart ? (
                  'In your cart'
                ) : (
                  <>
                    <ShoppingBag size={15} /> Enroll — {formatPrice(course.price)}
                    <span className="text-[12px] line-through opacity-70">{formatPrice(course.originalPrice!)}</span>
                  </>
                )}
              </button>
              {inCart ? (
                <Link to="/checkout" className="btn-pill bg-[#0a0a0a] text-white">
                  Go to checkout <ArrowRight size={14} />
                </Link>
              ) : (
                <Link to={`/course/${course.id}`} className="link-underline label-caps text-[#0a0a0a]">
                  Full course page
                </Link>
              )}
            </div>
            <p className="mt-4 flex items-center gap-2 text-[12.5px] text-[#666]">
              <BadgeCheck size={14} className="text-[#0057f3]" /> 30-day money-back guarantee · lifetime access
            </p>
          </div>
          <TrailerPlayer />
        </div>
      </section>

      {/* ── stat strip ── */}
      <section className="border-b border-[#0a0a0a] bg-white">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 md:grid-cols-4">
          {[
            [formatStudents(course.students), 'students enrolled'],
            [`${course.hours}h`, 'of studio-grade video'],
            [String(lessonCount), `lessons in ${course.chapters.length} chapters`],
            ['4', 'critiqued portfolio pieces'],
          ].map(([big, small], i) => (
            <div
              key={small}
              className={`px-6 py-8 ${i > 0 ? 'border-l border-[#0a0a0a]/15' : ''}`}
            >
              <p className="font-display text-3xl font-black tracking-tight">{big}</p>
              <p className="section-no mt-1 text-[#666]">{small.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── curriculum ── */}
      <section className="border-b border-[#0a0a0a]">
        <div className="mx-auto max-w-[1280px] px-5 py-16">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="section-no text-[#ff5102]">( 01 — CURRICULUM )</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">
                Four chapters. Zero filler.
              </h2>
            </div>
            <p className="section-no text-[#666]">
              {course.chapters.length} CHAPTERS · {lessonCount} LESSONS · {course.hours} HOURS
            </p>
          </div>

          <Accordion type="multiple" defaultValue={['ch-0']} className="mt-8 border border-[#0a0a0a] bg-white">
            {course.chapters.map((ch, i) => (
              <AccordionItem key={ch.title} value={`ch-${i}`} className="border-[#0a0a0a]/15 px-5 md:px-7">
                <AccordionTrigger className="py-5 hover:no-underline">
                  <span className="flex items-baseline gap-4 text-left">
                    <span className="section-no text-[#ff5102]">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="block font-display text-[17px] font-bold tracking-tight">{ch.title}</span>
                      <span className="section-no mt-1 block text-[#999]">
                        {ch.lessons.length} LESSONS
                        {ch.lessons.some((l) => l.free) && ' · FREE PREVIEW'}
                      </span>
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="max-w-2xl pb-4 text-[14px] leading-relaxed text-[#555]">{CHAPTER_BLURBS[i]}</p>
                  <ul className="space-y-1 pb-5">
                    {ch.lessons.map((l) => (
                      <li
                        key={l.title}
                        className="flex items-center gap-3 border border-transparent px-2 py-2 text-[13.5px] hover:border-[#0a0a0a]/15 hover:bg-[#f6f5f4]"
                      >
                        <PlayCircle size={14} className={l.free ? 'text-[#ff5102]' : 'text-[#999]'} />
                        <span className="flex-1">{l.title}</span>
                        {l.free && <span className="label-caps text-[#ff5102]">Preview</span>}
                        <span className="font-mono text-[12px] text-[#999]">{l.duration}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* ── instructor ── */}
      <section className="border-b border-[#0a0a0a] bg-[#0a0a0a] text-[#f6f5f4]">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 lg:grid-cols-[300px_1fr]">
          <div>
            {/* code-drawn portrait placeholder */}
            <div className="relative aspect-[4/5] overflow-hidden border border-[#f6f5f4]/25">
              <CourseCover course={course} variant="b" className="h-full w-full" />
              <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]/35">
                <span className="font-display text-7xl font-black tracking-tight text-white">MK</span>
              </div>
              <p className="section-no absolute bottom-3 left-3 text-white/80">( INSTRUCTOR )</p>
            </div>
          </div>
          <div>
            <p className="section-no text-[#ff5102]">( 02 — YOUR INSTRUCTOR )</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">{course.instructor.name}</h2>
            <p className="mt-1 text-[14px] text-[#f6f5f4]/70">{course.instructor.role}</p>
            <div className="mt-6 grid gap-8 md:grid-cols-2">
              <div className="space-y-4 text-[14.5px] leading-relaxed text-[#f6f5f4]/85">
                <p>
                  Mara spent eleven years setting type for the clients whose annual reports you have actually
                  read. She left partner-level work to teach, because the critique room was always the best
                  part of the job.
                </p>
                <p>
                  Her rule for this course: nothing is taught that she has not shipped. Every grid, every
                  pairing, every hierarchy decision is demonstrated on live client work — then rebuilt by you,
                  then critiqued against professional references.
                </p>
              </div>
              <ul className="space-y-3">
                {CREDENTIALS.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-[13.5px] text-[#f6f5f4]/85">
                    <Check size={15} className="mt-[2px] shrink-0 text-[#ff5102]" strokeWidth={3} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#f6f5f4]/15 pt-6">
              {[
                [GraduationCap, '18,420 students taught'],
                [BookOpen, '2 courses on ATLAS'],
                [Award, 'TDC Certificate of Excellence'],
              ].map(([Icon, text]) => {
                const I = Icon as typeof Check;
                return (
                  <span key={text as string} className="flex items-center gap-2 text-[12.5px] text-[#f6f5f4]/70">
                    <I size={14} className="text-[#cdfe00]" />
                    {text as string}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── testimonials ── */}
      <section className="border-b border-[#0a0a0a]">
        <div className="mx-auto max-w-[1280px] px-5 py-16">
          <p className="section-no text-[#ff5102]">( 03 — STUDENTS, ON THE RECORD )</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">What graduates say</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="flex flex-col border border-[#0a0a0a] bg-white p-6">
                <Stars rating={5} />
                <blockquote className="mt-4 flex-1 text-[14.5px] leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-5 border-t border-[#0a0a0a]/10 pt-4">
                  <p className="label-caps">{t.name}</p>
                  <p className="section-no mt-1 text-[#999]">{t.role.toUpperCase()}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── enroll ── */}
      <section className="border-b border-[#0a0a0a] bg-[#ff5102] text-white">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-5 py-16 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="section-no text-white/80">( 04 — ENROLL )</p>
            <h2 className="mt-2 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-black leading-[1.05] tracking-tight">
              Type is the last unfair advantage in design. Take it.
            </h2>
            <ul className="mt-6 grid gap-3 text-[14px] sm:grid-cols-2">
              {[
                [InfinityIcon, 'Lifetime access, all updates'],
                [MonitorSmartphone, `${course.hours} hours on any device`],
                [Award, 'Certificate of completion'],
                [Check, '30-day money-back guarantee'],
              ].map(([Icon, text]) => {
                const I = Icon as typeof Check;
                return (
                  <li key={text as string} className="flex items-center gap-3">
                    <I size={15} className="shrink-0" />
                    {text as string}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="border border-[#0a0a0a] bg-white p-7 text-[#0a0a0a]">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-4xl font-black tracking-tight">{formatPrice(course.price)}</span>
              <span className="text-[15px] text-[#999] line-through">{formatPrice(course.originalPrice!)}</span>
              <span className="label-caps bg-[#0a0a0a] px-2 py-1 text-white">
                −{Math.round((1 - course.price / course.originalPrice!) * 100)}%
              </span>
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
            <p className="mt-4 text-center text-[12px] text-[#999]">
              Promo code <span className="font-mono font-bold text-[#ff5102]">ATLAS10</span> takes another 10% off at
              checkout.
            </p>
          </div>
        </div>
      </section>

      {/* ── faq ── */}
      <section>
        <div className="mx-auto max-w-[880px] px-5 py-16">
          <p className="section-no text-center text-[#ff5102]">( 05 — QUESTIONS )</p>
          <h2 className="mt-2 text-center font-display text-3xl font-extrabold tracking-tight">
            Asked, answered
          </h2>
          <Accordion type="single" collapsible className="mt-8 border border-[#0a0a0a] bg-white">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`} className="border-[#0a0a0a]/15 px-5 md:px-7">
                <AccordionTrigger className="py-5 text-left hover:no-underline">
                  <span className="font-display text-[15px] font-bold tracking-tight">{f.q}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="pb-5 text-[14px] leading-relaxed text-[#555]">{f.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="mt-8 text-center text-[13px] text-[#666]">
            Still deciding?{' '}
            <Link to={`/course/${course.id}`} className="link-underline font-semibold text-[#0a0a0a]">
              Read the full course page
            </Link>{' '}
            or{' '}
            <Link to="/courses" className="link-underline font-semibold text-[#0a0a0a]">
              browse the catalog
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
