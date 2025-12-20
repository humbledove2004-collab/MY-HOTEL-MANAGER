"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

type Filters = {
  price: number;
  roomType: string[];
  amenities: string[];
  distance: string[];
};

type Props = {
  filters: Filters;
  onChange: (f: Filters) => void;
  onApply: () => void;
  onClear?: () => void;
};

export default function FiltersPanel({ filters, onChange, onApply, onClear }: Props) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  // Keep local state in sync when parent changes (e.g., Clear Filters)
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleCheckbox = (key: keyof Filters, value: string) => {
    const prev = Array.isArray(localFilters[key]) ? (localFilters[key] as string[]) : [];
    const next = prev.includes(value)
      ? prev.filter((v) => v !== value)            // ← FIX: compare strings correctly
      : [...prev, value];

    const updated = { ...localFilters, [key]: next } as Filters;
    setLocalFilters(updated);
    onChange(updated);
  };

  const handlePriceChange = (value: number[]) => {
    const updated = { ...localFilters, price: value[0] } as Filters;
    setLocalFilters(updated);
    onChange(updated);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <h3 className="text-[15px] font-semibold text-slate-900">Filters</h3>

      {/* Price */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-slate-600">
          <span>Max Price</span>
          <span className="font-bold">Up to GHS {localFilters.price}</span>
        </div>
        <div className="mt-2">
          <Slider
            value={[localFilters.price]}     /* ← controlled */
            max={6000}
            min={0}
            step={100}
            onValueChange={handlePriceChange}
          />
        </div>
      </div>

      {/* Room Type */}
      <div className="mt-5">
        <p className="text-sm font-medium text-slate-900">Room Type</p>
        <div className="mt-2 grid gap-2 text-sm">
          {["Single", "Shared", "Private", "Studio", "Apartment"].map((type) => (
            <label key={type} className="flex items-center gap-3 text-slate-700">
              <Checkbox
                checked={localFilters.roomType.includes(type)}
                onCheckedChange={() => handleCheckbox("roomType", type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="mt-5">
        <p className="text-sm font-medium text-slate-900">Amenities</p>
        <div className="mt-2 grid gap-2 text-sm">
          {["Wi-Fi", "Laundry", "Gym", "Study Room", "Kitchen", "Parking", "Security", "AC"].map((a) => (
            <label key={a} className="flex items-center gap-3 text-slate-700">
              <Checkbox
                checked={localFilters.amenities.includes(a)}
                onCheckedChange={() => handleCheckbox("amenities", a)}
              />
              {a}
            </label>
          ))}
        </div>
      </div>

      {/* Distance */}
      <div className="mt-5">
        <p className="text-sm font-medium text-slate-900">Distance to University</p>
        <div className="mt-2 grid gap-2 text-sm">
          {["Under 1 mile", "1-3 miles", "3-5 miles"].map((d) => (
            <label key={d} className="flex items-center gap-3 text-slate-700">
              <Checkbox
                checked={localFilters.distance.includes(d)}
                onCheckedChange={() => handleCheckbox("distance", d)}
              />
              {d}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <Button className="w-full cursor-pointer" size="sm" onClick={onApply}>
          Apply Filters
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full cursor-pointer"
          onClick={onClear}
        >
          Clear
        </Button>
      </div>
    </div>
  );
}
