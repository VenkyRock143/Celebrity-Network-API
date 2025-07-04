'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Celebrity {
  id: number;
  name: string;
  photoUrl: string;
  category: string;
  fanbase: number;
  country: string;
}

export default function HomePage() {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/celebrities')
      .then(res => setCelebrities(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🌟 Celebrity List</h1>
      <div className="grid gap-4">
        {celebrities.map((celeb) => (
          <div key={celeb.id} className="p-4 shadow rounded bg-white flex gap-4">
            <img src={celeb.photoUrl} className="w-20 h-20 rounded object-cover" alt={celeb.name} />
            <div>
              <h2 className="text-xl font-bold">{celeb.name}</h2>
              <p className="text-sm text-gray-600">{celeb.category} · {celeb.country}</p>
              <p className="text-sm text-blue-600">Fanbase: {celeb.fanbase.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
