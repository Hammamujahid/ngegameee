"use client";

import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";

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

type PageParams = {
  params: {
    id: string;
  };
};

export default async function GameDetailPage({ params }: PageParams) {
  const supabase = createClient();

  const { data: game, error } = await supabase
    .from('game')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !game) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center w-full h-screen">
        <header className="fixed flex items-center justify-between w-full px-6 py-4 text-white shadow-md bg-gray-950">
          <div className="flex items-center gap-4">
            <a className="flex items-center gap-2" href="/">
              <span className="text-lg font-semibold">NgeGameee</span>
            </a>
          </div>
          <div className="text-xl text-white">{game.title}</div>
          <AuthButton />
        </header>
        <main className="flex flex-col items-center flex-1 w-full px-4 bg-gray-800">
          <div className="w-full h-full max-w-4xl mt-24">
          <div className="flex items-start">
          <img src={game.image_logo} alt="Logo" className="object-cover w-56 h-56 rounded-xl" />
                <div className="flex-col pl-8">
                  <p>Release Year: {game.release_year}</p>
                  <p>Size: {game.size} MB</p>
                  <p className="mt-4">{game.description}</p>
                  <div className="flex justify-center py-10">
                  <button 
                  onClick={() => window.location.href = game.download_url}
                  className="flex justify-center w-1/4 p-4 bg-gray-900 hover:bg-gray-950 rounded-xl">
                  Download
                </button>
                  </div>
                </div>
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