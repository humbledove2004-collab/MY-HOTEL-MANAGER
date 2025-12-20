"use client";

import { mockHotelData } from "@/lib/data/mocHotels";


export default function AmenitiesGrid({ params }: {params :{ hotel: string }}) {
  const hotel = mockHotelData.find((hotelItem) => hotelItem.id ===  params.hotel);

  if (!hotel) return <p>No hotel Amenities.</p>;

  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4">
      {hotel.amenities.map((amenity, index) => { return (
          <div key={index} className="flex items-center gap-3 text-slate-800">
            <span>{amenity}</span>
          </div>
        );
      })}
    </div>
  );
}
