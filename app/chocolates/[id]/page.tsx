import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

type Chocolate = {
  id: number;
  name: string;
  ingredients: string;
  photo_urls: string[];
};

// IMPORTANT: use env variable in production
const API = process.env.NEXT_PUBLIC_API_URL;

async function getChocolate(id: string): Promise<Chocolate | null> {
  try {
    const res = await fetch(`${API}/chocolates/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch chocolate");

    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const chocolate = await getChocolate(id);

  if (!chocolate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chocolate not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfaf5]">
      <Header />

      <main className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-4">{chocolate.name}</h1>

        <p className="mb-6 text-gray-700">
          {chocolate.ingredients || "No ingredients listed"}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {chocolate.photo_urls?.map((url, i) => (
            <img
              key={i}
              src={`${API}${url}`}
              alt={chocolate.name}
              className="rounded-lg object-cover w-full h-64"
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}