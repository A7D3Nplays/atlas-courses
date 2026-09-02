export type Category = 'Design' | 'Development' | 'Data' | 'Marketing' | 'Business' | 'Photography';

export const CATEGORIES: Category[] = ['Design', 'Development', 'Data', 'Marketing', 'Business', 'Photography'];

export type PatternKind = 'arcs' | 'grid' | 'stripes' | 'dots' | 'wave' | 'blocks';

export interface Lesson {
  title: string;
  duration: string;
  free?: boolean;
}

export interface Chapter {
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  tagline: string;
  category: Category;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All levels';
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  students: number;
  hours: number;
  instructor: { name: string; role: string };
  description: string;
  outcomes: string[];
  chapters: Chapter[];
  palette: { bg: string; fg: string; accent: string; pattern: PatternKind };
  bestseller?: boolean;
  isNew?: boolean;
}

const ls = (titles: [string, string][], freeFirst = false): Lesson[] =>
  titles.map(([title, duration], i) => ({ title, duration, free: freeFirst && i === 0 }));

export const COURSES: Course[] = [
  {
    id: 'typography-masters',
    title: 'Typography Masters: Layout, Hierarchy & the Grid',
    tagline: 'Set type like the studios that shaped the canon.',
    category: 'Design',
    level: 'Intermediate',
    price: 89,
    originalPrice: 139,
    rating: 4.9,
    ratingCount: 2314,
    students: 18420,
    hours: 14,
    instructor: { name: 'Mara Kessler', role: 'Type Director, ex-Pentagram' },
    description:
      'A working course in editorial typography. You will rebuild real layouts — magazine spreads, book jackets, product pages — and learn why the grid is a negotiation, not a cage. Every module ends with a critique-driven assignment reviewed against professional references.',
    outcomes: [
      'Build modular grids that survive real content',
      'Pair a display face with a text face without clashing',
      'Control hierarchy with size, weight, and spacing — not decoration',
      'Run a type critique using measurable criteria',
    ],
    chapters: [
      { title: 'Foundations: Letterform Anatomy', lessons: ls([['Reading a letterform', '18:24', ], ['Classification systems that matter', '22:10'], ['Optical size and why defaults lie', '16:45'], ['Assignment: audit a homepage', '09:12']], true) },
      { title: 'The Grid as Negotiation', lessons: ls([['Columns, modules, and hang lines', '24:31'], ['Breaking the grid with intent', '19:08'], ['Case study: a magazine spread rebuild', '27:44']]) },
      { title: 'Hierarchy Without Decoration', lessons: ls([['Size, weight, and space only', '21:15'], ['The three-level rule', '14:52'], ['Exercise: strip the color, keep the meaning', '11:37']]) },
      { title: 'Pairing & Systems', lessons: ls([['Display meets text', '23:40'], ['Variable fonts in production', '18:29'], ['Building a type scale that scales', '20:05'], ['Final project brief', '12:18']]) },
    ],
    palette: { bg: '#0a0a0a', fg: '#f6f5f4', accent: '#ff5102', pattern: 'stripes' },
    bestseller: true,
  },
  {
    id: 'react-production',
    title: 'React in Production: Architecture That Scales',
    tagline: 'From side-project React to systems a team can maintain.',
    category: 'Development',
    level: 'Advanced',
    price: 129,
    originalPrice: 189,
    rating: 4.8,
    ratingCount: 1891,
    students: 12760,
    hours: 21,
    instructor: { name: 'Devon Achebe', role: 'Staff Engineer, fintech' },
    description:
      'This is the React course for people who already ship React. State colocation, server components, data-fetching boundaries, and the boring decisions that decide whether a codebase is a joy or a liability at year two. Every pattern is built inside a real storefront codebase.',
    outcomes: [
      'Design data flow before writing components',
      'Choose server vs. client rendering per route, with reasons',
      'Kill prop drilling without reaching for a global store',
      'Profile and fix re-render storms',
    ],
    chapters: [
      { title: 'Mental Models', lessons: ls([['UI = f(state), and what that costs', '19:41'], ['The render lifecycle, honestly', '24:02'], ['Assignment: map your app\'s state ownership', '10:30']], true) },
      { title: 'State Architecture', lessons: ls([['Colocation first', '22:14'], ['Server state is not client state', '26:47'], ['When a store earns its place', '18:33']]) },
      { title: 'Rendering Strategy', lessons: ls([['Server components in practice', '28:15'], ['Streaming and suspense boundaries', '21:56'], ['Case study: storefront rebuild', '32:20']]) },
      { title: 'Performance Forensics', lessons: ls([['Reading a flamegraph', '17:44'], ['Memoization that helps vs. noise', '20:12'], ['Final project: the slow checkout', '15:03']]) },
    ],
    palette: { bg: '#0057f3', fg: '#ffffff', accent: '#cdfe00', pattern: 'blocks' },
    bestseller: true,
  },
  {
    id: 'sql-analytics',
    title: 'SQL for Analysts: From SELECT to Strategy',
    tagline: 'Ask better questions of your warehouse.',
    category: 'Data',
    level: 'Beginner',
    price: 69,
    rating: 4.7,
    ratingCount: 3204,
    students: 31200,
    hours: 11,
    instructor: { name: 'Priya Raman', role: 'Head of Analytics, marketplace' },
    description:
      'Learn SQL the way analysts actually use it: messy tables, ambiguous questions, stakeholders waiting. You will work inside a realistic warehouse — orders, events, refunds — and finish able to own a metrics question end to end.',
    outcomes: [
      'Write joins and window functions without fear',
      'Turn a vague business question into a query plan',
      'Spot the three classic ways aggregates lie',
      'Document a metric so nobody re-litigates it',
    ],
    chapters: [
      { title: 'Query Fluency', lessons: ls([['SELECT, WHERE, and the order of operations', '16:20'], ['Joins as set thinking', '21:45'], ['Assignment: the refund mystery', '08:50']], true) },
      { title: 'Aggregation & Windows', lessons: ls([['GROUP BY without tears', '19:30'], ['Window functions change everything', '25:12'], ['Cohorts in pure SQL', '22:41']]) },
      { title: 'Metrics That Hold Up', lessons: ls([['Defining "active user"', '14:26'], ['Fanout traps and how to catch them', '18:09'], ['Final project: build a metrics layer', '26:33']]) },
    ],
    palette: { bg: '#f6f5f4', fg: '#0a0a0a', accent: '#0057f3', pattern: 'grid' },
  },
  {
    id: 'brand-strategy',
    title: 'Brand Strategy: Positioning That Survives Contact',
    tagline: 'Strategy decks are easy. Strategy is not.',
    category: 'Marketing',
    level: 'Intermediate',
    price: 99,
    rating: 4.8,
    ratingCount: 1204,
    students: 9840,
    hours: 9,
    instructor: { name: 'Jonas Lindqvist', role: 'Brand Strategist, indie consultancy' },
    description:
      'A positioning course built on teardown discipline. You will deconstruct twelve real brands, write positioning statements that a CFO can\'t fudge, and pressure-test them against actual competitive moves — not mood boards.',
    outcomes: [
      'Write a positioning statement with teeth',
      'Run a competitive frame-of-reference analysis',
      'Separate brand essence from campaign noise',
      'Present strategy to a skeptical room',
    ],
    chapters: [
      { title: 'What Positioning Is Not', lessons: ls([['Taglines, purposes, and other distractions', '17:02'], ['The frame of reference decision', '20:18']], true) },
      { title: 'The Teardown Method', lessons: ls([['Reading a brand like an analyst', '24:55'], ['Twelve brands, twelve verdicts', '31:40'], ['Assignment: teardown your own employer', '12:05']]) },
      { title: 'Writing Strategy', lessons: ls([['The one-page strategy', '19:47'], ['Stress tests and kill criteria', '16:58'], ['Final project: defend your positioning', '14:22']]) },
    ],
    palette: { bg: '#ff5102', fg: '#ffffff', accent: '#0a0a0a', pattern: 'arcs' },
    isNew: true,
  },
  {
    id: 'python-data',
    title: 'Python for Data Work: Pandas, Plotting, Pipelines',
    tagline: 'Notebook habits that survive production.',
    category: 'Data',
    level: 'Beginner',
    price: 79,
    originalPrice: 119,
    rating: 4.7,
    ratingCount: 2876,
    students: 26510,
    hours: 16,
    instructor: { name: 'Sofia Marín', role: 'Data Engineer, retail group' },
    description:
      'Start with a CSV, end with a pipeline another human can run. Pandas fundamentals, plotting that communicates instead of decorates, and the hygiene — environments, tests, structure — that separates analysis from archaeology.',
    outcomes: [
      'Reshape, join, and aggregate dataframes fluently',
      'Choose the right chart and defend the choice',
      'Refactor a notebook into a runnable pipeline',
      'Write tests for data, not just code',
    ],
    chapters: [
      { title: 'Dataframe Thinking', lessons: ls([['Indexes, dtypes, and copies vs. views', '20:14'], ['Groupby as a worldview', '22:37'], ['Assignment: clean the survey dump', '09:44']], true) },
      { title: 'Visual Communication', lessons: ls([['Chart choice as argument', '18:26'], ['Matplotlib and seaborn without the fights', '24:19']]) },
      { title: 'From Notebook to Pipeline', lessons: ls([['Functions, files, and folders', '21:03'], ['Testing data with expectations', '17:52'], ['Final project: the weekly report, automated', '28:11']]) },
    ],
    palette: { bg: '#0a0a0a', fg: '#f6f5f4', accent: '#0057f3', pattern: 'wave' },
  },
  {
    id: 'ui-design-systems',
    title: 'Interface Design Systems: Tokens to Components',
    tagline: 'Build the system, then build the screens.',
    category: 'Design',
    level: 'Advanced',
    price: 119,
    rating: 4.9,
    ratingCount: 987,
    students: 7230,
    hours: 13,
    instructor: { name: 'Aiko Tanabe', role: 'Design Systems Lead, SaaS' },
    description:
      'A systems course, not a screens course. Color ramps, spacing scales, type ramps, and the governance that keeps a design system alive after the launch tweet. You will build a token pipeline and ship a documented component set.',
    outcomes: [
      'Design a color ramp with accessible steps',
      'Name tokens so decisions survive redesigns',
      'Document components for engineers, not portfolios',
      'Plan adoption across a skeptical org',
    ],
    chapters: [
      { title: 'Tokens as Decisions', lessons: ls([['Primitive vs. semantic naming', '19:22'], ['Building an accessible ramp', '23:14'], ['Assignment: audit a broken palette', '10:41']], true) },
      { title: 'Components That Compose', lessons: ls([['API design for components', '26:08'], ['States, slots, and variants', '21:47']]) },
      { title: 'Governance & Adoption', lessons: ls([['Versioning without mutiny', '17:35'], ['Final project: ship the system', '25:29']]) },
    ],
    palette: { bg: '#f6f5f4', fg: '#0a0a0a', accent: '#ff5102', pattern: 'blocks' },
  },
  {
    id: 'fullstack-next',
    title: 'Full-Stack Next.js: Ship a Real Product',
    tagline: 'Auth, data, payments, deploy. No toy apps.',
    category: 'Development',
    level: 'Intermediate',
    price: 139,
    originalPrice: 199,
    rating: 4.8,
    ratingCount: 1542,
    students: 11080,
    hours: 24,
    instructor: { name: 'Marcus Webb', role: 'Indie hacker, 3 exits' },
    description:
      'Build and ship a complete product: a paid newsletter platform with auth, a real database, Stripe, and email. The course is opinionated — one stack, done well — and every architectural choice is argued, not assumed.',
    outcomes: [
      'Model a real domain in Postgres with an ORM',
      'Wire auth that handles the edge cases',
      'Take money with Stripe, including webhooks',
      'Deploy with env hygiene and rollbacks',
    ],
    chapters: [
      { title: 'The Product Skeleton', lessons: ls([['Routing and layouts that scale', '18:36'], ['Schema first: modeling subscribers', '24:50'], ['Assignment: your data model', '11:15']], true) },
      { title: 'Auth & Data', lessons: ls([['Sessions, cookies, and middleware', '27:22'], ['Server actions under pressure', '22:48']]) },
      { title: 'Money & Mail', lessons: ls([['Stripe checkout and the webhook dance', '29:31'], ['Transactional email that lands', '19:27'], ['Final project: launch checklist', '20:44']]) },
    ],
    palette: { bg: '#0a0a0a', fg: '#f6f5f4', accent: '#cdfe00', pattern: 'grid' },
    bestseller: true,
  },
  {
    id: 'growth-loops',
    title: 'Growth Loops: Acquisition That Compounds',
    tagline: 'Funnels leak. Loops compound.',
    category: 'Marketing',
    level: 'Advanced',
    price: 109,
    rating: 4.6,
    ratingCount: 743,
    students: 5410,
    hours: 8,
    instructor: { name: 'Rachel Osei', role: 'Growth lead, consumer apps' },
    description:
      'Most growth courses teach channel tactics that decay. This one teaches loop design: how output from one cohort becomes input for the next. You will map loops for real products and model when they break.',
    outcomes: [
      'Distinguish loops from funnels in your own product',
      'Model loop velocity and carrying capacity',
      'Find the constraint that actually limits growth',
      'Run loop experiments without torching trust',
    ],
    chapters: [
      { title: 'Loop Literacy', lessons: ls([['The four loop archetypes', '21:12'], ['Why funnels flatten', '16:38']], true) },
      { title: 'Modeling & Measurement', lessons: ls([['Loop math on a spreadsheet', '23:29'], ['Finding the constraint', '18:51'], ['Assignment: map your loop', '12:47']]) },
      { title: 'Experiments & Ethics', lessons: ls([['Testing inside a loop', '20:06'], ['Final project: the loop memo', '15:34']]) },
    ],
    palette: { bg: '#0057f3', fg: '#ffffff', accent: '#ff5102', pattern: 'dots' },
  },
  {
    id: 'finance-founders',
    title: 'Finance for Founders: Read Your Own Company',
    tagline: 'Your P&L is telling you something. Learn to hear it.',
    category: 'Business',
    level: 'Beginner',
    price: 89,
    rating: 4.7,
    ratingCount: 1120,
    students: 8970,
    hours: 10,
    instructor: { name: 'Elena Petrova', role: 'CFO, venture-backed startups' },
    description:
      'The finance course for people who would rather build. Three statements, unit economics, runway math, and the board-meeting numbers that decide whether you keep your company. Spreadsheet templates included and used hard.',
    outcomes: [
      'Read the three statements as one story',
      'Compute contribution margin and CAC payback',
      'Model runway under honest assumptions',
      'Answer board questions without flinching',
    ],
    chapters: [
      { title: 'The Three Statements', lessons: ls([['P&L, balance sheet, cash flow — one story', '25:16'], ['Accrual vs. cash, finally clear', '18:42']], true) },
      { title: 'Unit Economics', lessons: ls([['Contribution margin, honestly', '21:58'], ['CAC, LTV, and their abuse', '24:03'], ['Assignment: your own unit economics', '13:26']]) },
      { title: 'Runway & Board Craft', lessons: ls([['The runway model', '19:37'], ['Final project: the five-slide board deck', '22:15']]) },
    ],
    palette: { bg: '#f6f5f4', fg: '#0a0a0a', accent: '#0a0a0a', pattern: 'stripes' },
  },
  {
    id: 'photo-light',
    title: 'Photographic Light: See It, Shape It, Own It',
    tagline: 'One window, one strobe, no excuses.',
    category: 'Photography',
    level: 'All levels',
    price: 94,
    originalPrice: 129,
    rating: 4.9,
    ratingCount: 1688,
    students: 13240,
    hours: 12,
    instructor: { name: 'Tomás Herrera', role: 'Editorial photographer' },
    description:
      'Light before gear. This course trains your eye with constrained exercises — one window, one strobe, one hour of dusk — until you can walk into any room and know exactly where the photograph lives.',
    outcomes: [
      'Read direction, quality, and color of light instantly',
      'Build a portrait with a single strobe',
      'Use constraints as a forcing function',
      'Edit ruthlessly: the contact sheet method',
    ],
    chapters: [
      { title: 'Learning to See', lessons: ls([['Direction, quality, color', '22:41'], ['The one-window exercise', '19:55']], true) },
      { title: 'Shaping Light', lessons: ls([['One strobe, five portraits', '27:18'], ['Negative fill and why it matters', '17:29'], ['Assignment: dusk in your neighborhood', '10:52']]) },
      { title: 'The Edit', lessons: ls([['Contact sheets and kill criteria', '21:07'], ['Final project: a coherent set of ten', '16:48']]) },
    ],
    palette: { bg: '#0a0a0a', fg: '#f6f5f4', accent: '#ff5102', pattern: 'dots' },
    isNew: true,
  },
  {
    id: 'excel-modeling',
    title: 'Financial Modeling in Excel: Build Models People Trust',
    tagline: 'Structure beats cleverness. Every time.',
    category: 'Business',
    level: 'Intermediate',
    price: 99,
    rating: 4.6,
    ratingCount: 890,
    students: 6740,
    hours: 11,
    instructor: { name: 'Hannah Kim', role: 'Ex-investment banking, PE' },
    description:
      'A modeling course with banking discipline and operator empathy. Three-statement models, scenario switches, and the formatting rules that make a model auditable. You build two complete models from blank sheets.',
    outcomes: [
      'Structure inputs, calcs, and outputs separately',
      'Build a three-statement model that balances',
      'Add scenario switches without spaghetti',
      'Format for the reader, not the author',
    ],
    chapters: [
      { title: 'Model Architecture', lessons: ls([['The input-calc-output law', '18:52'], ['Formatting as communication', '16:19']], true) },
      { title: 'The Three-Statement Build', lessons: ls([['Revenue drivers first', '24:36'], ['Making the balance sheet balance', '28:02'], ['Assignment: break it on purpose', '12:33']]) },
      { title: 'Scenarios & Sensitivities', lessons: ls([['Switches done right', '19:45'], ['Final project: the operating model', '26:58']]) },
    ],
    palette: { bg: '#f6f5f4', fg: '#0a0a0a', accent: '#0057f3', pattern: 'arcs' },
  },
  {
    id: 'css-craft',
    title: 'CSS Craft: Layout, Motion & the Cascade',
    tagline: 'The stylesheet is the product.',
    category: 'Development',
    level: 'Intermediate',
    price: 84,
    rating: 4.8,
    ratingCount: 1377,
    students: 10620,
    hours: 13,
    instructor: { name: 'Ingrid Falk', role: 'Creative developer' },
    description:
      'CSS as a craft discipline. Grid and subgrid, container queries, view transitions, and motion that respects prefers-reduced-motion. You will rebuild award-level layouts and learn the cascade deeply enough to stop fighting it.',
    outcomes: [
      'Compose layouts with grid, subgrid, and container queries',
      'Design motion with intention and opt-outs',
      'Debug the cascade instead of brute-forcing specificity',
      'Ship view transitions that degrade gracefully',
    ],
    chapters: [
      { title: 'Modern Layout', lessons: ls([['Grid and subgrid, really', '23:17'], ['Container queries change component design', '20:39']], true) },
      { title: 'Motion & Transitions', lessons: ls([['The easing curve vocabulary', '17:26'], ['View transitions in practice', '25:44'], ['Assignment: rebuild a hero, exactly', '11:08']]) },
      { title: 'The Cascade, Mastered', lessons: ls([['Layers, scope, and specificity', '22:31'], ['Final project: the one-file magazine', '24:12']]) },
    ],
    palette: { bg: '#0a0a0a', fg: '#f6f5f4', accent: '#cdfe00', pattern: 'wave' },
    isNew: true,
  },
];

export const byId = (id: string) => COURSES.find((c) => c.id === id);

export const related = (course: Course, n = 3) =>
  COURSES.filter((c) => c.id !== course.id && c.category === course.category)
    .concat(COURSES.filter((c) => c.id !== course.id && c.category !== course.category))
    .slice(0, n);

export const formatPrice = (n: number) => `$${n.toFixed(0)}`;
export const formatStudents = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : `${n}`;
