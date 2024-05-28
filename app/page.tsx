import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";

export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex flex-col items-center flex-1 w-full gap-20">

      <div className="flex flex-col w-screen min-h-screen">
  <header className="flex items-center justify-between px-6 py-4 text-white bg-gray-900 shadow-md">
  <div className="flex items-center gap-4">
    <a className="flex items-center gap-2" href="#">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="w-6 h-6"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
      </svg>
      <span className="text-lg font-semibold">NgeGameee</span>
    </a>
  </div>
  <div className="flex items-center gap-4">
    <div className="flex items-center justify-between w-full max-w-4xl p-3 text-sm">
           <AuthButton />
        </div>
  </div>
</header>
  <main className="grid flex-1 grid-cols-1 gap-6 p-6 bg-gray-100 dark:bg-gray-800">
    <div className="w-3/4 border rounded-lg shadow-sm bg-card text-card-foreground" data-v0-t="card">
      <div className="flex-col space-y-1.5 p-6 flex items-center justify-between">
        <h3 className="text-2xl font-semibold leading-none tracking-tight whitespace-nowrap">Customer Satisfaction</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
        >
          <path d="M7 10v12"></path>
          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
        </svg>
      </div>
      <div className="p-6">
        <p className="text-4xl font-bold">4.8/5</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Up 0.2 from last month</p>
      </div>
    </div>
    <div className="w-3/4 border rounded-lg shadow-sm bg-card text-card-foreground" data-v0-t="card">
      <div className="flex-col space-y-1.5 p-6 flex items-center justify-between">
        <h3 className="text-2xl font-semibold leading-none tracking-tight whitespace-nowrap">Customer Satisfaction</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
        >
          <path d="M7 10v12"></path>
          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
        </svg>
      </div>
      <div className="p-6">
        <p className="text-4xl font-bold">4.8/5</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Up 0.2 from last month</p>
      </div>
    </div>
    <div className="w-3/4 border rounded-lg shadow-sm bg-card text-card-foreground" data-v0-t="card">
      <div className="flex-col space-y-1.5 p-6 flex items-center justify-between">
        <h3 className="text-2xl font-semibold leading-none tracking-tight whitespace-nowrap">Customer Satisfaction</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="w-6 h-6 text-gray-500 dark:text-gray-400"
        >
          <path d="M7 10v12"></path>
          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
        </svg>
      </div>
      <div className="p-6">
        <p className="text-4xl font-bold">4.8/5</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Up 0.2 from last month</p>
      </div>
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
    </div>
  );
}
