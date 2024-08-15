import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/app.components/Header";
import Footer from "@/components/app.components/Footer";
import SessionProvider from "@/components/app.components/SessionProvider";
import { Play ,Fredoka} from 'next/font/google'

export const metadata: Metadata = {
  title: "PokéTech",
  description: "Encuentra todo sobre Pokémon",
};
const fredoka = Fredoka({
  weight: '500',
  subsets: ['latin'],
  variable: '--font-fredoka',
})
const play = Play({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-play',
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${fredoka.variable} ${play.variable}`}>
      <body className="flex flex-col justify-between min-w-full min-h-screen text-xl text-white bg-[url('/image/bgWide.jpg')] bg-no-repeat bg-aumented md:bg-contain bg-top bg-pokeGreen-800">
        <SessionProvider>
          <header className="absolute min-w-full">
            <Header />
          </header>
          <main className="xl:mx-36 mx-4 mt-72 mb-24">{children}</main>
          <footer>
            <Footer />
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}

