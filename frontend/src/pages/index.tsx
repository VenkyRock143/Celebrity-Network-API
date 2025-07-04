
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Celebrity {
  id: number;
  name: string;
  photourl: string;
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
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🌟 Celebrity List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {celebrities.map(celeb => (
          <Link href={`/profile/${celeb.id}`} key={celeb.id}>
            <div className="border rounded-lg shadow hover:shadow-md transition p-4 text-center cursor-pointer">
              <img src={celeb.photourl} alt={celeb.name} className="w-full h-40 object-cover rounded" />
              <h2 className="text-xl font-semibold mt-2">{celeb.name}</h2>
              <p className="text-sm text-gray-600">{celeb.category} · {celeb.country}</p>
              <p className="text-sm text-blue-600">Fanbase: {celeb.fanbase.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
