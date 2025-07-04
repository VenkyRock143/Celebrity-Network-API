import { useState } from 'react';
import axios from 'axios';

export default function SignupPage() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [form, setForm] = useState({
    name: '',
    photourl: '',
    category: '',
    country: '',
    instagram: '',
    fanbase: 1000,
    setlist: [''],
  });

  const getSuggestions = async () => {
    const res = await axios.post('http://localhost:3000/celebrities/suggest', { prompt: input });
    setSuggestions(res.data);
  };

  const autofill = (data: any) => {
    setForm({
      ...form,
      ...data,
      setlist: ['Hit Song 1', 'Hit Song 2'],
      instagram: `https://instagram.com/${data.name.toLowerCase().replace(/ /g, '')}`,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await axios.post('http://localhost:3000/celebrities', form, {
      headers: { Authorization: `Bearer YOUR_TOKEN` },
    });
    alert('Celebrity created!');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Celebrity Signup</h1>

      <div className="mb-6">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Describe yourself (e.g., Indian singer with Grammy)..."
          className="w-full border px-4 py-2 rounded"
        />
        <button
          onClick={getSuggestions}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Suggest
        </button>

        {suggestions.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold">Suggestions:</h3>
            {suggestions.map((s, i) => (
              <div key={i} onClick={() => autofill(s)} className="cursor-pointer p-2 bg-gray-100 rounded my-1">
                {s.name} - {s.category}
              </div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full border px-4 py-2 rounded" />
        <input type="text" value={form.photourl} onChange={e => setForm({ ...form, photourl: e.target.value })} placeholder="Photo URL" className="w-full border px-4 py-2 rounded" />
        <input type="text" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Category" className="w-full border px-4 py-2 rounded" />
        <input type="text" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} placeholder="Country" className="w-full border px-4 py-2 rounded" />
        <input type="text" value={form.instagram} onChange={e => setForm({ ...form, instagram: e.target.value })} placeholder="Instagram URL" className="w-full border px-4 py-2 rounded" />
        <input type="number" value={form.fanbase} onChange={e => setForm({ ...form, fanbase: Number(e.target.value) })} placeholder="Fanbase" className="w-full border px-4 py-2 rounded" />

        <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded">
          Create Profile
        </button>
      </form>
    </div>
  );
}