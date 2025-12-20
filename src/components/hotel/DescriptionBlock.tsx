
export default function DescriptionBlock({ text }: { text: string; image: string}) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[1fr,360px] gap-6 items-start">
      <div className="rounded-2xl border border-slate-200 p-5">
       
        <p className="text-slate-700 leading-relaxed">{text}</p>
      </div>
    </section>
  );
}
