import Image from "next/image";

export default function HotelHeader({hotel,}: {hotel: string;}) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-12 w-12 overflow-hidden rounded-full bg-slate-100">
        <Image
          src="/images/hostel_image_1.jpg"
          alt="headerImg"
          width={48}
          height={48}
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <p className="font-medium text-slate-900">{hotel}</p>
        <p className="text-slate-900">Hotel By Pascaline</p>
        <p className="text-slate-600 text-sm">
          Superhost • <span className="ml-1">15 Years Hosting</span>
        </p>
      </div>
    </div>
  );
}
