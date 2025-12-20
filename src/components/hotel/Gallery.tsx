"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { mockHotelData } from "@/lib/data/mocHotels";

export default function Gallery({
  hotelId,
  images,
  hotelItemsId,
}: {
  hotelId: string;
  hotelItemsId?: string;
  images?: string[];
}) {
  
  const hotel = mockHotelData.find(
    (hotelItem) => hotelItem.id === hotelId
  );

  const fallback = ["/images/no-image-found.jpg"];

  const allImages =
    Array.isArray(images) && images.length > 0
      ? images
      : hotel?.images ?? fallback;

  const [main, ...rest] = allImages;
  const thumbs = rest.slice(0, 4);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {/* Main image */}
      <div className="relative w-full overflow-hidden rounded-xl aspect-[16/9] md:aspect-auto">
        <Image
          src={main}
          alt="Main photo"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* 4 thumbnails */}
      <div className="grid grid-cols-2 grid-rows-2 gap-3">
        {thumbs.map((src, idx) => {
          const isShowAllTile = idx === 3; // last thumb has the 'Show all Photos' button

          return (
            <div
              key={src + idx}
              className="relative w-full overflow-hidden rounded-xl aspect-[8/6]"
            >
              <Image
                src={src}
                alt={`Photo ${idx + 2}`}
                fill
                className="object-cover"
                sizes="25vw"
              />

              {isShowAllTile && (
                <Button
                  asChild
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white text-black px-3 py-1 text-sm shadow hover:bg-black hover:text-white"
                >
                  <Link href={`/hotels/${hotelItemsId}/gallery`}>
                    Show all Photos
                  </Link>
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}