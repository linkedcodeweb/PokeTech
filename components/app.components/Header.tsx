import Link from "next/link";
import Image from "next/image";
import ExploreButton from "../header.components/ExploreButton";
import GuestAccount from "../header.components/LoginButton";
import SearchBar from "../header.components/SearchBar";
import UserAccount from "../header.components/UserAccount";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function Header() {
  const session = await getServerSession(authOptions);
  return (
    <div className="lg:flex grid grid-cols-3 items-center justify-between gap-3 md:p-5 p-2">
      <Link href="/">
        <Image
          src={"/image/logo.png"}
          alt="Logo poketech"
          width={150}
          height={50}
        />
      </Link>

      <div className="order-last lg:order-none lg:w-1/3 col-span-3">
        <SearchBar placeholder={"Busca el nombre de un Pokémon..."} />
      </div>

      <div className="flex flex-col md:flex-row col-span-2 justify-end md:gap-1 gap-3 items-center lg:w-fit md:w-full">
        <ExploreButton />
        {session?.user ? <UserAccount /> : <GuestAccount />}
      </div>
    </div>
  );
}

export default Header;
