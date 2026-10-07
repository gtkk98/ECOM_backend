import type { MetadataRoute } from "next";
import { products } from "@/components/ProductList";
import { canonicalUrl, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];

  const publicRoutes: Array<{ path: string; priority: number; images?: string[] }> = [
    { path: "/", priority: 1 },
    { path: "/products", priority: 0.9 },
    ...products.map((product) => ({
      path: `/products/${product.id}`,
      priority: 0.7,
      images: [product.images.primary],
    })),
  ];

  return publicRoutes.flatMap(({ path, priority, images }) => {
    const url = canonicalUrl(path);
    return url ? [{ url, priority, ...(images ? { images } : {}) }] : [];
  });
}