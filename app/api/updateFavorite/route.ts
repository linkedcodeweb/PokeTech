"use server";

import { NextResponse } from "next/server";
import { db } from "../../../model/database";
import { getUserById } from "../../../model/user.data";

export async function POST(request: Request) {
  const user = await getUserById();
  const uuid = user.uuid;
  const body = await request.json();
  body.pokemonID = parseInt(body.pokemonID);

  let updateFavorite: number[];

  if (user.save_pokemon.includes(body.pokemonID)) {
    //quitamos del array el id del pokemon
    updateFavorite = user.save_pokemon.filter((id) => id !== body.pokemonID);
  } else {
    user.save_pokemon.push(body.pokemonID);
    updateFavorite = user.save_pokemon;
  }

  try {
    const updatePokemons = await db.users.update({
      where: {
        uuid: uuid,
      },
      data: {
        save_pokemon: updateFavorite,
      },
    });

    return NextResponse.json({
      user: user.save_pokemon,
      message: "Pokemons favoritos actualizados",
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Error en el servidor", status: 500 });
  }
}
