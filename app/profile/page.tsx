import Container from "@/components/ui/container";
import DeleteUser from "@/components/user.components/DeleteUser";
import PokemonStored from "@/components/user.components/PokemonStored";
import UserData from "@/components/user.components/UserData";
import Username from "@/components/user.components/Username";

const page = ({ searchParams }: { searchParams?: { page?: string } }) => {
  return (
    <div className="grid gap-10">
      <section className="rounded-xl bg-pokeGreen-900/90">
        <Username />
      </section>
      <section>
        <Container title="Pokédex">
          <PokemonStored page={searchParams?.page} />
        </Container>
      </section>
      <section>
        <Container title="Privacidad">
          <UserData />
          <DeleteUser />
        </Container>
      </section>
    </div>
  );
};

export default page;
