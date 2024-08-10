import { Pokemons } from "@/types/type.types";
import { Result, Search } from "../types/search.types";
import { Pokemon } from "@/types/pokemon.types";
import { notFound } from "next/navigation";

const URL = "https://pokeapi.co/api/v2/";

export function getField(
  field: string,
  limit: number = 99999,
  offset: number = 0
): Promise<Search> {
  //limit y offset para obtener todos los resultados. La api solo devuelve 20 resultados
  const url = `${URL}${field}?limit=${limit}&offset=${offset}}`;
  return fetch(url).then((response) =>
    response.ok ? response.json() : notFound()
  );
}

export function getGenericData(url: string) {
  return fetch(url).then((response) =>
    response.ok ? response.json() : notFound()
  );
}

export async function filterPokemon(
  list: Result[],
  query: string
): Promise<Result[]> {
  return list.filter((pokemon) => pokemon.name.includes(query));
}

export async function typePokemon(list: string): Promise<Result[]> {
  return fetch(list).then((response) =>
    response
      .json()
      .then((data) => data.pokemon)
      .then((data) => data.map((item: Pokemons) => item.pokemon))
  );
}

export async function getPropertiesPokemon(
  listURL: Result[],
  ITEMS_PER_PAGE: number,
  offset: number
): Promise<Pokemon[]> {
  const limit = offset + ITEMS_PER_PAGE;

  try {
    return await Promise.all(
      listURL
        .slice(offset, limit)
        .map((pokemon) =>
          fetch(pokemon.url).then((response) => response.json())
        )
    );
  } catch (error) {
    console.log(error);
    notFound();
    return [];
  }
}

export async function fetchPokemonUser(
  pokemons: number[],
  offset: number,
  ITEMS_PER_PAGE: number
): Promise<Pokemon[]> {
  const limit = offset + ITEMS_PER_PAGE;
  const urlSingle = `${URL}pokemon/`;

  return await Promise.all(
    pokemons
      .slice(offset, limit)
      .map((pokemon) =>
        fetch(urlSingle + pokemon).then((response) => response.json())
      )
  );
}

export function getImagePokemon(sprite: string) {
  return sprite === null ? "/pokemon/pokeball.png" : sprite;
}

//Antiguo filtro ------------------------------------------------------------
export async function mergeTypePokemon(list: Result[]): Promise<Result[]> {
  const result = await Promise.all(
    list.map((type) =>
      fetch(type.url)
        .then((response) => response.json())
        .then((data) => data.pokemon)
        .then((data) => data.map((item: Pokemons) => item.pokemon))
    )
  );

  return result.flat(2);
}
