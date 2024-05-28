'use client';

import Link from 'next/link';
import { useState } from 'react';

type FormData = {
  title: string;
  description: string;
  image_logo: string;
  image_thumbnail: string;
  min_req: string;
  size: string;
  release_year: string;
  download_url: string;
};

export default function CreateGamePage() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    image_logo: '',
    image_thumbnail: '',
    min_req: '',
    size: '',
    release_year: '',
    download_url: ''
  });
  const [notification, setNotification] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      setFormData({
        title: '',
        description: '',
        image_logo: '',
        image_thumbnail: '',
        min_req: '',
        size: '',
        release_year: '',
        download_url: ''
      });
      setNotification("Game created successfully!");
    } else {
      const error = await response.json();
      console.error("Error creating data:", error);
      setNotification("Failed to create game.");
    }
    // Clear notification after 3 seconds
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="flex flex-col items-center min-w-full p-6 bg-gray-900">
      <h1 className="mb-4 text-2xl font-semibold">Add Game</h1>
      {notification && (
        <div className="w-full max-w-lg p-4 mb-4 text-center text-white bg-green-500 rounded">
          <span className="inline-block mr-2 align-middle">
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6 align-middle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <span className="inline-block align-middle">{notification}</span>
        </div>
      )}
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
