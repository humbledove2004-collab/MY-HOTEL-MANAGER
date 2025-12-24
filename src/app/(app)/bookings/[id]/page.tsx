// src/app/bookings/[id]/page.tsx
import { notFound } from "next/navigation";
import BOOKINGS from "@/lib/data/mockBookings";

/* ---------------------------- Helpers ----------------------------- */
function formatShort(d: string) {
  const dt = new Date(d);
  const dd = `${dt.getDate()}`.padStart(2, "0");
  const mm = `${dt.getMonth() + 1}`.padStart(2, "0");
  const yy = `${dt.getFullYear()}`.slice(-2);
  return `${dd}/${mm}/${yy}`;
}

function Pill({
  children,
  variant = "info",
}: {
  children: React.ReactNode;
  variant?: "info" | "success" | "danger";
}) {
  const map = {
    info: "text-blue-600 ring-1 ring-blue-200 bg-blue-50",
    success: "text-emerald-700 ring-1 ring-emerald-200 bg-emerald-50",
    danger: "text-rose-700 ring-1 ring-rose-200 bg-rose-50",
  } as const;

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs ${map[variant]}`}>
      {children}
    </span>
  );
}

/* ---------------------------- Page ------------------------------- */

export default async function BookingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ REQUIRED in Next.js 15+
  const { id } = await params;

  const booking = BOOKINGS.find((b) => b.id === id);
  if (!booking) notFound();

  const statusVariant: "success" | "danger" =
    booking.status === "completed" ? "success" : "danger";

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-slate-900">
          Booking Details
        </h1>

        <section className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="px-5 sm:px-8 py-6 sm:py-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-center text-slate-900">
              {booking.title}
            </h2>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-slate-600 mb-2">Status</p>
                <Pill variant={statusVariant}>
                  {booking.status === "completed"
                    ? "Booking Completed"
                    : "Booking Cancelled"}
                </Pill>
              </div>

              <div className="sm:text-right">
                <p className="text-xs font-medium text-slate-600 mb-1">Price</p>
                <p className="text-sm font-semibold text-slate-900">
                  GHS {booking.price.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-blue-300 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-blue-300">
                <div className="p-4 sm:p-5">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">
                    Check-in
                  </p>
                  <p className="mt-1 font-medium text-slate-900">
                    {formatShort(booking.bookingDetails.checkIn)}
                  </p>
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">
                    Checkout
                  </p>
                  <p className="mt-1 font-medium text-slate-900">
                    {formatShort(booking.bookingDetails.checkOut)}
                  </p>
                </div>
              </div>
            </div>

            <hr className="my-8 border-slate-200" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-slate-900">Room</p>
                <div className="mt-2 rounded-2xl border border-blue-300 bg-blue-50/40 px-4 py-3">
                  {booking.bookingDetails.roomLabel}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Selected Bed
                </p>
                <div className="mt-2 rounded-2xl border border-blue-300 bg-blue-50/40 px-4 py-3">
                  {booking.bookingDetails.bedLabel}
                </div>
              </div>
            </div>
          </div>
        </section>

        <p className="mt-6 text-center text-xs text-slate-500">
          Need help with this booking? Contact support.
        </p>
      </div>
    </main>
  );
}
