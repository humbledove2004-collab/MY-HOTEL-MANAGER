"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { mockHotelData } from "@/lib/data/mocHotels";
import WaitingRoomPage from "./WaitingRoom";
import { CalendarIcon } from "lucide-react";

export default function BookingCard({
  params,
  onCompleted,
}: {
  params: { hotel: string };
  onCompleted?: () => void;
}) {
  const hotel = mockHotelData.find((h) => h.id === params.hotel);
  const totalBeds =
    hotel?.rooms.reduce((sum, room) => sum + room.availableBeds, 0) ?? 0;

  const [checkIn, setCheckIn] = useState("2025-04-21");
  const [checkOut, setCheckOut] = useState("2025-06-05");

  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | undefined>();
  const [selectedBed, setSelectedBed] = useState<string | undefined>();
  const [accept, setAccept] = useState(false);
  // const [completed, setCompleted] = useState(false);

  const detailsRef = useRef<HTMLDivElement | null>(null);

  if (!hotel) return <div className="p-4 text-red-600">Hotel not found.</div>;
  if (totalBeds <= 0) return <WaitingRoomPage />;

  const handleBookClick = () => {
    setExpanded((s) => !s);
    setTimeout(
      () =>
        detailsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        }),
      0
    );
  };

  const handleBookRoom = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSelectedBed("");
      setSelectedRoom("");
      setAccept(false);
      // setCompleted(true);
      onCompleted?.();
    }, 1000);
  };

  const canContinue = Boolean(selectedRoom) && selectedBed && accept;

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x rounded-xl border border-slate-300 overflow-hidden">
        <div className="p-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            Check-in
          </p>
          <div className="mt-1 flex items-center gap-2 text-sm text-slate-800">
            {/* <CalendarIcon className="h-4 w-4 text-slate-500" /> */}
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="bg-transparent outline-none text-slate-800 cursor-pointer"
            />
          </div>
        </div>

        <div className="p-3">
          <p className="text-[11px] uppercase tracking-wide text-slate-500">
            Checkout
          </p>
          <div className="mt-1 flex items-center gap-2 text-sm text-slate-800">
            <CalendarIcon className="h-4 w-4 text-slate-500" />
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-transparent outline-none text-slate-800 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-[11px] uppercase tracking-wide text-slate-500">
          Rooms
        </label>

        <Select onValueChange={setSelectedRoom} value={selectedRoom}>
          <SelectTrigger className="w-full cursor-pointer h-12 rounded-2xl pl-4 pr-3 text-[15px]">
            <div className="flex w-full cursor-pointer items-center justify-between">
              <SelectValue placeholder="Select cursor-pointer room type" />
            </div>
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select</SelectLabel>
              {hotel.rooms.map((room, rIndex) =>
                Object.entries(room.bookingPrices).map(([type, price], i) => {
                  const label = `${type}  -  GHS ${price}  -  ${room.availableBeds} Rooms available`;
                  return (
                    <SelectItem
                      key={`${rIndex}-${i}`}
                      value={label}
                      className=" cursor-pointer"
                    >
                      {label}
                    </SelectItem>
                  );
                })
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Primary CTA that reveals the extension panel */}
      <Button
        onClick={handleBookClick}
        className={`mt-10 w-full rounded-full text-[15px] text-center ${
          expanded ? "hidden" : "block "
        } cursor-pointer`}
      >
        {expanded ? "Hide details" : "Continue"}
      </Button>

      {/* --- extension panel (exactly like your UI) --- */}
      {expanded && (
        <div ref={detailsRef} className="mt-6">
          <div className="h-px w-full bg-slate-200 mb-6" />

          {/* Select Bed */}
          <label className="mb-2 block text-[11px] uppercase tracking-wide text-slate-500">
            Select Bed
          </label>
          <div className="relative">
            <Select onValueChange={setSelectedBed} value={selectedBed}>
              <SelectTrigger className="w-full cursor-pointer h-12 rounded-2xl pl-4 pr-3 text-[15px]">
                <div className="flex w-full cursor-pointer items-center justify-between">
                  <SelectValue placeholder="Select cursor-pointer room type" />
                </div>
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select</SelectLabel>
                  {hotel.rooms.map((room) =>
                    room.bed.map((bedCode, index) => (
                      <SelectItem
                        className="cursor-pointer"
                        value={bedCode}
                        key={index}
                      >
                        Bed: {bedCode}
                      </SelectItem>
                    ))
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Terms */}
          <label className="mt-6 cursor-pointer flex items-start gap-3 text-[15px] text-slate-800">
            <Checkbox
              checked={accept}
              onCheckedChange={(v) => setAccept(Boolean(v))}
              className="mt-1"
            />
            <span>
              I confirm understanding terms and conditions and I will abide by
              the rules.
            </span>
          </label>

          {/* Continue */}
          <Button
            disabled={!canContinue}
            className="mt-6 w-full cursor-pointer rounded-full py-4 text-[16px] disabled:opacity-60"
            variant="default"
            onClick={handleBookRoom}
          >
            {loading ? <Spinner /> : "Book Now"}
          </Button>
        </div>
      )}
    </div>
  );
}
