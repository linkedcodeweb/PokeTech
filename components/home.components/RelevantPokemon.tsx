import { Pokemon } from "@/types/pokemon.types";
import { getField } from "@/model/pokemon.fetch";
import { datePokemon } from "@/model/pokemon.date";
import ProgresBar from "@/components/pokemonInfo.components/ProgresBar";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ToggleFavorite } from "@/components/app.components/ToggleFavorite";

async function RelevantPokemon() {
  const fieldPokemon = "pokemon/";
  //sacamos la fecha de hoy y la pasamos a la funcion datePokemon
  const day = new Date();

  const sessionFav = await getServerSession(authOptions).then(
    (session) => session?.user.favorite
  );

  const dataPokemon = (await getField(fieldPokemon + datePokemon(day)).then(
    (data) => data
  )) as Pokemon;

  function getImagePokemon(sprite: string) {
    return sprite === null ? "/pokemon/pokeball.png" : sprite;
  }

  return (
    <section className="rounded-xl bg-pokeGreen-900/90">
      <header className="flex justify-between items-center w-full p-2 text-3xl rounded-t-xl bg-pokeGreen-500">
        <h2 className="mx-2">Pokémon del día</h2>
        <ToggleFavorite id={dataPokemon.id} sessionFav={sessionFav} />
      </header>

      <Link href={`/pokemon/${dataPokemon.name}`}>
        <article className="grid xl:grid-cols-3 rounded-b-xl">
          <Image
            src={getImagePokemon(
              dataPokemon.sprites.other["official-artwork"].front_default
            )}
            alt="Relevant Pokémon"
            width="500"
            height="500"
            className="self-center xl:absolute xl:-ml-20 drop-shadow-[2px_2px_rgba(0,0,0)]"
          />

          <div className="xl:col-start-2 xl:col-span-2 p-10 text-2xl">
            <div className="flex justify-between">
              <h1 className="uppercase text-4xl">
                {dataPokemon.name.replaceAll("-", " ")}
              </h1>
              <p>{dataPokemon.id}</p>
            </div>
            <div className="w-full h-3 my-1 rounded-2xl bg-gradient-to-r from-pokeYellow-600" />

            <ProgresBar dataPokemon={dataPokemon} />
          </div>
        </article>
      </Link>
    </section>
  );
}

export default RelevantPokemon;
