export default function RatingStars({ rating, count }: { rating: number; count: number }) {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center gap-1">
      <span className="text-[13px] font-medium text-slate-900">{rating.toFixed(1)}</span>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 24 24"
            className={`h-4 w-4 ${i < rounded ? "text-amber-400" : "text-slate-300"}`}
          >
            <path
              fill="currentColor"
              d="m12 17.27 6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l4.46 4.73L5.82 21z"
            />
          </svg>
        ))}
      </div>
      <span className="text-[12px] text-slate-600">({count})</span>
    </div>
  );
}
