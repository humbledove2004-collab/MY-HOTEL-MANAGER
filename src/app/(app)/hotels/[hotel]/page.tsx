"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Gallery from "@/components/hotel/Gallery";
import BookingCard from "@/components/hotel/BookingCard";
import HotelHeader from "@/components/hotel/HotelHeader";
import Highlights from "@/components/hotel/Highlights";
import DescriptionBlock from "@/components/hotel/DescriptionBlock";
import AmenitiesGrid from "@/components/hotel/AmenitiesGrid";
import RatingsSummary from "@/components/hotel/RatingsSummary";
import MapEmbed from "@/components/hotel/MapEmbed";
import ThingsToKnow from "@/components/hotel/ThingsToKnow";
import ExploreCarousel from "@/components/hotel/ExploreCarousel";
import { mockHotelData } from "@/lib/data/mocHotels";
import { ChevronLeft, Share2 } from "lucide-react";
import Link from "next/link";
// import SuccessScreen from "@/components/screens/SuccessScreen";
import Navbar from "@/components/layout/Navbar";
import ConfirmBookingCard from "@/components/cards/ConfirmBookingCard";

export default function HotelDescriptionPage({
  params,
}: {
  params: { hotel: string };
}) {
  const { hotel } = params;

  const [, setShowCompleted] = useState(false);
  const [open] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  const hotelData = mockHotelData.find((hotelItems) => hotelItems.id === hotel);

  const handleConfirm = () => {
    setShowConfirm(false);
    setShowCompleted(true);
    toast.success("Room Booked");
  };
  console.log(hotelData);

  const close = () => {
    setShowConfirm(false);
  };

  if (!hotelData) {
    return <div className="p-6 text-red-600">Hotel not found.</div>;
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Top container */}
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-2 py-6 lg:py-8">
          <div className="mb-3 sm:mb-6">
            <Link
              href={`/hotels`}
              className="inline-flex items-center gap-2 text-slate-800 hover:text-slate-950"
              aria-label="Back"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="hidden sm:inline text-sm">Back</span>
            </Link>
          </div>
          {/* Title + share */}
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-semibold text-black">
              {hotelData.name}
            </h1>
            <button className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900">
              <Share2 className="h-5 w-5" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>

          {/* Gallery + quick action */}
          <div className="mt-4">
            <Gallery
              hotelItemsId={hotelData.id}
              hotelId={hotelData.name}
              images={hotelData.images}
            />
            <div className="mt-2 hidden sm:flex items-center gap-6 text-xs text-slate-700">
              <span>Spacious rooms</span>
              <span>•</span>
              <span>Inside bath</span>
              <span>•</span>
              <span>Spacious rooms</span>
            </div>
            <div className="mt-3">
              <Button className="rounded-full px-5">
                Proceed with booking
              </Button>
            </div>
          </div>

          <hr className="my-6" />

          {/* Host / Booking sticky */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-6 items-start">
            <div className="min-w-0">
              <HotelHeader hotel={hotelData.name} />

              <div className="mt-6">
                <Highlights />
              </div>
            </div>

            {/* Booking card on desktop */}
            <aside className="sticky top-6">
              <BookingCard
                params={{ hotel: hotelData.id }}
                onCompleted={() => {
                  // setShowCompleted(true);
                  setShowConfirm(true);
                }}
              />
            </aside>
          </div>

          {showConfirm && (
            <ConfirmBookingCard
              open={open}
              onClose={close}
              onConfirm={handleConfirm}
              title="Are you sure you want to book this room?"
              confirmText="Confirm"
              cancelText="Cancel"
              loading={false}
            />
          )}

          <hr className="my-6" />

          {/* Description with supporting image */}
          <DescriptionBlock
            image={hotelData.images[1] ?? "/images/hostel-1.jpg"}
            text={hotelData.description}
          />

          {/* What this place offers */}
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-slate-900">
              What this place offers
            </h2>
            <AmenitiesGrid params={{ hotel: hotelData.id }} />
            <div className="mt-3">
              <Button
                variant="outline"
                className="cursor-pointer rounded-full px-4 py-1.5"
              >
                Show all amenities
              </Button>
            </div>
          </section>

          {/* Ratings */}
          <section className="mt-10">
            <RatingsSummary />
          </section>

          {/* Map */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-slate-900">
              Where you &apos ll be
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Accra, Greater Accra Region, Ghana
            </p>
            <div className="mt-3">
              <MapEmbed />
            </div>
          </section>

          {/* Things to know */}
          <section className="mt-10">
            <ThingsToKnow />
          </section>

          {/* Explore more */}
          <section className="mt-10">
            <h2 className="text-xl font-semibold text-slate-900">
              Explore other options in and around Accra
            </h2>
            <div className="mt-4">
              <ExploreCarousel />
            </div>
          </section>
        </div>

        {/* Footer strip (simple) */}
        <footer className="border-t bg-white">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-2 py-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-semibold text-slate-900">Pascaline Hotel.com</h3>
              <p className="text-slate-600 mt-1">BOOK A hotel WITH EASE</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Contact</h3>
              <p className="text-slate-600 mt-1">Customer Support</p>
              <p className="text-slate-600">Service Guarantee</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Partners</h3>
              <p className="text-slate-600 mt-1">IDEAGAP</p>
            </div>
          </div>
          <div className="bg-blue-600 text-white text-sm">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-2 py-3 flex items-center justify-between">
              <span>© 2025 MYHSEARCH</span>
              <a href="#" className="underline underline-offset-2">
                Terms & Policy
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* {showCompleted && (
        <SuccessScreen
          isOpen={open}
          onClose={() => setOpen(false)}
          autoCloseMs={2500}
          title="Room Booked"
          message="You have successfully booked your room."
          primaryCta={{ label: "Download Receipt", href: "/receipt.pdf" }}
          secondaryCta={{
            label: "Back to Dashboard",
            onClick: () => setOpen(false),
          }}
        />
      )} */}
    </>
  );
}
