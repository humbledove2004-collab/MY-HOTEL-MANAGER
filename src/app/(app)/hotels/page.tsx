"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Offers from "@/components/cards/Offers";
import FiltersPanel from "@/components/common/Filters";
// import SortBar from "@/components/common/SortBar";
import HotelCard from "@/components/cards/HotelCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { mockHotelData } from "@/lib/data/mocHotels";

/** ---------- Helpers ---------- */
function parseMiles(s: string): number {
  const m = s.match(/[\d.]+/);
  return m ? parseFloat(m[0]) : Number.POSITIVE_INFINITY;
}

export default function HotelPage() {
  const [filters, setFilters] = useState({
    price: 6000,
    roomType: [] as string[],
    amenities: [] as string[],
    distance: [] as string[],
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const stickyTop = "24px";

  const filteredhotels = useMemo(() => {
    return mockHotelData.filter((hotel) => {
      // price: any room option <= max price
      const withinPrice = hotel.rooms.some((r) =>
        Object.values(r.bookingPrices).some(
          (p) => Number(p) <= appliedFilters.price
        )
      );

      // roomType: exact match or none selected
      const matchesRoomType =
        appliedFilters.roomType.length === 0 ||
        appliedFilters.roomType.includes(hotel.roomType);

      // amenities: hotel must include ALL chosen amenities
      const matchesAmenities =
        appliedFilters.amenities.length === 0 ||
        appliedFilters.amenities.every((a) => hotel.amenities.includes(a));

      // distance buckets
      const miles = parseMiles(hotel.distance);
      const matchesDistance =
        appliedFilters.distance.length === 0 ||
        appliedFilters.distance.some((range) => {
          if (range === "Under 1 mile") return miles < 1;
          if (range === "1-3 miles") return miles >= 1 && miles <= 3;
          if (range === "3-5 miles") return miles > 3 && miles <= 5;
          return true;
        });

      return (
        withinPrice && matchesRoomType && matchesAmenities && matchesDistance
      );
    });
  }, [appliedFilters]);

  // pagination
  const totalPages = Math.ceil(filteredhotels.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedhotels = filteredhotels.slice(start, start + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  const handleClear = () => {
    const reset = {
      price: 6000,
      roomType: [],
      amenities: [],
      distance: [] as string[],
    };
    setFilters(reset);
    setAppliedFilters(reset);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main
        className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 py-6"
        style={{ ["--sticky-top" as string]: stickyTop }}
      >
        <section className="mb-6">
          <h1 className="text-[22px] sm:text-2xl font-semibold text-slate-900">
            Hotel Listings
          </h1>
          <p className="mt-1 text-slate-600">
            Find the perfect accommodation for your university experience
          </p>
        </section>

        <Offers />

        <section className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="hidden lg:block lg:col-span-3 sticky top-[var(--sticky-top)] self-start">
            <div className="max-h-[calc(100vh-var(--sticky-top))] overflow-y-auto rounded-xl border border-slate-200 bg-white">
              <div className="p-4">
                <FiltersPanel
                  filters={filters}
                  onChange={setFilters}
                  onApply={handleApplyFilters}
                  onClear={handleClear}
                />
              </div>
            </div>
          </aside>

          <div className="lg:col-span-9">
            {/* <SortBar total={filteredhotels.length} /> */}

            <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {paginatedhotels.length > 0 ? (
                paginatedhotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))
              ) : (
                <p className="text-center text-slate-600 col-span-full">
                  No hotels match your filters.
                </p>
              )}
            </div>

            <div className="mt-6 flex justify-center cursor-pointer">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => handlePageChange(currentPage - 1)}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => handlePageChange(i + 1)}
                        isActive={i + 1 === currentPage}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => handlePageChange(currentPage + 1)}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
