import ProductList from "@/components/ProductList";
import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/seo";

const categoryLabels: Record<string, string> = {
  pizza: "Pizza",
  burgers: "Burgers",
  pasta: "Pasta",
  "wings-and-sides": "Wings and sides",
  "ramen-and-asian": "Ramen and Asian dishes",
  desserts: "Desserts",
  beverages: "Drinks",
};

export async function generateMetadata({
  searchParams,
}: PageProps<"/products">): Promise<Metadata> {
  const { category, q } = await searchParams;
  const query = typeof q === "string" ? q.trim().slice(0, 80) : "";
  const categoryLabel = typeof category === "string" ? categoryLabels[category] : undefined;
  const title = query
    ? `Search results for ${query}`
    : categoryLabel
      ? `${categoryLabel} menu`
      : "Browse the menu";
  const description = query
    ? `Explore ChowUp menu items matching ${query}.`
    : categoryLabel
      ? `Order fresh ${categoryLabel.toLowerCase()} from the ChowUp kitchen.`
      : "Browse fresh ChowUp pizzas, burgers, pasta, Asian favorites, desserts, and drinks.";

  return {
    title,
    description,
    keywords: ["ChowUp", "menu", categoryLabel, query].filter(
      (keyword): keyword is string => Boolean(keyword),
    ),
    robots: { index: !query, follow: true },
    alternates: canonicalUrl("/products")
      ? { canonical: canonicalUrl("/products") }
      : undefined,
    openGraph: {
      type: "website",
      title: `${title} | ChowUp`,
      description,
      images: ["https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1200"],
    },
  };
}

const ProductPage = async ({
  searchParams
}:{
  searchParams: Promise<{ category?: string; q?: string; sort?: string }>;
}) => {
  const { category, q, sort } = await searchParams;
  return(
        <ProductList category={category} query={q} sort={sort} params="products" />
    )
}

export default ProductPage