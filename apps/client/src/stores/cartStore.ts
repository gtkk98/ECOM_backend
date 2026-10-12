import type { CartItemType } from "@repo/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type CartProductType = CartItemType & {
  portions: Array<{ name: string }>;
};

type CartPortionType = { name: string };

const getItemPortionName = (item: CartItemType): string | undefined => {
  const itemPortion = Array.isArray(item.portions)
    ? item.portions[0]
    : undefined;

  if (
    itemPortion &&
    typeof itemPortion === "object" &&
    "name" in itemPortion &&
    typeof itemPortion.name === "string"
  ) {
    return itemPortion.name;
  }

  return undefined;
};

type CartStoreType = {
  cart: CartItemType[];
  addToCart: (
    product: CartProductType,
    portion: CartPortionType,
    quantity?: number,
  ) => void;
  increaseQuantity: (product: CartItemType) => void;
  decreaseQuantity: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
};

const useCartStore = create<CartStoreType>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product, portion, quantity = 1) =>
        set((state) => {
          const amountToAdd = Math.max(1, Math.floor(quantity));
          const existingItem = state.cart.find((item) => {
            const itemPortionName = getItemPortionName(item);

            return (
              item.id === product.id &&
              (item.selectedPortion ?? itemPortionName) === portion.name
            );
          });

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
              {
                ...product,
                quantity: amountToAdd,
                selectedPortion: portion.name,
              },
            ],
          };
        }),
      increaseQuantity: (product) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === product.id &&
            item.selectedPortion === product.selectedPortion
              ? { ...item, quantity: (item.quantity ?? 1) + 1 }
              : item,
          ),
        })),
      decreaseQuantity: (product) =>
        set((state) => ({
          cart: state.cart.flatMap((item) => {
            if (
              item.id !== product.id ||
              item.selectedPortion !== product.selectedPortion
            ) {
              return [item];
            }

            const quantity = (item.quantity ?? 1) - 1;
            return quantity > 0 ? [{ ...item, quantity }] : [];
          }),
        })),
      removeFromCart: (product) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) =>
              item.id !== product.id ||
              item.selectedPortion !== product.selectedPortion,
          ),
        })),
      clearCart: () => set({ cart: [] as CartItemType[] }),
    }),
    {
      name: "cart",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCartStore;
