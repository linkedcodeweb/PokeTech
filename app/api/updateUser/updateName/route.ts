"use server";

import { db } from "../../../../model/database";
import { NextResponse } from "next/server";
import * as z from "zod";
import { getUserById } from "../../../../model/user.data";

// esquema para la validación de los datos
const userSchema = z.object({
  name: z
    .string()
    .min(1, "Usuario obligatorio")
    .max(20, "Máximo 20 caracteres"),
});

export async function POST(request: Request) {
  const user = await getUserById();
  const uuid = user.uuid;

  try {
    const body = await request.json();

    const { name } = userSchema.parse(body);

    //Guardar los datos en la base de datos
    const updateName = await db.users.update({
      where: {
        uuid: uuid,
      },
      data: {
        name: name,
      },
    });
    return NextResponse.json({
      user: updateName.name,
      message: "Nombre de usuario actualizado",
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Error en el servidor", status: 500 });
  }
}
