"use client";

import { useRouter } from "next/navigation";
import { Toggle } from "@/components/ui/toggle";
import { StarIcon } from "@heroicons/react/16/solid";

export function ToggleFavorite({
  id,
  sessionFav,
}: {
  id: number;
  sessionFav: number[] | undefined;
}) {
  const router = useRouter();

  async function handleFavorite() {
    if (sessionFav === undefined) {
      router.push("/login");
      return;
    }
    const response = await fetch("/api/updateFavorite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pokemonID: id,
      }),
    });

    if (response.ok) {
      router.refresh();
      console.log("Pokemon actualizado correctamente");
    } else {
      console.log("Error al actualizar pokemon");
    }
  }

  return (
    <Toggle
      key={id}
      aria-label="Toggle"
      defaultPressed={sessionFav?.includes(id)}
      variant="favorite"
      size="favorite"
      onPressedChange={() => {
        handleFavorite();
      }}
    >
      <StarIcon width={35} />
    </Toggle>
  );
}
