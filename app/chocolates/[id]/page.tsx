import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import VariantSelector from "@/app/components/VariantSelector";

export const dynamic = 'force-dynamic';

const API = process.env.NEXT_PUBLIC_API_URL || "";

type Chocolate = {
  id: number;
  name: string;
  ingredients: string;
  photo_urls: string[];
};

type Variant = {
  id: number;
  chocolate_id: number;
  size: string;
  weight: number | null;
  price: number;
};

async function getChocolate(id: string): Promise<Chocolate | null> {
  try {
    const res = await fetch(`${API}/chocolates`, { cache: "no-store" });
    const all: Chocolate[] = await res.json();
    return all.find((c) => String(c.id) === id) ?? null;
  } catch {
    return null;
  }
}

async function getVariants(id: string): Promise<Variant[]> {
  try {
    const res = await fetch(`${API}/chocolates/${id}/variants`, { cache: "no-store" });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ChocolateDetailPage({ params }: Props) {
  const { id } = await params;
  const [chocolate, variants] = await Promise.all([
    getChocolate(id),
    getVariants(id),
  ]);

  if (!chocolate) {
    return (
      <div className="min-h-screen bg-[#fdfaf5]">
        <Header />
        <div className="flex flex-col items-center justify-center py-32">
          <div className="text-6xl mb-4">🍫</div>
          <h1 className="text-2xl font-semibold text-[#5a2a27] mb-2">Product not found</h1>
          <a href="/" className="text-[#8b7355] underline mt-4">← Back to collection</a>
        </div>
        <Footer />
      </div>
    );
  }

  const photos = chocolate.photo_urls || [];

  return (
    <div className="min-h-screen bg-[#fdfaf5]">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Images */}
          <div>
            <div className="rounded-2xl overflow-hidden bg-[#f0e6d6] aspect-square">
              {photos[0] ? (
                <img src={`${API}${photos[0]}`} alt={chocolate.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-7xl">🍫</div>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <h1 className="text-4xl font-light text-[#5a2a27] mb-6">{chocolate.name}</h1>
            {chocolate.ingredients && (
              <p className="text-[#7a5a53] leading-relaxed mb-8">{chocolate.ingredients}</p>
            )}
            <div className="border-t border-[#f0e6d6] pt-8">
              <VariantSelector
                chocolateId={chocolate.id}
                chocolateName={chocolate.name}
                photoUrl={photos[0] ? `${API}${photos[0]}` : undefined}
                variants={variants}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}