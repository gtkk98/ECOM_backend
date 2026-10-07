import type { CartItemType, CartStoreActionsType, CartStoreStateType } from '@/types';
import { create } from 'zustand';
import {persist, createJSONStorage} from "zustand/middleware"

const useCartStore = create<CartStoreStateType & CartStoreActionsType>()(
    persist(
    (set) => ({
  cart: [],
  addToCart: (product, portion, quantity = 1) =>
    set((state) => {
      const amountToAdd = Math.max(1, Math.floor(quantity));
      const existingItem = state.cart.find(
        (item) =>
          item.id === product.id &&
          (item.selectedPortion ?? item.portions[0]?.name) === portion.name,
      );

      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item === existingItem
              ? { ...item, quantity: (item.quantity ?? 1) + amountToAdd }
              : item,
          ),
        };
      }

      return {
        cart: [
          ...state.cart,
          { ...product, quantity: amountToAdd, selectedPortion: portion.name },
        ],
      };
    }),
  increaseQuantity: (product) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === product.id && item.selectedPortion === product.selectedPortion
          ? { ...item, quantity: (item.quantity ?? 1) + 1 }
          : item,
      ),
    })),
  decreaseQuantity: (product) =>
    set((state) => ({
      cart: state.cart.flatMap((item) => {
        if (item.id !== product.id || item.selectedPortion !== product.selectedPortion) {
          return [item];
        }

        const quantity = (item.quantity ?? 1) - 1;
        return quantity > 0 ? [{ ...item, quantity }] : [];
      }),
    })),
  removeFromCart: (product) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => item.id !== product.id || item.selectedPortion !== product.selectedPortion,
      ),
    })),
  clearCart: () => set({ cart: [] as CartItemType[] }),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    },
  )
);

export default useCartStore;