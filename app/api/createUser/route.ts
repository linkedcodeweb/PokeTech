import { db } from "../../../model/database";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as z from "zod";

// esquema para la validación de los datos
const userSchema = z.object({
  username: z
    .string()
    .min(1, "Usuario obligatorio")
    .max(20, "Máximo 20 caracteres"),
  email: z.string().min(1, "Email obligatorio").email("Email incorrecto"),
  password: z
    .string()
    .min(1, "Contraseña obligatoria")
    .min(8, "Al menos 8 caracteres"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, username, password } = userSchema.parse(body);

    // Comprobar si se repite el email
    const existUserEmail = await db.users.findUnique({
      where: {
        email: email,
      },
    });
    if (existUserEmail) {
      return NextResponse.json({
        user: null,
        message: "El email ya está en uso",
        status: 409,
      });
    }

    // Comprobar si se repite el usuario
    const existUserName = await db.users.findUnique({
      where: {
        username: username,
      },
    });
    if (existUserName) {
      return NextResponse.json({
        user: null,
        message: "El usuario ya está en uso",
        status: 409,
      });
    }

    //Guardar los datos en la base de datos
    const hashPassword = await hash(password, 10);
    const newUser = await db.users.create({
      data: {
        name: username,
        email,
        username,
        password: hashPassword,
      },
    });

    // Devolvemos el usuario sin la contraseña
    const { password: newUserPassword, ...rest } = newUser;

    return NextResponse.json({
      user: rest.name,
      message: "Usuario creado",
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Error en el servidor", status: 500 });
  }
}
