import { Pokemon } from "@/types/pokemon.types";
import React from "react";
import { ToggleFavorite } from "../app.components/ToggleFavorite";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { getImagePokemon } from "@/model/pokemon.fetch";
import Image from "next/image";

async function CardPokemon({
  dataPokemon
}: {
  dataPokemon: Promise<Pokemon[]>;
}) {
  const dataPokemonCard = await dataPokemon;
  const sessionFav = await getServerSession(authOptions).then(
    (session) => session?.user.favorite
  );

  return (
    <section className="flex flex-wrap justify-center items-center gap-6 m-4">
      {dataPokemonCard.length === 0 ? (
        <p className="p-6 rounded-xl bg-pokeGreen-500">
          Vaya... Parece que el Pokémon que buscas no ha sido descubierto aún.
        </p>
      ) : (
        dataPokemonCard.map((pokemon) => {
          return (
            <article
              key={pokemon.id}
              className="w-48 capitalize rounded-xl bg-pokeGreen-600"
            >
              <header className="grid grid-flow-row-dense grid-cols-5 p-2 text-pokeGreen-800 border-b-4 rounded-t-xl border-pokeGreen-900/90 bg-pokeYellow-800">
                <p className="col-span-4 truncate">
                  {pokemon.name.replaceAll("-", " ")}
                </p>
                <p className="col-span-4 text-base">{pokemon.id}</p>
                <div className="row-span-2 place-self-center">
                  <ToggleFavorite id={pokemon.id} sessionFav={sessionFav} />
                </div>
              </header>
              <Link href={`/pokemon/${pokemon.name}`} className="flex flex-col">
                <Image
                  src={getImagePokemon(
                    pokemon.sprites.other["official-artwork"].front_default
                  )}
                  alt={`Sprite Pokemon ${pokemon.name}`}
                  width="170"
                  height="170"
                  className="self-center m-1 z-0 hover:scale-150 transition duration-500 ease-in-out drop-shadow-[3px_3px_rgba(0,0,0)]"
                />
                <div className="flex flex-row justify-center p-1">
                  {pokemon.types.map((value) => (
                    <div
                      key={value.type.name}
                      className={`w-full m-1 p-2 z-10 capitalize text-center border-2 rounded-xl border-pokeGreen-900/90 bg-filter-${value.type.name}`}
                    >
                      <span className="drop-shadow-[2px_2px_rgba(0,0,0)]">
                        {value.type.name}
                      </span>
                    </div>
                  ))}
                </div>
              </Link>
            </article>
          );
        })
      )}
    </section>
  );
}

export default CardPokemon;
