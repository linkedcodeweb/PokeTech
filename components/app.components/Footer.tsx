import Link from "next/link";
import Image from "next/image";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <section className="flex flex-col h-50 ">
      <article className="flex items-center justify-center h-10 p-6 text-pokeYellow-600 bg-pokeGreen-950">
        <Link href={"https://pokeapi.co/"} className="m-5">
          PokeAPI
        </Link>
        <Link href={"https://github.com/linkedcodeweb"} className="m-5">
          GitHub
        </Link>
      </article>
      <article className="grid grid-cols-5 place-items-center p-6 bg-pokeGreen-900">
        <p className="col-span-2 justify-self-end text-right">
          Web desarrollada por Linked Code
        </p>
        <Image
          src={"/image/LClogo.png"}
          alt="Logo Linked Code"
          width={130}
          height={130}
        />
        <p className="col-span-2">
          Todos los derechos pertenecen a sus respectivos dueños
        </p>
      </article>
      <article className="flex items-center justify-center h-10 p-6 bg-pokeGreen-950">
        <h3 className="self-center">LINKED CODE - {year}</h3>
      </article>
    </section>
  );
}

export default Footer;