export default function MapEmbed() {
  return (
    <div className="w-full overflow-hidden rounded-xl border">
      <iframe
        title="map"
        className="h-[320px] w-full"
        loading="lazy"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.857645267352!2d-0.205!3d5.603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAccra!5e0!3m2!1sen!2sgh!4v1700000000000"
      />
    </div>
  );
}
