import { z } from "zod";
export type ProductType = {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  portions: { name: string; price: number }[];
  taste: string | string[];
  images: {
    thumbnail: string;
    primary: string;
    gallery: string[];
  };
};

export type ProductsType = ProductType[];

export type CartItemType = ProductType & {
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
    address:z.string().min(1,"Address is required!"),
    city:z.string().min(1,"City is required!"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

export type CartStoreStateType = {
    cart: CartItemsType;
};

export type CartStoreActionsType = {
  addToCart: (
    product: ProductType,
    portion: ProductType["portions"][number],
    quantity?: number,
  ) => void;
  increaseQuantity: (product: CartItemType) => void;
  decreaseQuantity: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
    clearCart: () => void;
}
