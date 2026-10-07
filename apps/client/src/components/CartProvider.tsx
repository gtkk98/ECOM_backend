"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { ProductType } from "@/types";

export type CartItem = {
  productId: ProductType["id"];
  name: string;
  portion: string;
  price: number;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addToCart: (product: ProductType, portion: ProductType["portions"][number]) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(product: ProductType, portion: ProductType["portions"][number]) {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.productId === product.id && item.portion === portion.name,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item === existingItem ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [
        ...currentItems,
        {
          productId: product.id,
          name: product.name,
          portion: portion.name,
          price: portion.price,
          quantity: 1,
        },
      ];
    });
  }

  return (
    <CartContext.Provider value={{ items, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}