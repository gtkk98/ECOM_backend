"use client";

import { ProductType } from "@/types";
import useCartStore from "@/stores/cartStore";
import PaymentMethodIcons from "@/components/PaymentMethodIcons";
import { ArrowLeft, Minus, Plus, ShoppingBag, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductDetails = ({ product }: { product: ProductType }) => {
  const router = useRouter();
  const galleryImages = Array.from(
    new Set([product.images.primary, ...product.images.gallery].filter(Boolean)),
  );
  const [selectedImage, setSelectedImage] = useState(
    galleryImages[0] ?? product.images.thumbnail,
  );
  const [selectedPortion, setSelectedPortion] = useState(product.portions[0]);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);
  const tastes = Array.isArray(product.taste) ? product.taste : [product.taste];

  const handleAddToCart = () => {
    addToCart(product, selectedPortion, quantity);
    toast.success(`${quantity} × ${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedPortion, quantity);
    router.push("/cart?step=2");
  };

  return (
    <main className="py-8 sm:py-12">
      <Link
        href="/products"
        className="mb-8 inline-flex items-center gap-2 text-sm text-(--muted) hover:text-(--brand)"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to menu
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        <section aria-label={`${product.name} images`} className="min-w-0">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-(--surface-muted)">
            <Image
              src={selectedImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {galleryImages.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-5">
              {galleryImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  aria-label={`Show product image ${index + 1}`}
                  aria-pressed={selectedImage === image}
                  className={`relative aspect-square overflow-hidden rounded-md border-2 ${
                    selectedImage === image ? "border-(--brand)" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="flex flex-col items-start gap-6">
          <div>
            <p className="mb-2 text-sm font-medium uppercase text-(--brand)">
              ChowUp menu
            </p>
            <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 text-base leading-7 text-(--muted)">
              {product.shortDescription}
            </p>
          </div>

          <div className="flex flex-wrap gap-2" aria-label="Taste profile">
            {tastes.map((taste) => (
              <span
                key={taste}
                className="rounded-full bg-(--surface-tint) px-3 py-1 text-sm text-(--brand-dark)"
              >
                {taste}
              </span>
            ))}
          </div>

          <p className="max-w-prose leading-7 text-foreground">{product.description}</p>

          <div className="w-full border-y border-(--line) py-5">
            <label htmlFor="product-portion" className="mb-2 block text-sm font-medium text-foreground">
              Portion
            </label>
            <select
              id="product-portion"
              value={selectedPortion.name}
              onChange={(event) => {
                const portion = product.portions.find(
                  (option) => option.name === event.target.value,
                );
                if (portion) setSelectedPortion(portion);
              }}
              className="w-full rounded-md border border-(--line) bg-(--surface) px-3 py-2 text-sm text-foreground focus:border-(--brand) focus:outline-none focus:ring-2 focus:ring-(--focus)"
            >
              {product.portions.map((portion) => (
                <option key={portion.name} value={portion.name}>
                  {portion.name} - ${portion.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            <p className="text-2xl font-semibold text-foreground">
              ${selectedPortion.price.toFixed(2)}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-(--muted)">Quantity</span>
              <div className="flex items-center rounded-md border border-(--line)">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  className="flex h-10 w-10 items-center justify-center text-foreground hover:bg-(--surface-muted) disabled:cursor-not-allowed disabled:text-(--muted)"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-8 text-center tabular-nums" aria-live="polite">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => current + 1)}
                  aria-label="Increase quantity"
                  className="flex h-10 w-10 items-center justify-center text-foreground hover:bg-(--surface-muted)"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md bg-(--brand) px-5 py-3 font-medium text-(--on-brand) transition-colors hover:bg-(--brand-dark)"
            >
              <ShoppingCart className="h-5 w-5" />
              Add {quantity} to cart
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-md border border-(--brand) px-5 py-3 font-medium text-(--brand-dark) transition-colors hover:bg-(--surface-tint)"
            >
              <ShoppingBag className="h-5 w-5" />
              Buy now
            </button>
          </div>
          <PaymentMethodIcons />
        </section>
      </div>
    </main>
  );
};

export default ProductDetails;