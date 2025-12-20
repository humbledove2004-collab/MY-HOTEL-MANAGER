"use client";


import BookedCard from "@/components/cards/BookedCard";
import Navbar from "@/components/layout/Navbar";
import BOOKINGS from "@/lib/data/mockBookings";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";

const BookingsPage = () => {
  const [tab, setTab] = useState<"completed" | "cancelled">("completed");
  const bookings = BOOKINGS;
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/bookings/${id}`);
  };

  const filtered = useMemo(
    () => bookings.filter((book) => book.status === tab),
    [tab,bookings]
  );

  return (
    <div>
      <Navbar/>

      {/* <hotelBookingCard booking={booking.data[0].attributes} /> */}

      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 text-center">
            Booked Hotel
          </h1>

          {/*Toogling Tabs */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-1 rounded-full bg-slate-200/60 p-1">
              <button
                onClick={() => setTab("completed")}
                className={[
                  "rounded-full cursor-pointer px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  tab === "completed"
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-white",
                ].join(" ")}
              >
                Completed
              </button>
              <button
                onClick={() => setTab("cancelled")}
                className={[
                  "rounded-full cursor-pointer px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                  tab === "cancelled"
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-white",
                ].join(" ")}
              >
                Cancelled
              </button>
            </div>
          </div>

          {/* Cards grid */}
          <section className="mt-8 grid grid-cols-1 gap-6">
            {filtered.length ? (
              filtered.map((book) => (
                <BookedCard key={book.id} booking={book} onClick={() =>{handleClick(book.id)}} />
              ))
            ) : (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
                No {tab} bookings yet.
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default BookingsPage;
