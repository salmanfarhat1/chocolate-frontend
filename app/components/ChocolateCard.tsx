'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Props = {
  id: number;
  name: string;
  ingredients: string;
  photoUrl: string | null;
  brand?: string;
  price?: number;
  quantity?: string;
  showAddToCart?: boolean;
  isClickable?: boolean;
};

export default function ChocolateCard({
  id,
  name,
  ingredients,
  photoUrl,
  brand = "Classic Collection",
  price = 1,
  quantity = "12 pieces",
  showAddToCart = true,
  isClickable = true,
}: Props) {

  const router = useRouter();

  const goToVariants = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/chocolates/${id}`);
  };

  const card = (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-[1.02] cursor-pointer border border-[#f0e6d6]">

      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#f0e6d6] to-[#e8d5c4] flex items-center justify-center">
            🍫
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">

        <div className="text-sm font-medium text-[#8b7355] uppercase mb-1">
          {brand}
        </div>

        <h2 className="text-xl font-bold text-[#5a2a27] mb-3 line-clamp-1">
          {name}
        </h2>

        <p className="text-[#7a5a53] text-sm mb-4 line-clamp-2">
          {ingredients}
        </p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-[#5a2a27]">
            ${price}
          </span>
          <span className="text-sm text-[#7a5a53]">
            {quantity}
          </span>
        </div>

        {/* ONLY ACTION */}
        {showAddToCart ? (
          <button
          onClick={goToVariants}
          className="w-full py-3 rounded-lg font-medium bg-[#5a2a27] text-white hover:bg-[#6a3a37]"
        >
          Choose Variants
        </button>
        ) : (
          <div className="flex justify-between items-center">
            <span className="text-[#5a2a27] font-semibold text-lg">
              Discover →
            </span>
            <div className="w-2 h-2 bg-[#5a2a27] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

      </div>
    </div>
  );

  return isClickable ? (
    <Link href={`/chocolates/${id}`}>
      {card}
    </Link>
  ) : (
    card
  );
}