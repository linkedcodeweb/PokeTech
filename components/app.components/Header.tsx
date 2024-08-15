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
    <div className="flex flex-wrap items-center justify-between gap-3 p-8">
      <Link href="/">
        <Image
          src={"/image/logo.png"}
          alt="Logo poketech"
          width={150}
          height={50}
          className="hidden xl:block"
        />
      </Link>
     
      <div className="grow order-last xl:order-none">
        <SearchBar placeholder={"Busca el nombre de un Pokémon..."} />
      </div>
      <div className="flex items-center">
       
      </div>
    </div>
  );
}

export default Header;
