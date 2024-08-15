import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ExploreButton = () => {
  return (
    <>
      <Link href="/explore">
        <Button variant={"poke"}>
          <MagnifyingGlassIcon width={"25"} />
          Explorar
        </Button>
      </Link>
    </>
  );
};

export default ExploreButton;
