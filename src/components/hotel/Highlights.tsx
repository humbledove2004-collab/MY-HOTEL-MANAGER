import { Fan, Snowflake, Star } from "lucide-react";

const items = [
  {
    icon: Fan,
    title: "Amenities for everyday living",
    desc: "The host has equipped this place for comfortable stays",
  },
  {
    icon: Snowflake,
    title: "Designed for staying cool",
    desc: "Beat the heat with the AC and ceiling fan.",
  },
  {
    icon: Star,
    title: "Andy is a Superhost",
    desc: "Superhosts are experienced, highly rated Hosts.",
  },
];

export default function Highlights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded-2xl border border-slate-200 p-5">
      {items.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="flex gap-4">
          <div className="h-9 w-9 rounded-full bg-blue-50 grid place-items-center text-blue-600">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium text-slate-900">{title}</p>
            <p className="text-sm text-slate-600">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
