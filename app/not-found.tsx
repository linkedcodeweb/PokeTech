import Image from "next/image";

export default function NotFound() {
  return (
    <section className="grid lg:grid-cols-2 lg:p-24 py-10 px-2 rounded-xl bg-pokeGreen-900/70">
      <Image
        src="/pokemon/MissingNo.jpg"
        width={300}
        height={300}
        alt="Missingno"
        className="rounded-xl justify-self-center shadow-xl shadow-pokeYellow-400/50"
      />
      <div className="h-full content-center text-center pt-16">
        <h1 className="lg:text-5xl text-3xl font-semibold text-pokeYellow-800">
          <span className="p-2 border-r-4 border-r-pokeYellow-800 mr-6"> 404 </span>Not Found
        </h1>
        <p className="text-2xl text-pokeYellow-100 mt-8">
          Vaya... Este no es el Pokémon que buscabas...
        </p>
      </div>
    </section>
  );
}
