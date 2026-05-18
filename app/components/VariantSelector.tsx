'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';

type Variant = {
  id: number;
  chocolate_id: number;
  size: string;
  weight: number | null;
  price: number;
};

type Props = {
  chocolateId: number;
  chocolateName: string;
  photoUrl?: string;
  variants: Variant[];
};

export default function VariantSelector({
  chocolateId,
  chocolateName,
  photoUrl,
  variants
}: Props) {

  const [selectedId, setSelectedId] = useState(
    variants.length ? variants[0].id : null
  );

  const [qty, setQty] = useState(1);

  const { addItem, isInCart } = useCart();

  const selected = variants.find(v => v.id === selectedId);

  const cartKey = `variant-${selectedId}`;

  const handleAdd = () => {
    if (!selected) return;

    addItem({
      id: cartKey,
      name: `${chocolateName} — ${selected.size}`,
      price: selected.price,
      image: photoUrl,
      type: 'ready-made',
      quantity: qty,
    });
  };

  if (!selected) {
    return (
      <div className="bg-[#f9f3eb] rounded-xl p-6 text-center text-[#8b7355]">
        No variants available yet.
      </div>
    );
  }

  return (
    <div>

      {/* Variants */}
      <div className="flex flex-col gap-3 mb-8">
        {variants.map(v => (
          <button
            key={v.id}
            onClick={() => setSelectedId(v.id)}
            className={`flex justify-between p-4 rounded-xl border-2 transition ${
              selectedId === v.id
                ? 'border-[#5a2a27] bg-[#fdf6ee]'
                : 'border-[#f0e6d6] bg-white'
            }`}
          >
            <div>
              <div className="font-semibold text-[#5a2a27]">
                {v.size}
              </div>
              {v.weight && (
                <div className="text-sm text-[#8b7355]">
                  {Number(v.weight).toFixed(0)} g
                </div>
              )}
            </div>

            <div className="font-light text-[#5a2a27]">
              €{Number(v.price).toFixed(2)}
            </div>
          </button>
        ))}
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-[#8b7355] uppercase">
          Quantity
        </span>

        <button
          onClick={() => setQty(q => Math.max(1, q - 1))}
          className="w-8 h-8 rounded-full border border-[#5a2a27]"
        >
          −
        </button>

        <span className="w-8 text-center font-semibold text-[#5a2a27]">
          {qty}
        </span>

        <button
          onClick={() => setQty(q => q + 1)}
          className="w-8 h-8 rounded-full border border-[#5a2a27]"
        >
          +
        </button>
      </div>

      {/* Add to cart */}
      <button
        onClick={handleAdd}
        className={`w-full py-4 rounded-xl font-medium ${
          isInCart(cartKey)
            ? 'bg-green-600 text-white'
            : 'bg-[#5a2a27] text-white hover:bg-[#6a3a37]'
        }`}
      >
        {isInCart(cartKey)
          ? 'Added to Cart ✓'
          : `Add to Cart — €${(selected.price * qty).toFixed(2)}`
        }
      </button>

    </div>
  );
}