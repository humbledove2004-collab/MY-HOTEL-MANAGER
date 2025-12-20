// src/app/bookings/page.tsx
"use client";

import Image from "next/image";
import { MoreHorizontal, Star } from "lucide-react";
import { Bookings } from "@/lib/types/bookings";

/** ---------- Small UI bits ---------- */
function Pill({
  children,
  variant = "muted",
}: {
  children: React.ReactNode;
  variant?: "muted" | "success" | "danger";
}) {
  const base =
    "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] sm:text-xs font-medium";
  const styles =
    variant === "success"
      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
      : variant === "danger"
      ? "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
      : "bg-slate-100 text-slate-700";
  return <span className={`${base} ${styles}`}>{children}</span>;
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] sm:text-[11px] text-slate-700">
      {children}
    </span>
  );
}

/** ---------- Booked Card ---------- */
function BookedCard({ booking, onClick }: { booking: Bookings; onClick: () => void }) {
  return (
    <article onClick={onClick} className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden">
      <div className="flex flex-col md:flex-row cursor-pointer">
        {/* Image */}
        <div className="w-full md:w-5/12 relative aspect-[4/3] md:aspect-auto">
          <Image
            src={booking.image}
            alt={booking.title}
            fill
            sizes="100"
            className="object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
            priority
          />
        </div>

        {/* Body */}
        <div className="flex flex-col justify-between p-4 sm:p-5 w-full md:w-7/12">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
            <div>
              <h3 className="text-[15px] sm:text-base font-semibold text-slate-900">
                {booking.title}
              </h3>
              <p className="mt-1 text-[13px] text-slate-600">{booking.area}</p>
              <p className="text-[12px] text-slate-500">{booking.distance}</p>

              <div className="mt-1 flex items-center gap-1 text-[12px] text-slate-700">
                <Star className="h-[14px] w-[14px] fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{booking.rating.toFixed(1)}</span>
                <span className="text-slate-500">({booking.reviews})</span>
              </div>

              <div className="mt-2 flex flex-wrap gap-1.5">
                {booking.tags.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="text-sm font-semibold text-slate-900">
                GHS {booking.price.toLocaleString()}
              </div>
              <button
                aria-label="More actions"
                className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-end">
            {booking.status === "completed" ? (
              <Pill variant="success">Completed</Pill>
            ) : (
              <Pill variant="danger">Cancelled</Pill>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default BookedCard;