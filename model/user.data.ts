import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "./database";

export async function getUserById() {
  //Recogemos el uuid de la sesion
  const session = await getServerSession(authOptions);

  //Obtenemos los datos del usuario segun su uuid
  const uuid = session?.user.uuid;

  try {
    const user = await db.users.findUnique({
      where: {
        uuid: uuid,
      },
    });

    if (!user) {
      throw new Error("User not found.");
    }

    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

