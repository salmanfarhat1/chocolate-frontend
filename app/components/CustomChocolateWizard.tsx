'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';

import '../../css/CustomChocolateCreator.css';

type ChocolateBase = {
  id: string;
  name: string;
  description: string;
  price: number;
  swatchClass: string;
  detailDesc: string;
};

type Ingredient = {
  id: string;
  name: string;
  emoji: string;
  price: number;
};

const chocolateBases: ChocolateBase[] = [
  {
    id: 'dark',
    name: 'Dark Chocolate',
    description: '70% Cocoa',
    detailDesc: 'Intense & bittersweet',
    price: 6,
    swatchClass: 'swatch-dark',
  },
  
  {
    id: 'milk',
    name: 'Milk Chocolate',
    description: '33% Cocoa',
    detailDesc: 'Smooth & creamy',
    price: 5,
    swatchClass: 'swatch-milk',
  },

  {
    id: 'white',
    name: 'White Chocolate',
    description: 'Cocoa Butter',
    detailDesc: 'Buttery & sweet',
    price: 6,
    swatchClass: 'swatch-white',
  },

  {
    id: 'ruby',
    name: 'Ruby Chocolate',
    description: 'Naturally pink chocolate ',
    detailDesc: 'made from ruby cocoa beans',
    price: 6,
    swatchClass: 'swatch-pink',
  }
];

const ingredients: Ingredient[] = [
  { id: 'banana',        name: 'Banana',             emoji: '🍌✨', price: 2 },
  { id: 'strawberry',    name: 'Strawberry',         emoji: '🍓❤️', price: 3 },
  { id: 'hazelnut',      name: 'Hazelnut',           emoji: '🌰🤎', price: 4 },
  { id: 'pistachio',     name: 'Pistachio',          emoji: '🟢🥜', price: 4 },
  { id: 'almond',        name: 'Almond',              emoji: '🥜🌿', price: 4 },
  { id: 'ganacheChoc',     name: 'Chocolate Ganache',  emoji: '🍫🫗', price: 4 },
  { id: 'ganacheMango',    name: 'Mango Ganache',      emoji: '🥭🫗', price: 4 },
  { id: 'ganachePistachio',name: 'Pistachio Ganache',  emoji: '🟢🫗', price: 4 },
  { id: 'ganacheBanana',   name: 'Banana Ganache',     emoji: '🍌🫗', price: 4 },
  { id: 'ganacheCoffee',   name: 'Coffee Ganache',     emoji: '☕🫗', price: 4 },
];

const barBgMap: Record<string, string> = {
  dark:  '#3d1a0a',
  milk:  '#8b4a2a',
  white: '#f5e0b0',
  ruby: '#b57b88',
};

export default function CustomChocolateCreator() {
  const [selectedBase, setSelectedBase] = useState<ChocolateBase | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);

  const handleIngredientToggle = (ingredient: Ingredient) => {
    setSelectedIngredients(prev => {
      const isSelected = prev.some(ing => ing.id === ingredient.id);
      if (isSelected) return prev.filter(ing => ing.id !== ingredient.id);
      if (prev.length >= 3) return prev;
      return [...prev, ingredient];
    });
  };

  const totalPrice =
    (selectedBase?.price || 0) +
    selectedIngredients.reduce((sum, ing) => sum + ing.price, 0);

  return (
    <>
      <style>{`
   
      `}</style>

      <div className="cc-wrap">
        <div className="cc-header">
          <h1>Build Your Bar</h1>
          <p>Artisan chocolate, your way</p>
        </div>

        <div className="cc-grid">
          {/* ── LEFT COLUMN ── */}
          <div>
            <div className="section-label">1 — Choose your base</div>
            <div className="bases">
              {chocolateBases.map(base => (
                <button
                  key={base.id}
                  className={`base-card${selectedBase?.id === base.id ? ' selected' : ''}`}
                  onClick={() => setSelectedBase(base)}
                >
                  <div className={`choc-swatch ${base.swatchClass}`}>
                    <div className="swatch-shimmer" />
                  </div>
                  <div className="base-info">
                    <div className="base-name">{base.name}</div>
                    <div className="base-desc">
                      {base.description} · {base.detailDesc}
                    </div>
                  </div>
                  <div className="base-price">${base.price}</div>
                  <div className="base-check">
                    <div className="base-check-dot" />
                  </div>
                </button>
              ))}
            </div>

            <div className="section-label">
              2 — Select ingredients&nbsp;
              <span style={{ fontWeight: 300, textTransform: 'none', letterSpacing: 0 }}>
                (up to 3)
              </span>
            </div>
            <div className="ing-counter">
              Selected: <span>{selectedIngredients.length}</span> / 3
            </div>

            <div className="ingredients-grid">
              {ingredients.map(ingredient => {
                const isSelected = selectedIngredients.some(i => i.id === ingredient.id);
                const isDisabled = !isSelected && selectedIngredients.length >= 3;
                return (
                  <button
                    key={ingredient.id}
                    className={`ing-btn${isSelected ? ' ing-selected' : ''}`}
                    onClick={() => handleIngredientToggle(ingredient)}
                    disabled={isDisabled}
                  >
                    <div className="ing-tick">
                      <div className="ing-tick-inner" />
                    </div>
                    <div className="ing-icon">{ingredient.emoji}</div>
                    <div className="ing-name">{ingredient.name}</div>
                    <div className="ing-price">+${ingredient.price}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="right-panel">
            {/* Bar preview */}
            <div className="bar-preview">
              <div className="bar-visual-wrap">
                <div
                  className={`bar-visual${!selectedBase ? ' bar-empty' : ''}`}
                  style={selectedBase ? { backgroundColor: barBgMap[selectedBase.id] } : {}}
                >
                  {/* Topping bubbles */}
                  {selectedIngredients.length > 0 && (
                    <div className="bar-toppings">
                      {selectedIngredients.map(ing => (
                        <div key={ing.id} className="topping-bubble">
                          {ing.emoji}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Segment grid */}
                  {selectedBase && (
                    <div className="bar-segs">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className={`bar-seg${selectedBase.id === 'white' ? ' bar-seg-white' : ''}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="bar-label">
                {selectedBase ? `${selectedBase.name} Bar` : 'Your Bar'}
              </div>
              <div className="bar-sublabel">
                {selectedBase
                  ? `${selectedBase.description} · ${selectedBase.detailDesc}`
                  : 'Select a base to begin'}
              </div>
            </div>

            {/* Summary */}
            <div className="summary-card">
              <div className="section-label" style={{ marginBottom: 10 }}>
                Order summary
              </div>

              {!selectedBase && selectedIngredients.length === 0 ? (
                <div className="empty-hint">Nothing selected yet</div>
              ) : (
                <div>
                  {selectedBase && (
                    <div className="summary-row">
                      <span className="summary-row-label">Base — {selectedBase.name}</span>
                      <span className="summary-row-price">${selectedBase.price}</span>
                    </div>
                  )}
                  {selectedIngredients.map(ing => (
                    <div key={ing.id} className="summary-row">
                      <span className="summary-row-label">
                        {ing.emoji} {ing.name}
                      </span>
                      <span className="summary-row-price">+${ing.price}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="summary-total">
                <span className="summary-total-label">Total</span>
                <span className="summary-total-price">${totalPrice}</span>
              </div>
            </div>

            <button className="add-btn" disabled={!selectedBase}>
              {selectedBase ? `Add to Cart — $${totalPrice}` : 'Select a chocolate base first'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}