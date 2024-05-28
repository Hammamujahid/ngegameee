'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from "@/utils/supabase/client";
import Link from 'next/link';

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

type FormData = Omit<Game, 'id'>;

export default function UpdateGamePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    image_logo: '',
    image_thumbnail: '',
    min_req: '',
    size: 0,
    release_year: '',
    download_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const supabase = createClient();
      const { data, error } = await supabase.from('game').select('*').eq('id', id).single();

      if (error) {
        setError(error.message);
        setLoading(false);
      } else {
        setFormData(data as FormData);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'size' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supabase = createClient();
    const { error } = await supabase.from('game').update(formData).eq('id', id);

    if (error) {
      setError(error.message);
    } else {
      router.push('/protected/manage-data');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center min-w-full p-6 bg-gray-900">
      <h1 className="mb-4 text-2xl font-semibold">Update Game</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-wrap mb-6 -mx-3">
          {['title', 'description', 'image_logo', 'image_thumbnail', 'min_req', 'size', 'release_year', 'download_url'].map((field) => (
            <div key={field} className="w-full px-3 mb-6 md:mb-0">
              <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase" htmlFor={field}>
                {field.replace('_', ' ')}
              </label>
              <input
                className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white"
                id={field}
                name={field}
                type={field === 'size' ? 'number' : field === 'release_year' ? 'date' : 'text'}
                value={formData[field as keyof FormData]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between">
        <Link href="/protected/manage-data/">
            <div className="px-4 py-2 mt-2 font-bold text-black bg-white rounded hover:bg-gray-400 focus:outline-none focus:shadow-outline">
              Back
            </div>
          </Link>
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
