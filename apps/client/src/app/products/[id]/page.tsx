import ProductDetails from "@/components/ProductDetails";
import { products } from "@/components/ProductList";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { canonicalUrl } from "@/lib/seo";
import { ProductType } from "@repo/types";

export function generateStaticParams() {
  return products.map((product) => ({ id: String(product.id) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[id]">): Promise<Metadata> {
  const { id } = await params;
  const product: ProductType | undefined = products.find(
    (item) => String(item.id) === id,
  );

  if (!product) notFound();

  const description = product.shortDescription.slice(0, 160);
  const canonical = canonicalUrl(`/products/${id}`);
  const imageUrl =
    typeof product.images === "object" &&
    product.images !== null &&
    "primary" in product.images
      ? String(product.images.primary)
      : undefined;

  const keywords = [
    product.name,
    "ChowUp",
    ...(Array.isArray(product.taste) ? product.taste : [product.taste]),
  ].filter(
    (keyword): keyword is string =>
      typeof keyword === "string" && keyword.trim().length > 0,
  );

  return {
    title: product.name,
    description,
    keywords,
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      type: "website",
      title: `${product.name} | ChowUp`,
      description,
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                alt: product.name,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ChowUp`,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/products/[id]">) {
  const { id } = await params;
  const product = products.find((item) => String(item.id) === id);

  if (!product) notFound();

  return <ProductDetails key={product.id} product={product} />;
}

