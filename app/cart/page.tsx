'use client';

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cart, updateQuantity, removeItem, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#fdfaf5]">
        <Header />
        <main className="py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold text-[#5a2a27] mb-4">Your Cart is Empty</h1>
            <p className="text-[#7a5a53] mb-8">Add some delicious chocolates to your cart!</p>
            <a
              href="/"
              className="inline-block bg-[#5a2a27] text-white px-8 py-3 rounded-lg hover:bg-[#6a3a37] transition-colors"
            >
              Browse Collections
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfaf5]">
      <Header />
      <main className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#5a2a27] mb-8">Your Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-lg border border-[#e8d5c4]">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl mr-4 flex-shrink-0"
                      />
                    )}
                      <h3 className="font-bold text-lg text-[#5a2a27] mb-2">{item.name}</h3>
                      {item.customDetails && (
                        <div className="text-sm text-[#7a5a53] mb-2">
                          <div>Base: {item.customDetails.base}</div>
                          {item.customDetails.ingredients.length > 0 && (
                            <div>Ingredients: {item.customDetails.ingredients.join(', ')}</div>
                          )}
                        </div>
                      )}
                      <div className="text-lg font-semibold text-[#5a2a27]">${item.price}</div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full border border-[#5a2a27] text-[#5a2a27] flex items-center justify-center hover:bg-[#fdfaf5]"
                      >
                        -
                      </button>
                      <span className="font-medium text-[#5a2a27] w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full border border-[#5a2a27] text-[#5a2a27] flex items-center justify-center hover:bg-[#fdfaf5]"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 ml-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#e8d5c4] h-fit">
              <h2 className="text-xl font-bold text-[#5a2a27] mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-[#7a5a53]">Items ({cart.itemCount})</span>
                  <span className="text-[#5a2a27]">${cart.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7a5a53]">Shipping</span>
                  <span className="text-[#5a2a27]">$5.00</span>
                </div>
                <div className="border-t border-[#e8d5c4] pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span className="text-[#5a2a27]">Total</span>
                    <span className="text-[#5a2a27]">${(cart.total + 5).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-[#5a2a27] text-white py-3 rounded-lg hover:bg-[#6a3a37] transition-colors font-semibold mb-4">
                Proceed to Checkout
              </button>
              
              <button
                onClick={clearCart}
                className="w-full border border-[#5a2a27] text-[#5a2a27] py-2 rounded-lg hover:bg-[#fdfaf5] transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}