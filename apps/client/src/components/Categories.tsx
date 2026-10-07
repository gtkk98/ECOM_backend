"use client";
import {
    Pizza,
    Sandwich,
    UtensilsCrossed,
    Flame,
    Soup,
    Cake,
    CupSoda
} from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const categories = [
  {
    name: "All dishes",
    slug: "all",
    icon: <UtensilsCrossed className="w-4 h-4" />
  },
  {
    name: "Pizza",
    slug: "pizza",
    icon: <Pizza className="w-4 h-4" />
  },
  {
    name: "Burgers",
    slug: "burgers",
    icon: <Sandwich className="w-4 h-4" />
  },
  {
    name: "Pasta",
    slug: "pasta",
    icon: <UtensilsCrossed className="w-4 h-4" />
  },
  {
    name: "Wings & Sides",
    slug: "wings-and-sides",
    icon: <Flame className="w-4 h-4" />
  },
  {
    name: "Ramen & Asian",
    slug: "ramen-and-asian",
    icon: <Soup className="w-4 h-4" />
  },
  {
    name: "Desserts",
    slug: "desserts",
    icon: <Cake className="w-4 h-4" />
  },
  {
    name: "Beverages",
    slug: "beverages",
    icon: <CupSoda className="w-4 h-4" />
  }
];

const Categories = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const selectedCategory = searchParams.get("category") ?? "all";

    const handleChange = (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all") params.delete("category");
      else params.set("category", value);
      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, {scroll: false});
    };

    return (
      <div role="group" aria-label="Filter by category" className="mb-5 flex gap-2 overflow-x-auto pb-2 text-sm">
            {categories.map((category) => (
          <button
          type="button"
          aria-pressed={category.slug === selectedCategory}
          className={`flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-full border px-4 transition-colors ${
            category.slug === selectedCategory ? "border-(--brand) bg-(--brand) text-(--on-brand)" : "border-(--line) bg-(--surface) text-(--muted) hover:border-(--brand) hover:text-(--brand)"
                }`} 
                key={category.name}
          onClick={() => handleChange(category.slug)}
                >
                    {category.icon}
                    {category.name}
          </button>
            ))}      
        </div>
    )
}

export default Categories