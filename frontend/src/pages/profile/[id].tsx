import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfilePage() {
  const { query } = useRouter();
  const [celeb, setCeleb] = useState<any>(null);

  useEffect(() => {
    if (query.id) {
      axios.get(`http://localhost:3000/celebrities/${query.id}`).then(res => setCeleb(res.data));
    }
  }, [query.id]);

  if (!celeb) return <p className="text-center mt-20 text-gray-500">Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={celeb.photourl} alt={celeb.name} className="w-40 h-40 rounded object-cover" />
        <div>
          <h1 className="text-3xl font-bold">{celeb.name}</h1>
          <p className="text-gray-600">{celeb.category} from {celeb.country}</p>
          <p className="text-blue-500 mt-1">Instagram: <a href={celeb.instagram} target="_blank" rel="noreferrer">{celeb.instagram}</a></p>
          <p className="mt-2 text-sm">Fanbase: <strong>{celeb.fanbase.toLocaleString()}</strong></p>

          <a
            href={`http://localhost:3000/celebrities/${celeb.id}/pdf`}
            className="inline-block mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
          >
            📄 Download PDF
          </a>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-semibold">Setlist</h2>
      <ul className="list-disc list-inside">
        {celeb.setlist.map((s: string, i: number) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </div>
  );
}