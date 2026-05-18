import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ChocolateGrid from "./components/ChocolateGrid";
import CallToActionSection from "./components/CallToActionSection";
import Footer from "./components/Footer";

type Chocolate = {
  id: number;
  name: string;
  ingredients: string;
  photo_urls: string[];
};
const backendAPIURI = "http://localhost:3000/"; 
const basePhotoUrl  = "http://localhost:3000/" 

async function getChocolates(): Promise<Chocolate[]> {
  try {
    const res = await fetch (backendAPIURI + "chocolates", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch chocolates");
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching chocolates:", error);
    return [];
  }
}

export default async function ChocolatesPage() {
  const chocolates = await getChocolates() ?? [];

  return (
    <div className="min-h-screen bg-[#fdfaf5]">
      <Header />

      <main className="py-12 px-6">
        <HeroSection
          title="Ready-Made Collections"
          description="Our carefully curated chocolate collections, ready to delight"
        />

        {/* Chocolate Grid */}
        <div className="max-w-7xl mx-auto">
          <ChocolateGrid
            chocolates={chocolates}
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