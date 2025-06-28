'use client'

import { useState } from 'react';
import { Link } from 'lucide-react';
import { ShortenerForm } from "./ui/ShortenerForm";
import { UrlStatusResponse } from "./ui/UrlStatusResponse";
import type { BackResponse } from '@/types/BackResponse';

export default function Home() {
  // Input state.
  const [inputValue, setInputValue] = useState('')

  // Data state.
  const [backResponse, setBackResponse] = useState<BackResponse | null>(null)

  // Event handler.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Check id the input start with "http".
    if (!inputValue.startsWith('http')) {
      alert('Invalid URL')
      return
    }

    // Send request to API.
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: inputValue }),
      })

      // Handle response.
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const json = await response.json()

      // Update data state.
      setBackResponse({
        ...json,
        status: response.status
      })
    } catch (err) {
      console.error('Error:', err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)

  return (
    <main className='h-[100dvh] bg-gray-800 flex flex-col items-center justify-center gap-8'>
      <h1 className='flex justify-center items-center text-white text-4xl font-semibold gap-x-2'>
        <Link />
        <span className='text-amber-500'>Link</span> Shortener
      </h1>
      <ShortenerForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      {
        backResponse && <UrlStatusResponse
          message={backResponse.message}
          data={backResponse.data}
          status={backResponse.status}
        />
      }
    </main>
  );
}
