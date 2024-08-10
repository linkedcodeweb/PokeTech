import { getUserById } from "@/model/user.data";
import CardPokemon from "../explore.components/CardPokemon";
import { fetchPokemonUser } from "../../model/pokemon.fetch";
import Pagination from "../ui/pagination";

async function PokemonStored({ page }: { page?: string }) {
  const user = await getUserById();
  const pokemons = user.save_pokemon;

  //paginación
  const ITEMS_PER_PAGE = 6;
  const totalPokemons = pokemons.length;
  const totalPages = Math.ceil(totalPokemons / ITEMS_PER_PAGE);
  const currentPage = Number(page) || 1;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  //fetch array de pokemons y paginacion
  const dataPokemon = fetchPokemonUser(pokemons, offset, ITEMS_PER_PAGE);

  return (
    <>
      <CardPokemon dataPokemon={dataPokemon} />
      {totalPages <= 1 ? null : <Pagination totalPages={totalPages} />}
    </>
  );
}

export default PokemonStored;
