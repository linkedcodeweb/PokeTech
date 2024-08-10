import { ToggleFavorite } from "@/components/app.components/ToggleFavorite";
import ProgresBar from "@/components/pokemonInfo.components/ProgresBar";
import Container from "@/components/ui/container";
import { authOptions } from "@/lib/auth";
import {
  getField,
  getGenericData,
  getImagePokemon,
} from "@/model/pokemon.fetch";
import { EvolutionChain } from "@/types/evolution-chain.types";
import { PokemonSpecies } from "@/types/pokemon-species.types";
import { Pokemon } from "@/types/pokemon.types";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";

async function page({ params }: { params: { name: string } }) {
  const fieldPokemon = "pokemon/";
  const sessionFav = await getServerSession(authOptions).then(
    (session) => session?.user.favorite
  );

  const dataPokemon = (await getField(fieldPokemon + params.name).then(
    (data) => data
  )) as Pokemon;

  const dataPokemonSpecies = (await getGenericData(
    dataPokemon.species.url
  )) as PokemonSpecies;

  const dataEvolution = (await getGenericData(
    dataPokemonSpecies.evolution_chain.url
  ).then((data) => data)) as EvolutionChain;

  return (
    <div className="grid gap-10">
      {/* Pokemon */}
      <section className="grid grid-cols-3 rounded-xl bg-pokeGreen-900/90">
        <Image
          src={getImagePokemon(
            dataPokemon.sprites.other["official-artwork"].front_default
          )}
          alt="Pokemon"
          width="450"
          height="450"
          className="place-self-center row-span-2 -m-16 drop-shadow-[2px_2px_rgba(0,0,0)]"
        />
        <div className="col-start-2 col-end-4 justify-self-end h-fit m-3">
          <ToggleFavorite id={dataPokemon.id} sessionFav={sessionFav} />
        </div>
        <article className="col-start-2 col-end-4 m-9 p-2">
          <header className="flex justify-between items-center">
            <h1 className="uppercase text-3xl font-bold">
              {dataPokemon.name.replaceAll("-", " ")}
            </h1>
            <p className="font-semibold">{dataPokemon.id}</p>
          </header>
          <div className="h-3 w-full my-1 rounded-2xl bg-gradient-to-r from-pokeYellow-600" />
          <div className="my-5 text-2xl">
            {dataPokemonSpecies.flavor_text_entries.find(
              (item) => item.language.name === "es"
            )?.flavor_text ??
              "Aún no se ha investigado lo suficiente sobre este Pokémon."}
          </div>
        </article>
      </section>

      {/* Stats / Charcaterics */}
      <section className="grid grid-cols-2 gap-10">
        <Container title="Estadísticas">
          <div className="p-5">
            <ProgresBar dataPokemon={dataPokemon} />
          </div>
        </Container>

        <Container title="Características">
          <div className="grid grid-cols-2 place-content-around gap-5 h-full p-5 uppercase">
            <p>Generación:</p>
            <p>
              {dataPokemonSpecies.generation.name.replaceAll("generation-", "")}
            </p>
            <p>Experiencia base:</p>
            <p>{dataPokemon.base_experience}</p>
            <p>Altura: </p>
            <p>{dataPokemon.height / 10} metros</p>
            <p>Peso: </p>
            <p>{dataPokemon.weight / 10} kilos</p>
            <p>Ratio captura: </p>
            <p>{dataPokemonSpecies.capture_rate} %</p>
            <p>Evoluciones: </p>
            <div className="flex flex-col capitalize">
              <p>{dataEvolution.chain.species.name.replaceAll("-", " ")}</p>
              <p>
                {dataEvolution.chain.evolves_to.map((item) =>
                  item.species.name.replaceAll("-", " ")
                )}
              </p>
              <p>
                {dataEvolution.chain.evolves_to.map((item) =>
                  item.evolves_to.map((item) =>
                    item.species.name.replaceAll("-", " ")
                  )
                )}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Rugido / Types / Specials */}
      <section className="grid grid-cols-3 gap-10">
        <Container title="Rugido">
          <div className="grid place-content-center min-h-full">
            <audio src={dataPokemon.cries.latest} controls />
          </div>
        </Container>

        <Container title="Tipos">
          <div className="grid gap-3 min-h-full p-4">
            {dataPokemon.types.map((type) => (
              <div
                key={type.slot}
                className={`size-full p-3 rounded-xl text-center text-2xl capitalize bg-filter-${type.type.name}`}
              >
                <span className="drop-shadow-[2px_2px_rgba(0,0,0)]">
                  {type.type.name}
                </span>
              </div>
            ))}
          </div>
        </Container>

        <Container title="Especial">
          <div className="grid min-h-full py-4 px-10">
            <p className="flex justify-between items-center">
              LEGENDARIO:
              {dataPokemonSpecies.is_legendary ? (
                <CheckCircleIcon width={"30px"} />
              ) : (
                <XCircleIcon width={"30px"} />
              )}
            </p>

            <p className="flex justify-between items-center ">
              MÍTICO:
              {dataPokemonSpecies.is_mythical ? (
                <CheckCircleIcon width={"30px"} />
              ) : (
                <XCircleIcon width={"30px"} />
              )}
            </p>
          </div>
        </Container>
      </section>

      {/* Sprites */}
      <section className="grid grid-cols-2 gap-10">
        <Container title="Sprites">
          <div className="grid grid-cols-2 place-content-center justify-items-center p-10">
            <Image
              src={getImagePokemon(dataPokemon.sprites.front_default)}
              alt="front_default"
              width={"200"}
              height={"200"}
            />

            <Image
              src={getImagePokemon(dataPokemon.sprites.back_default)}
              alt="back_default"
              width={"200"}
              height={"200"}
            />
            <Image
              src={getImagePokemon(dataPokemon.sprites.front_shiny)}
              alt="front_shiny"
              width={"200"}
              height={"200"}
            />
            <Image
              src={getImagePokemon(dataPokemon.sprites.back_shiny)}
              alt="back_shiny"
              width={"200"}
              height={"200"}
            />
            <Image
              src={getImagePokemon(
                dataPokemon.sprites.versions["generation-v"]["black-white"]
                  .animated.front_default
              )}
              alt="animated_front"
              width={"200"}
              height={"200"}
              unoptimized
            />
            <Image
              src={getImagePokemon(
                dataPokemon.sprites.versions["generation-v"]["black-white"]
                  .animated.back_default
              )}
              alt="animated_back"
              width={"200"}
              height={"200"}
              unoptimized
            />
          </div>
        </Container>
       
      
        <Container title="Shiny">
          <div className="flex justify-center items-center h-full">
            <Image
              src={getImagePokemon(
                dataPokemon.sprites.other["official-artwork"].front_shiny
              )}
              alt="big_shiny"
              width="600"
              height="600"
            />
          </div>
        </Container>
      </section>
    </div>
  );
}

export default page;
