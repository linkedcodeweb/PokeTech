"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Button } from "./button";
import { Input } from "./input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(1, "Email obligatorio").email("Email incorrecto"),
  password: z
    .string()
    .min(1, "Contraseña obligatoria")
    .min(8, "Al menos 8 caracteres"),
});

const loginForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const loginData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (loginData?.error) {
      console.log("Error en el login");
      console.log(loginData.error);
      alert("Error en el login, comprueba tus credenciales");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@ejemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Introduce tu contraseña"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" variant={"poke"}>
          Iniciar Sesión
        </Button>
        <div className="mx-auto my-4">
          <hr />
          <Button className="w-full p-3 my-4" variant={"pokeLight"}>
            <Link href="/register">Registrarse</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default loginForm;
