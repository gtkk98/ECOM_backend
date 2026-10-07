"use client";

import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import useCartStore from "@/stores/cartStore";
import { type ShippingFormInputs } from "@/types";
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const steps = [
  {
    id: 1,
    title: "Shopping Cart",
  },
  {
    id: 2,
    title: "Shipping Address",
  },
  {
    id: 3,
    title: "Payment Method",
  },
];

// const cartItems: CartItemsType = [
//   {
//     id: 1,
//     name: "Artisan Pepperoni Pizza",
//     shortDescription:
//       "Wood-fired sourdough crust topped with spicy pepperoni and fresh mozzarella.",
//     description:
//       "Crafted with hand-tossed sourdough crust and baked in a 800°F wood-fired oven. Layered with authentic San Marzano tomato sauce, whole milk mozzarella, premium sliced pepperoni, and drizzled with chili-infused hot honey.",
//     portions: [
//       { name: "small", price: 18.99 },
//       { name: "medium", price: 22.99 },
//       { name: "large", price: 26.99 },
//     ],
//     taste: "Spicy & Savory",
//     images: {
//       thumbnail:
//         "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=300",
//       primary:
//         "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800",
//       gallery: [
//         "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800",
//         "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800",
//       ],
//     },
//     quantity: 1,
//     selectedPortion: "small",
//   },
//   {
//     id: 2,
//     name: "Smoky Bacon Double Cheeseburger",
//     shortDescription:
//       "Juicy double beef patties with thick-cut bacon, cheddar, and house sauce.",
//     description:
//       "Two 100% Angus beef patties smashed and seared on a flat-top grill. Served on a toasted brioche bun with double sharp cheddar cheese, applewood smoked bacon, crispy onion strings, pickles, and signature house BBQ mayo.",
//     portions: [
//       { name: "single", price: 14.5 },
//       { name: "double", price: 18.5 },
//       { name: "triple", price: 22.5 },
//     ],
//     taste: "Rich & Savory",
//     images: {
//       thumbnail:
//         "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300",
//       primary:
//         "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
//       gallery: [
//         "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
//         "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800",
//       ],
//     },
//     quantity: 1,
//     selectedPortion: "single",
//   },
//   {
//     id: 3,
//     name: "Truffle Wild Mushroom Fettuccine",
//     shortDescription:
//       "Fresh fettuccine pasta tossed in a creamy garlic truffle cream sauce.",
//     description:
//       "House-made egg fettuccine noodles tossed with sauteed wild chanterelle and cremini mushrooms. Smothered in a velvet white wine truffle garlic sauce and finished with grated Aged Parmigiano-Reggiano.",
//     portions: [
//       { name: "regular", price: 21.0 },
//       { name: "large", price: 25.0 },
//       { name: "family", price: 39.0 },
//     ],
//     taste: "Creamy & Umami",
//     images: {
//       thumbnail:
//         "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300",
//       primary:
//         "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800",
//       gallery: [
//         "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800",
//       ],
//     },
//     quantity: 1,
//     selectedPortion: "regular",
//   },
// ];

const CartPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();

  const activeStep = parseInt(searchParams.get("step") || "1");

  const {cart, decreaseQuantity, increaseQuantity, removeFromCart} = useCartStore();
  const itemCount = cart.reduce((count, item) => count + (item.quantity ?? 1), 0);

  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      {/*TITLE*/}
      <h1 className="text-2xl text-(--accent) font-medium">
        Your Shopping Cart ({itemCount})
      </h1>
      {/* STEPS */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            className={`flex items-center gap-2 border-b-2 pb-4 ${
              step.id === activeStep ? "border-(--brand)" : "border-(--line)"
            }`}
            key={step.id}
          >
            <div
              className={`w-6 h-6 rounded-full text-(--on-brand) p-4 flex items-center justify-center ${
                step.id === activeStep ? "bg-(--brand)" : "bg-(--line)"
              }`}
            >
              {step.id}
            </div>
            <p
              className={`text-sm font-medium ${
                step.id === activeStep ? "text-foreground" : "text-(--muted)"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
      {/**STEPS AND DETAILS */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        {/** STEPS */}
        <div className="w-full lg:w-7/12 rounded-lg border border-(--line) bg-(--surface) p-8 shadow-lg flex flex-col gap-8">
          {activeStep === 1 ? (
            cart.map((item) => (
              <div
                className="flex items-center justify-between"
                key={`${item.id}-${item.selectedPortion ?? item.portions[0]?.name ?? "default"}`}
              >
                {/** IMAGE AND DETAILS */}
                <div className="flex gap-8">
                  {/**IMAGE */}
                  <div className="relative h-32 w-32 bg-(--surface-muted) rounded-lg overflow-hidden">
                    <Image
                      src={item.images.primary}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/**ITEM DETAILS */}
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-(--muted) capitalize">
                        {item.selectedPortion ?? item.portions[0]?.name} portion
                      </p>
                      <div className="flex items-center gap-2" aria-label={`Quantity for ${item.name}`}>
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded border border-(--line) text-foreground hover:bg-(--surface-muted)"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-5 text-center text-sm tabular-nums" aria-live="polite">
                          {item.quantity ?? 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="flex h-7 w-7 items-center justify-center rounded border border-(--line) text-foreground hover:bg-(--surface-muted)"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <p className="font-medium">
                      ${" "}
                      {(
                        item.portions.find(
                          (portion) => portion.name === item.selectedPortion,
                        )?.price ?? 0
                      ).toFixed(2)}
                    </p>
                  </div>
                </div>
                {/** DELETE BUTTON */}
                <button onClick={() =>removeFromCart(item) } className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-400 flex items-center justify-center cursor-pointer ">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))
          ) : activeStep === 2 ? (
            <ShippingForm
              onSubmit={(values) => {
                setShippingForm(values);
                router.push("/cart?step=3", { scroll: false });
              }}
            />
          ) : activeStep === 3 && shippingForm ? (
            <PaymentForm />
          ) : (
            <p className="text-sm text-(--muted)">
              Please fill in the shipping form to continue.
            </p>
          )}
        </div>
        {/**DETAILS */}
        <div className="w-full lg:w-5/12 rounded-lg border border-(--line) bg-(--surface) p-8 shadow-lg flex flex-col gap-8 h-max">
          <h2 className="font-semibold">Cart Details</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <p className="text-sm text-(--muted)">Subtotal</p>
              <p>
                ${" "}
                {cart
                  .reduce((acc, item) => {
                    const selectedPortion =
                      item.portions.find(
                        (portion) =>
                          portion.name ===
                          (item.selectedPortion ?? item.portions[0]?.name),
                      ) ?? null;

                    return acc + (selectedPortion?.price ?? 0) * (item.quantity ?? 1);
                  }, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <p className="text-sm text-(--muted)">Discount(10%)</p>
              <p>$ 10</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <p className="text-sm text-(--muted)">Shipping Fee</p>
              <p>$ 10</p>
            </div>
            <hr className="border-(--line)" />
            <div className="flex justify-between">
              <p className="text-sm text-(--muted) font-semibold">Total Fee</p>
              <p>
                ${" "}
                {cart
                  .reduce((acc, item) => {
                    const selectedPortion =
                      item.portions.find(
                        (portion) =>
                          portion.name ===
                          (item.selectedPortion ?? item.portions[0]?.name),
                      ) ?? null;

                    return acc + (selectedPortion?.price ?? 0) * (item.quantity ?? 1);
                  }, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
          {activeStep === 1 && (
            <button
              onClick={() => router.push("/cart?step=2", { scroll: false })}
              className="w-full bg-(--brand) hover:bg-(--brand-dark) transition-all duration-300 text-(--on-brand) p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const CartPage = () => (
  <Suspense fallback={<div className="py-12 text-center text-sm text-(--muted)">Loading cart...</div>}>
    <CartPageContent />
  </Suspense>
);

export default CartPage;
