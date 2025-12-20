import "@/app/globals.css";

export default function Offers() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <h2 className="text-[15px] font-semibold text-slate-900">Offers</h2>
      <p className="text-sm text-slate-600">
        Promotions, deals and special offers for you
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {/* Card 1 */}
        <div className="rounded-lg border offer-btn border-slate-200 bg-white overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <div>
              <h3 className="text-[15px] font-semibold text-white">
                Quick escape, quality time
              </h3>
              <p className="text-sm text-white">
                Save up to 20% with a Getaway Deal
              </p>
              <button className="mt-3 cursor-pointer rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5">
                Save on stays
              </button>
            </div>
           </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-lg border border-slate-200 offer-btn-2 text-white overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <div>
              <h3 className="text-[15px] font-semibold">Late Escape Deals</h3>
              <p className="text-sm opacity-90">
                Go for a good time, not a long time
              </p>
              <p className="text-[13px] opacity-80">
                Squeeze out the last bit of sun with at least 15% off
              </p>
              <button className="mt-3 cursor-pointer rounded-md bg-white hover:bg-slate-600 hover:text-white bg-center text-black text-sm font-medium px-3 py-1.5">
                Find deals
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
