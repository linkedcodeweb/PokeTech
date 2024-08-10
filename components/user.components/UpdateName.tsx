"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import React from "react";
import { PencilSquareIcon } from "@heroicons/react/16/solid";

const formSchema = z.object({
  name: z.string().min(1, "Nombre obligatorio").max(20, "Máximo 20 caracteres"),
});

const UpdateName = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //Llamamos a updateUsername para modificar el nombre de usuario
    const response = await fetch("/api/updateUser/updateName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
      }),
    });

    if (response.ok) {
      router.refresh();
      console.log("Nombre de usuario modificado correctamente");
    } else {
      console.error("Error al actualizar el nombre de usuario");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="w-full space-y-2 pb-2"
        >
          <div className="flex items-center justify-between">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="rounded-full">
                <PencilSquareIcon className="h-5 w-5" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white font-bold">
                    Nuevo nombre
                  </FormLabel>
                  <FormControl>
                    <Input {...field} className="text-black" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant={"poke"} className="w-full" type="submit">
              MODIFICAR
            </Button>
          </CollapsibleContent>
        </Collapsible>
      </form>
    </Form>
  );
};

export default UpdateName;
