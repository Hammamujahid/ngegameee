'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client"; // Menggunakan client.ts untuk membuat klien browser
import AuthButton from "@/components/AuthButton";

type Game = {
  id: string;
  title: string;
  description: string;
  image_logo: string;
  image_thumbnail: string;
  min_req: string;
  size: number;
  release_year: string;  // treat as string for simplicity
  download_url: string;
};

export default function ManageDataPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from('game').select('*');
      if (error) {
        setError(error.message);
      } else {
        setGames(data as Game[]);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this game?");
    if (!confirmDelete) return;

    const supabase = createClient();
    const { error } = await supabase.from('game').delete().eq('id', id);
    if (error) {
      console.error("Error deleting data:", error.message);
    } else {
      setGames(games.filter(game => game.id !== id));
      alert("Game deleted successfully");
    }
  };

  const formatValue = (value: any) => {
    if (value === null || value === undefined) {
      return '';
    } else if (typeof value === 'object') {
      return JSON.stringify(value);
    } else {
      return value.toString();
    }
  };

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return (
    <div className="flex flex-col w-screen min-h-screen">
      <header className="flex items-center justify-between w-full px-6 py-4 text-white bg-gray-900 shadow-md">
        <a className="flex items-center gap-2" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
          </svg>
          <span className="text-lg font-semibold">NgeGameee</span>
        </a>
      </header>
      <main className="flex flex-col items-center flex-1 w-full p-6 bg-gray-100 dark:bg-gray-800">
        <h1 className="mb-4 text-2xl font-semibold">Manage Data</h1>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr>
                {games.length > 0 && Object.keys(games[0]).map((key) => (
                  <th key={key} className="px-4 py-2 border">{key}</th>
                ))}
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={game.id}>
                  {Object.values(game).map((value, index) => (
                    <td key={index} className="px-4 py-2 border">{formatValue(value)}</td>
                  ))}
                  <td className="flex gap-4 px-4 justify-items-center">
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
        <div className="flex justify-end w-full gap-4 mt-6">
          <Link href="/protected">
            <div className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
              Back
            </div>
          </Link>
          <Link href="/protected/manage-data/form">
            <div className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline">
              Add
            </div>
          </Link>
        </div>
      </main>
      <footer className="flex justify-center w-full p-8 text-xs text-center bg-gray-900 border-t border-t-foreground/10">
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
