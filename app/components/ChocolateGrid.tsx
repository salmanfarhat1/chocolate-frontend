import ChocolateCard from "./ChocolateCard";

type Chocolate = {
  id: number;
  name: string;
  ingredients: string;
  photo_urls: string[];
};

type ChocolateGridProps = {
  chocolates: Chocolate[];
  basePhotoUrl: string;
  showAddToCart?: boolean;
  isClickable?: boolean;
};

export default function ChocolateGrid({
  chocolates,
  basePhotoUrl,
  showAddToCart = true,
  isClickable = false,
}: ChocolateGridProps) {
  if (chocolates.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🍫</div>
        <h2 className="text-2xl font-semibold text-[#5a2a27] mb-2">
          Out of Stock
        </h2>
        <p className="text-[#7a5a53]">
          We're busy crafting new chocolate creations. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {chocolates.map((chocolate) => {
        const firstPhotoUrl =
          chocolate.photo_urls && chocolate.photo_urls.length > 0
            ? basePhotoUrl + chocolate.photo_urls[0].replace(/^\/+/, "")
            : null;

        return (
          <ChocolateCard
            key={chocolate.id}
            id={chocolate.id}
            name={chocolate.name}
            ingredients={chocolate.ingredients}
            photoUrl={firstPhotoUrl}
            showAddToCart={showAddToCart}
            isClickable={isClickable}
          />
        );
      })}
    </div>
  );
}