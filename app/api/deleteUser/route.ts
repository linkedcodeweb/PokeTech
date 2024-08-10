"use server";

import { db } from "../../../model/database";
import { NextResponse } from "next/server";
import { getUserById } from "../../../model/user.data";

// esquema para la validación de los datos

export async function POST(request: Request) {
  const user = await getUserById();
  const uuid = user.uuid;

  try {
    //Guardar los datos en la base de datos
    const deleteUser = await db.users.delete({
      where: {
        uuid: uuid,
      },
    });
    return NextResponse.json({
      user: deleteUser.name,
      message: "Usuario eliminado",
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Error en el servidor", status: 500 });
  }
}
