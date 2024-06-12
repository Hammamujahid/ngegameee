'use client';

import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from 'react';

// Definisikan tipe untuk game
type Game = {
  id: string;
  title: string;
  description: string;
  image_logo: string;
  size: number;
  release_year: string;
  download_url: string;
  created_at: string;
};

export default function ManageDataPage() {
  const supabase = createClient();
  const router = useRouter();
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);

      const { data, error } = await supabase.from('game').select('*');
      if (error) {
        setError(error.message);
      } else {
        setGames(data as Game[]);
      }
    };

    fetchData();
  }, [router, supabase]);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this game?");
    if (!confirmDelete) return;

    const { error } = await supabase.from('game').delete().eq('id', id);
    if (error) {
      console.error("Error deleting data:", error.message);
    } else {
      setGames(games.filter(game => game.id !== id));
      alert("Game deleted successfully");
    }
  };

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString();
  };

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return (
    <div className="flex flex-col w-full min-h-screen">
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
          <div className="w-48 mt-2">
            <ul className="py-1">
              <li>
                <Link href="/protected" className="block px-4 py-2 text-white hover:bg-gray-900">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/protected/manage-data" className="block px-4 py-2 text-white hover:bg-gray-900">
                  Manage Data
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-1/5"></div>
        <div className="w-4/5 px-8">
          <div className="mt-10 overflow-x-auto">
            <table className="w-full max-w-full text-sm text-white bg-gray-800 border border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-white bg-gray-900 border">ID</th>
                  <th className="px-4 py-2 text-white bg-gray-900 border">Title</th>
                  <th className="px-4 py-2 text-white bg-gray-900 border">Description</th>
                  <th className="px-4 py-2 text-white bg-gray-900 border">Image Logo</th>
                  <th className="px-4 py-2 text-white bg-gray-900 border">Size</th>
                  <th className="px-4 py-2 text-white bg-gray-900 border">Release Year</th>
                  <th className="px-4 py-2 text-white bg-gray-900 border">Download URL</th>
                  <th className="px-4 py-2 text-white bg-gray-900 border">Created At</th>
                  <th className="px-4 py-2 text-white bg-gray-900 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {games.map((game, index) => (
                  <tr key={game.id} className="hover:bg-gray-700">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{game.title}</td>
                    <td className="px-4 py-2 border">{game.description ? "true" : "false"}</td>
                    <td className="px-4 py-2 border">{game.image_logo ? "true" : "false"}</td>
                    <td className="px-4 py-2 border">{game.size}</td>
                    <td className="px-4 py-2 border">{game.release_year}</td>
                    <td className="px-4 py-2 border">{game.download_url ? "true" : "false"}</td>
                    <td className="px-4 py-2 border">{formatDateTime(game.created_at)}</td>
                    <td className="flex flex-col gap-2 px-4 py-2 border">
                      <Link href={`/protected/manage-data/form-update/${game.id}`}>
                        <button className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-700">Update</button>
                      </Link>
                      <button
                        onClick={() => handleDelete(game.id)}
                        className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end w-full my-6">
            <Link href="/protected/manage-data/form">
              <div className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline">
                Add
              </div>
            </Link>
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
  );
}
