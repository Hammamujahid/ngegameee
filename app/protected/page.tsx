"use client";

import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import Link from "next/link";

// Definisikan tipe untuk game
type Game = {
  id: string;
  title: string;
  description: string;
  image_logo: string;
  size: number;
  release_year: string; // treat as string for simplicity
  download_url: string;
};

export default async function ProtectedPage() {
  const supabase = createClient();

  // Dapatkan pengguna
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect ke halaman login jika pengguna belum login
  if (!user) {
    redirect("/login");
  }

  // Ambil data game dari Supabase
  const { data: games, error } = await supabase.from("game").select("*");
  if (error) {
    console.error("Error fetching data:", error.message);
    return <div>Error fetching data</div>;
  }

  // Fungsi untuk memotong deskripsi
  const truncateDescription = (description: string, length: number) => {
    if (description.length > length) {
      return description.substring(0, length) + " (more...)";
    }
    return description;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed flex items-center justify-between w-screen px-6 py-4 text-white shadow-md bg-gray-950">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">NgeGameee</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-full">
            <nav className="flex justify-center w-full h-16">
              <div className="flex items-center justify-between w-full max-w-4xl p-3 text-sm">
                <AuthButton />
              </div>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex flex-1 mt-24 bg-gray-100 dark:bg-gray-800">
        <div className="fixed w-1/5 h-screen px-6 bg-gray-950">
          <div className="w-48 mt-2 ">
            <ul className="py-1">
              <li>
                <Link
                  href="/protected"
                  className="block px-4 py-2 text-white hover:bg-gray-900"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/protected/manage-data"
                  className="block px-4 py-2 text-white hover:bg-gray-900"
                >
                  Manage Data
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-1/5"></div>
        <div className="flex flex-col w-4/5 px-8">
          <div className="flex justify-center w-full pb-10 mt-10">
            <div className="flex flex-col border border-gray-900 rounded-lg h-36 w-36 solid">
              <div className="flex items-center justify-center bg-gray-900 h-1/3">
                Total Game
              </div>
              <div className="flex items-center justify-center text-4xl h-2/3">
              {games.length}
              </div>
            </div>
          </div>
          {games?.map((game) => (
            <div
              key={game.id}
              className="my-2 ml-4 border rounded-lg shadow-sm bg-card text-card-foreground"
              data-v0-t="card"
            >
              <div className="flex items-center">
                <div className="p-4 w-80">
                  <img src={game.image_logo} alt="Logo" />
                </div>
                <div className="flex-col pr-4">
                  <h3 className="text-xl">{game.title}</h3>
                  <p>{game.release_year}</p>
                  <p className="text-xs">
                    {truncateDescription(game.description, 250)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="flex justify-center w-full p-8 mt-auto text-xs text-center border-t bg-gray-950 border-t-foreground/10">
        <p>
          Created by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            ZerXOniN
          </a>
        </p>
      </footer>
    </div>
  );
}
