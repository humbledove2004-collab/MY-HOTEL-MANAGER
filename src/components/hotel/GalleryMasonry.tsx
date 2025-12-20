"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Lightbox from "./Lightbox";
import { mockHotelData } from "@/lib/data/mocHotels";

export default function GalleryMasonry({ hotel }: { hotel: string }) {
  const hotelData = mockHotelData.find((item) => item.id === hotel);
  const images = useMemo(() => hotelData?.images ?? [], [hotelData]);

  const pics = useMemo(() => {
    const arr = images.slice(0, 8);
    while (arr.length < 8) arr.push(images[arr.length % images.length]);
    return arr;
  }, [images]);


  // Lightbox state
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const [hero, ...rest] = pics;

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <>
      <section className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-12">
        {/* Left: hero */}
        <button
          onClick={() => openAt(0)}
          className="lg:col-span-7 focus:outline-none"
          aria-label="Open photo 1"
        >
          <Tile src={hero} className="aspect-[16/11] sm:aspect-[16/10] lg:aspect-[4/3]" />
        </button>

        {/* Right: three rows */}
        <div className="lg:col-span-5 grid gap-4 sm:gap-5">
          {/* Row 1: three small */}
          <div className="grid grid-cols-3 gap-4 sm:gap-5">
            {rest.slice(0, 3).map((src, i) => (
              <button
                key={`r1-${i}`}
                onClick={() => openAt(1 + i)}
                aria-label={`Open photo ${2 + i}`}
                className="focus:outline-none"
              >
                <Tile src={src} className="aspect-[4/3]" />
              </button>
            ))}
          </div>

          {/* Row 2: two medium */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {rest.slice(3, 5).map((src, i) => (
              <button
                key={`r2-${i}`}
                onClick={() => openAt(4 + i)}
                aria-label={`Open photo ${5 + i}`}
                className="focus:outline-none"
              >
                <Tile src={src} className="aspect-[16/11]" />
              </button>
            ))}
          </div>

          {/* Row 3: two medium */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {rest.slice(5, 7).map((src, i) => (
              <button
                key={`r3-${i}`}
                onClick={() => openAt(6 + i)}
                aria-label={`Open photo ${7 + i}`}
                className="focus:outline-none"
              >
                <Tile src={src} className="aspect-[16/11]" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        images={pics}
        index={index}
        open={open}
        onOpenChange={setOpen}
        onIndexChange={setIndex}
      />
    </>
  );
}

function Tile({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-white-800 ${className}`}>
      <Image
        src={src || "/images/no-image-found.jpg"}
        alt="Hotel photo"
        fill
        sizes="(max-width: 640px) 100vw, (max-width:1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
        priority
      />
      <div className="pointer-events-none absolute bottom-2 right-2 select-none rounded-md bg-black/70 px-2 py-1 text-[10px] text-white opacity-0 backdrop-blur-sm transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100">
        5340px × 7999px / JPG
      </div>
    </div>
  );
}
