
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import GalleryMasonry from "@/components/hotel/GalleryMasonry";

export default async function hotelGalleryPage({ params }: { params: Promise<{ hotel: string }> }) {
 const { hotel } = await params;
  const decoded = decodeURIComponent(hotel).replace(/\s+/g, "_");
  console.log("hotel:", decoded);
 
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-4 py-4 sm:py-8">
        <div className="mb-3 sm:mb-6">
          <Link
            href={`/hotels/${hotel}`}
            className="inline-flex items-center gap-2 text-slate-800 hover:text-slate-950"
            aria-label="Back"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="hidden sm:inline text-sm">Back</span>
          </Link>
        </div>
        <GalleryMasonry hotel={hotel} />
      </div>
    </main>
  );
}
