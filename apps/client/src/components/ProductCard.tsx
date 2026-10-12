"use client";

import { ProductType } from "@repo/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion, motion } from "framer-motion";
import { useState } from "react";
import useCartStore from "@/stores/cartStore";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: ProductType }) => {
  const productImages =
    typeof product.images === "object" && product.images !== null
      ? (product.images as Record<string, unknown>)
      : null;

  const imageSrc =
    typeof productImages?.primary === "string"
      ? productImages.primary
      : typeof productImages?.thumbnail === "string"
        ? productImages.thumbnail
        : "";

  const tastes = Array.isArray(product.taste)
    ? product.taste.filter(
        (taste): taste is string => typeof taste === "string",
      )
    : typeof product.taste === "string"
      ? [product.taste]
      : [];

  type ProductPortion = {
    name: string;
    price: number;
  };

  const safePortions = Array.isArray(product.portions)
    ? product.portions.filter(
        (portion): portion is ProductPortion =>
          typeof portion === "object" &&
          portion !== null &&
          "name" in portion &&
          typeof portion.name === "string" &&
          "price" in portion &&
          typeof portion.price === "number",
      )
    : [];

  const [selectedPortion, setSelectedPortion] = useState<ProductPortion | null>(
    safePortions[0] ?? null,
  );
  const prefersReducedMotion = useReducedMotion();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    if (!selectedPortion) return;

    const cartProduct = {
      ...product,
      quantity: 1,
      selectedPortion: selectedPortion.name,
      portions: safePortions.map(({ name }) => ({ name })),
    };

    addToCart(cartProduct, selectedPortion);
    toast.success(`${product.name} (${selectedPortion.name}) added to cart`);
  };

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.28,
        ease: "easeOut",
      }}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-(--line) bg-(--surface) shadow-[0_3px_14px_rgb(25_42_38/5%)] transition-shadow hover:shadow-[0_12px_30px_rgb(25_42_38/12%)]"
    >
      {/* IMAGE */}
      <Link
        href={`/products/${product.id}`}
        aria-label={`View ${product.name}`}
      >
        <div className="relative aspect-4/3 overflow-hidden bg-(--surface-muted)">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <span className="absolute left-3 top-3 rounded-full bg-(--surface) px-3 py-1 text-xs font-medium text-(--brand-dark) backdrop-blur">
            Fresh pick
          </span>
        </div>
      </Link>
      {/* PRODUCT DETAILS */}
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div>
          <h2 className="font-semibold leading-snug text-foreground">
            {product.name}
          </h2>
          <p className="mt-1 line-clamp-2 min-h-10 text-sm leading-5 text-(--muted)">
            {product.shortDescription}
          </p>
        </div>
        {/* PRODUCT TYPES */}
        <div className="flex flex-wrap items-end gap-x-5 gap-y-3 text-xs">
          {/* PORTION */}
          <div className="flex flex-col gap-1">
            <label htmlFor={`portion-${product.id}`} className="text-(--muted)">
              Portion
            </label>
            <select
              name="size"
              id={`portion-${product.id}`}
              className="h-9 max-w-36 rounded-md border border-(--line) bg-(--surface) px-2 text-foreground disabled:cursor-not-allowed disabled:opacity-60"
              value={selectedPortion?.name ?? ""}
              disabled={safePortions.length === 0}
              onChange={(event) => {
                const portion = safePortions.find(
                  (option) => option.name === event.target.value,
                );
                if (portion) setSelectedPortion(portion);
              }}
            >
              {safePortions.length === 0 ? (
                <option value="">Unavailable</option>
              ) : (
                safePortions.map((portion) => (
                  <option key={portion.name} value={portion.name}>
                    {portion.name}
                  </option>
                ))
              )}
            </select>
          </div>
          {/* TASTE */}
          <div className="flex min-w-0 flex-col gap-1">
            <span className="text-(--muted)">Taste</span>
            <div className="flex flex-wrap items-center gap-2">
              {tastes.map((taste) => (
                <span
                  key={taste}
                  className="rounded-full bg-(--surface-tint) px-2 py-1 text-[10px] font-medium text-(--brand-dark)"
                >
                  {taste}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* PRICE AND ADD TO CART */}
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-(--line) pt-3">
          <p className="font-semibold tabular-nums text-foreground">
            ${selectedPortion ? selectedPortion.price.toFixed(2) : "0.00"}
          </p>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!selectedPortion}
            className="inline-flex min-h-10 items-center gap-2 rounded-md bg-(--brand) px-3 text-sm font-semibold text-(--on-brand) transition-colors hover:bg-(--brand-dark) disabled:cursor-not-allowed disabled:opacity-60"
          >
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            Add
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default ProductCard;
