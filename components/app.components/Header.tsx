import Link from "next/link";
import SearchBar from "../header.components/SearchBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserAccount from "../header.components/UserAccount";
import Image from "next/image";
import GuestAccount from "../header.components/LoginButton";
import ExploreButton from "../header.components/ExploreButton";

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full flex items-center justify-between p-8">
      <Link className="hover:drop-shadow-lg" href="/">
        <Image
          src={"/image/logo.png"}
          alt="Logo poketech"
          width={150}
          height={50}
        />
      </Link>
      <div className="w-1/3">
        <SearchBar placeholder={"Busca el nombre de un Pokémon..."} />
      </div>
      <div className="flex items-center p-2">
        <ExploreButton />
        {session?.user ? <UserAccount /> : <GuestAccount />}
      </div>
    </div>
  );
};

export default Header;
