import type { Product } from "@repo/product-db";
import { z } from "zod";

export type CartItemType = Product & {
  quantity: number;
  selectedPortion: string;
};

export type CartItemsType = CartItemType[];

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email().min(1, "Email is required"),
  phone: z
    .string()
    .min(7, "Phone number must be between 7 and 10 digits!")
    .max(10, "Phone number must be between 7 and 10 digits!")
    .regex(/^\d+$/, "Phone number must contaon only numbers!"),
  address: z.string().min(1, "Address is required!"),
  city: z.string().min(1, "City is required!"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

type ProductPortion = Product["portions"] extends Array<infer T> ? T : never;

export type CartStoreActionsType = {
  addToCart: (
    product: Product,
    portion: ProductPortion,
    quantity?: number,
  ) => void;
  increaseQuantity: (product: CartItemType) => void;
  decreaseQuantity: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
};
