"use server";

import { db } from "../../../../model/database";
import { NextResponse } from "next/server";
import * as z from "zod";
import { getUserById } from "../../../../model/user.data";

// esquema para la validación de los datos
const userSchema = z.object({
  username: z
    .string()
    .min(1, "Usuario obligatorio")
    .max(20, "Máximo 20 caracteres"),
});

export async function POST(request: Request) {
  const user = await getUserById();
  const uuid = user.uuid;

  try {
    const body = await request.json();

    const { username } = userSchema.parse(body);

    //contamos los usernames que existen en la base de datos con el mismo nombre
    const duplicateUsername = await db.users.count({
      where: {
        username: username,
      },
    });

    if (duplicateUsername > 0) {
      return NextResponse.json({
        user: null,
        message: "El username ya está en uso",
        status: 409,
      });
    }

    //Guardar los datos en la base de datos
    const updateUsername = await db.users.update({
      where: {
        uuid: uuid,
      },
      data: {
        username: username,
      },
    });
    return NextResponse.json({
      user: updateUsername.name,
      message: "Nombre de usuario actualizado",
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Error en el servidor", status: 500 });
  }
}
