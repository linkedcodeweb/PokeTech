import Image from "next/image";
import { getUserById } from "@/model/user.data";

const Username = async () => {
  //Obtenemos los datos del usuario
  const user = await getUserById();

  return (
    <article className="grid md:grid-cols-3 p-6 rounded-b-xl">
      <Image
        src={"/profile/" + user.avatar_path} //imagen de perfil del user
        alt="Foto Perfil"
        width={300}
        height={300}
        className="size-48 mx-auto object-cover border-4 rounded-full border-white"
      />

      <header className="md:col-start-2 md:col-span-2 p-10 text-3xl font-bold">
        <h1 className="text-3xl font-bold text-white ">{user.username}</h1>
        <div className="w-full h-3 my-1 rounded-2xl bg-gradient-to-r from-pokeYellow-600" />
      </header>
    </article>
  );
};

export default Username;
