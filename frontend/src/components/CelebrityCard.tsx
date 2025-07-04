interface Props {
  name: string;
  photoUrl: string;
  category: string;
  fanbase: number;
  country: string;
}

export default function CelebrityCard({ name, photoUrl, category, fanbase, country }: Props) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex gap-4 items-center hover:shadow-lg transition">
      <img src={photoUrl} alt={name} className="w-20 h-20 rounded-full object-cover" />
      <div>
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-sm text-gray-600">{category} · {country}</p>
        <p className="text-sm text-blue-600">Fanbase: {fanbase.toLocaleString()}</p>
      </div>
    </div>
  );
}
