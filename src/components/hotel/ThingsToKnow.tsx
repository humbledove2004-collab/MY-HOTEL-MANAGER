"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const left = [
  "Full payment required. No refunds. Always collect a receipt.",
  "GHC 200 security deposit (refundable if no damages).",
  "Free cleaning twice/semester. Extra service is paid.",
  "Always lock your room and wardrobe. Keep valuables out of sight.",
  "We are not liable for stolen items",
  "No ironing on mattresses.",
  "No smoking anywhere",
];

const mid = [
  "Provides a serene environment for studying, relaxing, and unwinding.",
  "Offers clean, well-decorated, and spacious rooms.",
  "Well-decorated, spacious rooms designed for comfort.",
  "Just a 5-minute walk from campus.",
  "Affordable Laundry services available.",
  "Surrounded by useful neighborhood amenities.",
  "Pascaline Hotel is more than a place to stay; it’s a place to thrive.",
];

export default function ThingsToKnow() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900">Things to know</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <ListCard title="Hotel Rules" items={left} />
        <ListCard title="Hotel Description" items={mid} />
      </div>
    </div>
  );
}

function ListCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  const [open, setOpen] = useState(false);
  const visible = items.slice(0, 3); // only show first 3 items initially

  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <p className="font-semibold text-slate-900">{title}</p>
      <ul className="mt-2 list-disc pl-5 space-y-2 text-sm text-slate-700">
        {visible.map((rule, index) => (
          <li key={index}>{rule}</li>
        ))}
      </ul>

      {/* "Show more" button that opens the modal */}
      <button
        onClick={() => setOpen(true)}
        className="mt-3 inline-flex items-center gap-1 rounded-md cursor-pointer bg-blue-600/10 text-blue-600 hover:bg-blue-600/20 text-[10.5px] px-2 py-1"
      >
        Show more <ChevronRight className="h-4 w-4" />
      </button>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <ul className="mt-4 list-disc pl-5 space-y-2 text-[15px] text-slate-700">
            {items.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </div>
  );
}
