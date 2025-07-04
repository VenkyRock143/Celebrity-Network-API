import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FanDashboard() {
  const [follows, setFollows] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/fan/dashboard', {
      headers: {
        Authorization: `Bearer YOUR_FAN_JWT_TOKEN`
      }
    }).then(res => setFollows(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">🎉 Your Followed Celebrities</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {follows.map(f => (
          <div key={f.id} className="border p-4 rounded shadow bg-white">
            <h2 className="text-lg font-semibold">{f.celebrity.name}</h2>
            <p>{f.celebrity.category} - {f.celebrity.country}</p>
            <img src={f.celebrity.photourl} alt="celeb" className="w-full h-48 object-cover mt-2 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
