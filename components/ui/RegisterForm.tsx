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
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const formSchema = z
  .object({
    username: z
      .string()
      .min(1, "Usuario obligatorio")
      .max(20, "Máximo 20 caracteres"),
    email: z.string().min(1, "Email obligatorio").email("Email incorrecto"),
    password: z
      .string()
      .min(1, "Contraseña obligatoria")
      .min(8, "Al menos 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirmación obligatoria"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Las contraseñas no coinciden",
  });

const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      const loginData = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (loginData?.error) {
        console.log("Error en el login");
        console.log(loginData.error);
      } else {
        router.push("/");
        router.refresh();
      }
      console.log("Usuario creado");
    } else {
      console.error("Error al crear el usuario");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Usuario</FormLabel>
              <FormControl>
                <Input placeholder="Usuario93" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Email</FormLabel>
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
                  placeholder="Al menos 8 caracteres"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Repite la contraseña
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Repite la contraseña"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" variant={"poke"}>
          Crear Cuenta
        </Button>
        <div className="mx-auto my-4">
          <hr />
          <Button className="w-full p-3 my-4" variant={"pokeLight"}>
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
