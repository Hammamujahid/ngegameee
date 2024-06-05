import { createClient } from "@/utils/supabase/server";
import AuthButton from "@/components/AuthButton";
import Link from "next/link";

// Definisikan tipe untuk game
type Game = {
  id: string;
  title: string;
  description: string;
  image_logo: string;
  image_thumbnail: string;
  min_req: string;
  size: number;
  release_year: string; // treat as string for simplicity
  download_url: string;
};

export default async function Index({ searchParams }: { searchParams: { search: string } }) {
  const supabase = createClient();

  // Ambil data game dari Supabase
  let query = supabase.from('game').select('*');

  // Jika ada parameter pencarian, lakukan filter berdasarkan title
  if (searchParams.search) {
    query = query.ilike('title', `%${searchParams.search}%`);
  }

  const { data: games, error } = await query;

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
    <div className="flex flex-col items-center w-full min-h-screen gap-20">
      <div className="flex flex-col w-full">
        <header className="flex items-center justify-between px-6 py-4 text-white bg-gray-900 shadow-md">
          <div className="flex items-center gap-4">
            <a className="flex items-center gap-2" href="#">
              <span className="text-lg font-semibold">NgeGameee</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-between w-full max-w-4xl p-3 text-sm">
              <AuthButton />
            </div>
          </div>
        </header>
        <main className="flex flex-col items-center flex-1 w-full bg-gray-100 dark:bg-gray-800">
          <div className="w-full max-w-4xl">
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
            {games && games.length > 0 ? (
              games.map((game) => (
                <div key={game.id} className="my-8 border rounded-lg shadow-sm bg-card text-card-foreground" data-v0-t="card">
                  <div className="flex items-center">
                    <div className="p-4 w-80">
                      <img src={game.image_logo} alt="Logo" className="object-cover w-48 h-48" />
                    </div>
                    <div className="flex-col pr-4">
                      <h3 className="text-xl">{game.title}</h3>
                      <p>{game.release_year}</p>
                      <p className="text-xs">{truncateDescription(game.description, 250)}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center pt-6">No games found</div>
            )}
          </div>
        </main>
        <footer className="flex justify-center w-full p-8 mt-auto text-xs text-center bg-gray-900 border-t border-t-foreground/10">
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
