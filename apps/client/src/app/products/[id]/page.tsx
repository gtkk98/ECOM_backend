import ProductDetails from "@/components/ProductDetails";
import { products } from "@/components/ProductList";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { canonicalUrl } from "@/lib/seo";

export function generateStaticParams() {
    return products.map((product) => ({ id: String(product.id) }));
}

export async function generateMetadata({
    params,
}: PageProps<"/products/[id]">): Promise<Metadata> {
    const { id } = await params;
    const product = products.find((item) => String(item.id) === id);

    if (!product) notFound();

    const description = product.shortDescription.slice(0, 160);
    const canonical = canonicalUrl(`/products/${id}`);

    return {
        title: product.name,
        description,
        keywords: [product.name, "ChowUp", ...(
            Array.isArray(product.taste) ? product.taste : [product.taste]
        )],
        alternates: canonical ? { canonical } : undefined,
        openGraph: {
            type: "website",
            title: `${product.name} | ChowUp`,
            description,
            images: [{
                url: product.images.primary,
                alt: product.name,
            }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${product.name} | ChowUp`,
            description,
            images: [product.images.primary],
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