export default function WorkshopLayout({
  left,
  center,
  right
}: {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid max-w-[1600px] gap-4 lg:grid-cols-[320px_minmax(0,1fr)_360px]">
      <aside className="rounded-xl border border-black/10 bg-white/60 p-4">{left}</aside>
      <section className="rounded-xl border border-black/10 bg-white/60 p-4">{center}</section>
      <aside className="rounded-xl border border-black/10 bg-white/60 p-4">{right}</aside>
    </div>
  );
}
