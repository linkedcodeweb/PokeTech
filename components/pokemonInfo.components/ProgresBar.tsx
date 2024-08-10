import { Pokemon } from "@/types/pokemon.types";

function ProgresBar({ dataPokemon }: { dataPokemon: Pokemon }) {
  return (
    <>
      {dataPokemon.stats.map((item) => (
        <article className="p-2" key={item.stat.name}>
          <div className="flex justify-between uppercase text-white">
            <p className="drop-shadow-[2px_2px_rgba(0,0,0)]">
              {item.stat.name.replaceAll("-", " ")}{" "}
            </p>
            <p>{item.base_stat}</p>
          </div>
          <div className="w-full rounded-full bg-black/70">
            <div
              className="h-7 text-xs border-4 rounded-full border-black/70 bg-pokeWarning-800"
              style={{ width: `${(item.base_stat * 100) / 255}%` }}
            ></div>
          </div>
        </article>
      ))}
    </>
  );
}

export default ProgresBar;
