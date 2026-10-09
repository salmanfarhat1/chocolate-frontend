'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Cart, CartItem } from '../types/cart';

type CartContextType = {
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    itemCount: 0,
  });

  // True only after the saved cart has been read from localStorage
  const [hydrated, setHydrated] = useState(false);

  // Load cart from localStorage on mount (guard against corrupted data)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('chocolate-cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (parsed && Array.isArray(parsed.items)) {
          setCart(parsed);
        }
      }
    } catch {
      // Broken JSON in localStorage → drop it and start fresh
      localStorage.removeItem('chocolate-cart');
    }
    setHydrated(true);
  }, []);

  // Save cart to localStorage whenever it changes,
  // but never before hydration so the empty initial state can't wipe a saved cart
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('chocolate-cart', JSON.stringify(cart));
  }, [cart, hydrated]);

  const addItem = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(cartItem => cartItem.id === item.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        // Update quantity if item exists
        newItems = prevCart.items.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // Add new item
        newItems = [...prevCart.items, { ...item }];
      }

      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        items: newItems,
        total,
        itemCount,
      };
    });
  };

  const removeItem = (id: string) => {
    setCart(prevCart => {
      const newItems = prevCart.items.filter(item => item.id !== id);
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        items: newItems,
        total,
        itemCount,
      };
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setCart(prevCart => {
      const newItems = prevCart.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        items: newItems,
        total,
        itemCount,
      };
    });
  };

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      itemCount: 0,
    });
  };

  const isInCart = (id: string) => {
    return cart.items.some(item => item.id === id);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isInCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}