import { Link } from 'react-router';
import { Star } from 'lucide-react';
import { formatPrice, formatStudents, type Course } from '@/data/courses';
import CourseCover from './CourseCover';

export function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-[2px]" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.round(rating) ? 'fill-[#ff5102] text-[#ff5102]' : 'text-[#d8d4cf]'}
        />
      ))}
    </span>
  );
}

/** Sharp rectangular card, zero radius, cover crossfade on hover. */
export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link to={`/course/${course.id}`} className="group block bg-white">
      <div className="cover-stack aspect-[4/3]">
        <CourseCover course={course} variant="a" className="h-full w-full" />
        <div className="cover-b">
          <CourseCover course={course} variant="b" className="h-full w-full" />
        </div>
        {course.bestseller && (
          <span className="absolute left-3 top-3 bg-[#cdfe00] px-2 py-1 label-caps text-[#0a0a0a]">Bestseller</span>
        )}
        {course.isNew && (
          <span className="absolute left-3 top-3 bg-[#0057f3] px-2 py-1 label-caps text-white">New</span>
        )}
      </div>
      <div className="border border-t-0 border-[#0a0a0a] p-4">
        <div className="flex items-center justify-between">
          <span className="label-caps text-[#0057f3]">{course.category}</span>
          <span className="section-no text-[#999]">{course.level}</span>
        </div>
        <h3 className="mt-2 font-display text-[16px] font-bold leading-tight tracking-tight group-hover:underline group-hover:underline-offset-4">
          {course.title}
        </h3>
        <p className="mt-1 text-[12.5px] text-[#666]">{course.instructor.name}</p>
        <div className="mt-2 flex items-center gap-2 text-[12px]">
          <span className="font-mono font-bold text-[#ff5102]">{course.rating.toFixed(1)}</span>
          <Stars rating={course.rating} />
          <span className="text-[#999]">({course.ratingCount.toLocaleString()})</span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-lg font-extrabold">{formatPrice(course.price)}</span>
          {course.originalPrice && (
            <span className="text-[13px] text-[#999] line-through">{formatPrice(course.originalPrice)}</span>
          )}
          <span className="ml-auto section-no text-[#999]">{formatStudents(course.students)} students</span>
        </div>
      </div>
    </Link>
  );
}
