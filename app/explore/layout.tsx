import ToggleType from "@/components/explore.components/ToggleType";
import { getField } from "@/model/pokemon.fetch";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = (await getField("type")).results;
  return (
    <div className="grid grid-cols-4 gap-6">
      <aside className="sticky top-0 h-screen p-3 text-base rounded-xl bg-pokeGreen-900/90">
        <ToggleType data={data} />
      </aside>
      <section className="col-span-3 min-h-full rounded-xl bg-pokeGreen-900/90">
        {children}
      </section>
    </div>
  );
}
