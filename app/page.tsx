import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ChocolateGrid from "./components/ChocolateGrid";
import CallToActionSection from "./components/CallToActionSection";
import Footer from "./components/Footer";

export const dynamic = 'force-dynamic';

type Chocolate = {
  id: number;
  name: string;
  ingredients: string;
  photo_urls: string[];
  startingPrice?: number | null;
  minWeight?: number | null;
};

type Variant = {
  id: number;
  chocolate_id: number;
  weight: number | null;
  price: number;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const backendAPIURI = API_URL + "/";
const basePhotoUrl = API_URL + "/";

async function getChocolates(): Promise<Chocolate[]> {
  try {
    const res = await fetch(backendAPIURI + "chocolates", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch chocolates");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching chocolates:", error);
    return [];
  }
}

async function getVariants(): Promise<Variant[]> {
  try {
    const res = await fetch(backendAPIURI + "variants", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch variants");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching variants:", error);
    return [];
  }
}

export default async function ChocolatesPage() {
  const [chocolates, variants] = await Promise.all([
    getChocolates(),
    getVariants(),
  ]);

  // Real "from" price + smallest size per chocolate, straight from the variants
  const variantsByChoco = new Map<number, Variant[]>();
  for (const v of variants) {
    const list = variantsByChoco.get(v.chocolate_id) ?? [];
    list.push(v);
    variantsByChoco.set(v.chocolate_id, list);
  }

  const chocolatesWithPrice = chocolates.map((chocolate) => {
    const list = variantsByChoco.get(chocolate.id) ?? [];
    const weights = list
      .map((v) => v.weight)
      .filter((w): w is number => w != null);
    return {
      ...chocolate,
      startingPrice:
        list.length > 0 ? Math.min(...list.map((v) => v.price)) : null,
      minWeight: weights.length > 0 ? Math.min(...weights) : null,
    };
  });
  return (
    <div className="min-h-screen bg-[#fdfaf5]">
      <Header />
      <main className="py-8 px-4 sm:py-12 sm:px-6">
        <HeroSection
          title="Ready-Made Collections"
          description="Our carefully curated chocolate collections, ready to delight"
        />
        {/* Chocolate Grid */}
        <div className="max-w-7xl mx-auto px-2 sm:px-0">
          <ChocolateGrid
            chocolates={chocolatesWithPrice}
            basePhotoUrl={basePhotoUrl}
            showAddToCart={true}
            isClickable={true}
          />
        </div>
        {/* Call to Action Section */}
        {chocolates.length > 0 && <CallToActionSection />}
      </main>
      <Footer />
    </div>
  );
}