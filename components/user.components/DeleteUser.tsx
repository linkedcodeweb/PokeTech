"use client";

import { Button } from "@/components/ui/button";
import * as React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { UserMinusIcon } from "@heroicons/react/16/solid";
import { signOut } from "next-auth/react";

function DeleteUser() {
  const [isOpen, setIsOpen] = React.useState(false);

  const onSubmit = async (event: React.FormEvent) => {
    //hacemos preventdafault para que no se recargue la página
    event.preventDefault();

    const response = await fetch("/api/deleteUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/`,
      });
      console.log("Usuario eliminado correctamente");
    } else {
      console.error("Error al eliminar el usuario");
    }
  };

  return (
    <form onSubmit={onSubmit} className="p-10 ">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-1/3 p-4 space-y-2 border-2 rounded-xl border-pokeWarning-900 bg-pokeWarning-800/20"
      >
        <div className="flex items-center justify-between space-x-4 px-4 ">
          <p className="text-xl">Eliminar la cuenta</p>
          <CollapsibleTrigger asChild>
            <Button variant="pokeOut" size="sm">
              <UserMinusIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          <div className="px-4 py-2 border rounded-md shadow-sm font-mono">
            Esto eliminará todos tus datos de manera irreversible. ¿Continuar?
          </div>
          <Button variant={"pokeOut"} className="w-full" type="submit">
            CONFIRMAR
          </Button>
        </CollapsibleContent>
      </Collapsible>
    </form>
  );
}

export default DeleteUser;
