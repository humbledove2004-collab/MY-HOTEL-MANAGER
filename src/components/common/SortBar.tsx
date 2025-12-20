import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function SortBar({ total }: { total: number }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="text-sm text-slate-700">{total} hotels found</div>

      <div className="flex items-center gap-3">
        {/* Sort by select */}
        <div className="min-w-[190px]">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Sort by
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="university">University/School</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price select */}
        <div className="min-w-[170px]">
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Price
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low-high">Price: Low to High</SelectItem>
              <SelectItem value="high-low">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
