"use server";

import { db } from "../../../../model/database";
import { NextResponse } from "next/server";
import * as z from "zod";
import { getUserById } from "../../../../model/user.data";

// esquema para la validación de los datos
const userSchema = z.object({
  email: z.string().min(1, "Email obligatorio").email("Email no válido"),
});

export async function POST(request: Request) {
  const user = await getUserById();
  const uuid = user.uuid;

  try {
    const body = await request.json();

    const { email } = userSchema.parse(body);

    //contamos los usernames que existen en la base de datos con el mismo nombre
    const duplicateEmail = await db.users.count({
      where: {
        email: email,
      },
    });

    if (duplicateEmail > 0) {
      return NextResponse.json({
        user: null,
        message: "El email ya está en uso",
        status: 409,
      });
    }

    //Guardar los datos en la base de datos
    const updateEmail = await db.users.update({
      where: {
        uuid: uuid,
      },
      data: {
        email: email,
      },
    });
    return NextResponse.json({
      user: updateEmail.email,
      message: "Email actualizado",
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error en el servidor", status: 500 });
  }
}
