"use client";

import { Badge } from "@/components/ui/badge";
import RatingStars from "@/components/common/RatingStars";
import Image from "next/image";
import { Hotels } from "@/lib/types/hotel";
import { useRouter } from "next/navigation";

export default function HotelCard({ hotel }: { hotel: Hotels }) {
  // const hotelData = mockHotelData.find((item) => item.id === hotel.id);

  const { title, image, priceLabel, roomType, rating, reviews } = hotel;
  const router = useRouter();

  const handleClick = () => {
    router.push(`/hotels/${hotel.id}`);
  };

  return (
    <article
      onClick={handleClick}
      className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Image section */}
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={165}
          height={32}
          className="h-44 w-full object-cover"
        />

        {/* price flag */}
        <div className="absolute left-2 top-2">
          <Badge variant={"default"}>{priceLabel}</Badge>
        </div>

        {/* bookmark */}
        <button
          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/95 backdrop-blur grid place-items-center shadow-sm"
          aria-label="save"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-700">
            <path
              fill="currentColor"
              d="M6 2h12a1 1 0 0 1 1 1v18l-7-4-7 4V3a1 1 0 0 1 1-1z"
            />
          </svg>
        </button>
        {/* small corner badge like screenshot */}
        <div className="absolute right-2 top-12">
          <div className="h-7 w-7 rounded-full bg-white grid place-items-center shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-700" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3.5">
        <h3 className="mt-1 text-[15px] font-semibold text-slate-900">
          {hotel.name}
        </h3>
        <p className="text-[13px] text-slate-600">{hotel.area}</p>
        <p className="text-[12px] text-slate-500">{hotel.distance}</p>

        {/* Rating Stars */}
        <div className="mt-2 flex items-center justify-between">
          <RatingStars rating={rating} count={reviews} />
          <span className="inline-flex rounded border border-slate-200 text-[11px] px-2 py-1 text-slate-700">
            {roomType}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {hotel.amenities.map((amenity) => (
            <span
              key={amenity}
              className="inline-flex rounded-md bg-blue-600/10 text-blue-600 text-[10.5px] px-2 py-1"
            >
              {amenity}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
