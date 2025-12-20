"use client"

import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const items = Array.from({ length: 6 }).map((_, i) => ({
  id: i,
  image: `/images/hostel_image_${(i % 4) + 1}.jpg`,
  title: "Tezcoro, Aboksa",
  sub: "0.8 miles away • Accra",
  rating: (4 + (i % 10) / 10).toFixed(1),
}))

export default function ExploreCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-[1000px] mx-auto"
    >
      <CarouselContent>
        {items.map((it) => (
          <CarouselItem key={it.id} className="basis-auto md:basis-1/4 lg:basis-1/5">
            <div className="w-[220px] shrink-0 rounded-xl border border-slate-200 bg-white overflow-hidden">
              <div className="relative h-[140px] w-full flex gap-10">
                <Image
                  src={it.image}
                  alt={it.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-[13px] text-slate-700">{it.title}</p>
                <p className="text-[12px] text-slate-500">{it.sub}</p>
                <div className="mt-2 text-[12px]">
                  <span className="rounded bg-blue-50 text-blue-700 px-2 py-0.5">
                    {it.rating}
                  </span>
                  <span className="ml-2 text-slate-500">Ghos Hotel</span>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Navigation buttons */}
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
