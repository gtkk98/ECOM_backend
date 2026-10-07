import ProductList from "@/components/ProductList";
import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/seo";
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
  title: "Fresh comfort food",
  description: "Explore ChowUp favorites made fresh to order, from wood-fired pizza to rich ramen and desserts.",
  alternates: canonicalUrl("/") ? { canonical: canonicalUrl("/") } : undefined,
};

const Homepage = async ({
  searchParams
}:{
  searchParams: Promise<{ category?: string; q?: string; sort?: string }>;
}) => {
  const { category, q, sort } = await searchParams;
  return (
    <div>
      <HeroSection />
      <ProductList category={category} query={q} sort={sort} params="homepage" />
    </div>
  );
}

export default Homepage;