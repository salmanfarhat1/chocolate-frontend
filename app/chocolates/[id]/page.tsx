import Header from "../../components/Header";
import Footer from "../../components/Footer";
import VariantSelector from "../../components/VariantSelector";

const API = "http://localhost:3000";

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
    return all.find(c => String(c.id) === id) ?? null;
  } catch { return null; }
}

async function getVariants(id: string): Promise<Variant[]> {
  try {
    const res = await fetch(`${API}/chocolates/${id}/variants`, { cache: "no-store" });
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch { return []; }
}

export default async function ChocolateDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [chocolate, variants] = await Promise.all([
    getChocolate(params.id),
    getVariants(params.id),
  ]);

  if (!chocolate) {
    return (
      <div className="min-h-screen bg-[#fdfaf5]">
        <Header />
        <div className="flex flex-col items-center justify-center py-32">
          <div className="text-6xl mb-4">🍫</div>
          <h1 className="text-2xl font-semibold text-[#5a2a27] mb-2">Product not found</h1>
          <a href="/chocolates" className="text-[#8b7355] underline mt-4">← Back to collection</a>
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

        {/* Breadcrumb */}
        <div className="text-sm text-[#8b7355] mb-8">
          <a href="/" className="hover:text-[#5a2a27]">Home</a>
          <span className="mx-2">›</span>
          <a href="/chocolates" className="hover:text-[#5a2a27]">Collection</a>
          <span className="mx-2">›</span>
          <span className="text-[#5a2a27]">{chocolate.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Photo gallery */}
          <div>
            <div className="rounded-2xl overflow-hidden bg-[#f0e6d6] aspect-square">
              {photos[0] ? (
                <img
                  src={`${API}${photos[0]}`}
                  alt={chocolate.name}
                  className="w-full h-full object-cover"
                  id="main-photo"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-7xl">🍫</div>
              )}
            </div>

            {/* Thumbnails */}
            {photos.length > 1 && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {photos.map((p, i) => (
                  <img
                    key={i}
                    src={`${API}${p}`}
                    alt={`photo ${i + 1}`}
                    className="w-20 h-20 object-cover rounded-lg border-2 border-transparent hover:border-[#5a2a27] cursor-pointer transition-all"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info + variants */}
          <div>
            <div className="text-sm font-medium text-[#8b7355] uppercase tracking-widest mb-2">
              Artisanal · Handcrafted
            </div>
            <h1 className="text-4xl font-light text-[#5a2a27] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
              {chocolate.name}
            </h1>

            {chocolate.ingredients && (
              <div className="mb-8">
                <div className="text-xs uppercase tracking-widest text-[#8b7355] mb-2">Ingredients</div>
                <p className="text-[#7a5a53] leading-relaxed">{chocolate.ingredients}</p>
              </div>
            )}

            <div className="border-t border-[#f0e6d6] pt-8">
              <div className="text-xs uppercase tracking-widest text-[#8b7355] mb-4">
                {variants.length ? 'Choose your size' : 'Availability'}
              </div>

              {/* Client component handles selection + add to cart */}
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