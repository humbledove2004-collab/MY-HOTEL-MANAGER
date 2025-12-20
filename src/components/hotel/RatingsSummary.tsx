import { Star } from "lucide-react";

const bars = [
  { label: "5", value: 60 },
  { label: "4", value: 22 },
  { label: "3", value: 10 },
  { label: "2", value: 6 },
  { label: "1", value: 2 },
];

const categories = [
  { label: "Cleanliness", score: 4.5, icon: "🧼" },
  { label: "Communication", score: 4.0, icon: "💬" },
  { label: "Location", score: 4.8, icon: "📍" },
  { label: "Value", score: 4.8, icon: "💎" },
];

export default function RatingsSummary() {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      {/* Stars */}
      <div className="flex items-center gap-1 text-blue-600">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-[220px,1fr] gap-6">
        {/* Bars */}
        <div>
          <p className="text-sm text-slate-700 mb-2">Overall rating</p>
          <div className="space-y-2">
            {bars.map((b) => (
              <div key={b.label} className="flex items-center gap-3">
                <span className="w-4 text-right text-xs text-slate-600">{b.label}</span>
                <div className="h-2 flex-1 rounded bg-slate-200 overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${b.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((c) => (
            <div key={c.label} className="rounded-xl border border-slate-200 p-4 text-center">
              <p className="text-slate-900 font-medium">{c.label}</p>
              <p className="mt-1 text-2xl font-semibold">{c.score.toFixed(1)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
