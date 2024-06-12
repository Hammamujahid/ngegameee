'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client"; // Menggunakan client.ts untuk membuat klien browser
import AuthButton from "@/components/AuthButton";

// Definisikan tipe untuk game
type Game = {
  id: string;
  title: string;
  description: string;
  image_logo: string;
  size: number;
  release_year: string;  // treat as string for simplicity
  download_url: string;
};

export default function ManageDataPage({ searchParams }: { searchParams: { search: string } }) {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      let query = supabase.from('game').select('*');

      if (searchParams.search) {
        query = query.ilike('title', `%${searchParams.search}%`);
      }

      const { data, error } = await query;

      if (error) {
        setError(error.message);
      } else {
        setGames(data as Game[]);
      }
    };

    fetchData();
  }, [searchParams]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const truncateDescription = (description: string, length: number) => {
    if (description.length > length) {
      return description.substring(0, length) + " (more...)";
    }
    return description;
  };

  const calculateYearDifference = (releaseYear: string) => {
    const currentYear = new Date().getFullYear();
    const releaseYearNumber = parseInt(releaseYear, 10);
    return currentYear - releaseYearNumber;
  };

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center w-full h-screen gap-20">
      <div className="flex flex-col w-full h-screen bg-opacity-75">
        <header className="fixed flex items-center justify-between w-full px-6 py-4 text-white shadow-md bg-gray-950">
          <div className="flex items-center gap-4">
            <a className="flex items-center gap-2" href="#">
              <span className="text-lg font-semibold">NgeGameee</span>
            </a>
          </div>
          <div className="flex items-center justify-center">
          <div className="relative">
            <div
              onClick={handleDropdownToggle}
              className="cursor-pointer "
            >
              Emulator
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 w-48 mt-2 bg-white border rounded-md shadow-lg">
                <ul className="py-1">
                  <li>
                    <Link href="https://drive.google.com/file/d/1WkP6JpGkP3yXvXd-Fl4qiSX3KLhxTJ3m/view?usp=sharing" className="block px-4 py-2 text-black hover:bg-gray-100">
                    VBA-Win-x86_32
                    </Link>
                  </li>
                  <li>
                    <Link href="https://drive.google.com/file/d/11ImCG5omtb-YNDt2bXINCiHbeUOvoR-_/view?usp=sharing" className="block px-4 py-2 text-black hover:bg-gray-100">
                    VBA-Win-x86_64
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="w-4"></div>
          <AuthButton />
          </div>
        </header>
        <main className="flex flex-col items-center flex-1 w-full px-4 bg-gray-800">
  <div className="w-full max-w-4xl mt-24">
    <form method="GET" className="flex items-center justify-center w-full p-4 mt-5">
      <input
        type="text"
        name="search"
        placeholder="Search for a game..."
        defaultValue={searchParams.search}
        className="w-2/3 p-2 text-black border rounded-l-lg shadow-sm bg-slate-100"
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-gray-900 rounded-r-lg"
      >
        Go
      </button>
    </form>
    <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 lg:grid-cols-3">
      {games && games.length > 0 ? (
        games.map((game) => (
          <div key={game.id} className="bg-gray-900 border rounded-lg shadow-sm bg-card text-card-foreground" data-v0-t="card">
            <div className="flex flex-col items-center">
            <img src={game.image_logo} alt="Logo" className="object-cover w-48 h-48 mt-2 rounded-md" />
              <div className="flex-col w-full p-4 bg-">
                <div className="mb-2 text-sm text-center">
                  <Link href={`/game/${game.id}`} className="text-white hover:underline">
                    {game.title}
                  </Link>
                </div>
                <div className="text-xs text-center">
                  Release {calculateYearDifference(game.release_year)} years ago
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center w-full pt-6">No games found</div>
      )}
    </div>
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
    </div>
  );
}