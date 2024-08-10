import CardPokemon from "@/components/explore.components/CardPokemon";
import Pagination from "@/components/ui/pagination";
import {
  filterPokemon,
  getField,
  getPropertiesPokemon,
  typePokemon,
} from "@/model/pokemon.fetch";

async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    type?: string;
  };
}) {
  //se usa searchParams porque el componente es de servidor - useSearchParams() es para cliente
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const type = searchParams?.type || "";
  const ITEMS_PER_PAGE = 15;

  let list;
  if (type == "") {
    list = (await getField("pokemon")).results;
  } else {
    const listTypes = (await getField("type")).results.filter((item) =>
      type.includes(item.name)
    );
    list = await typePokemon(listTypes[0].url);
  }

  const totalList = await filterPokemon(list, query);

  const totalItems = totalList.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const dataPokemon = getPropertiesPokemon(totalList, ITEMS_PER_PAGE, offset);

  return (
    <>
      <CardPokemon dataPokemon={dataPokemon} />
      {totalPages <= 1 ? null : <Pagination totalPages={totalPages} />}
    </>
  );
}

export default Page;
