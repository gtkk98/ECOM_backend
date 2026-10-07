import Link from "next/link";
import { ProductType } from "../types";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Filter from "./Filter";
import { Search } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export const products:ProductType[] = [
  {
    id: 1,
    name: "Artisan Pepperoni Pizza",
    shortDescription: "Wood-fired sourdough crust topped with spicy pepperoni and fresh mozzarella.",
    description: "Crafted with hand-tossed sourdough crust and baked in a 800°F wood-fired oven. Layered with authentic San Marzano tomato sauce, whole milk mozzarella, premium sliced pepperoni, and drizzled with chili-infused hot honey.",
    portions: [
      { name: "small", price: 18.99 },
      { name: "medium", price: 22.99 },
      { name: "large", price: 26.99 },
    ],
    taste: "Spicy & Savory",
    images: {
      thumbnail: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=300",
      primary: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=800",
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800"
      ]
    }
  },
  {
    id: 2,
    name: "Smoky Bacon Double Cheeseburger",
    shortDescription: "Juicy double beef patties with thick-cut bacon, cheddar, and house sauce.",
    description: "Two 100% Angus beef patties smashed and seared on a flat-top grill. Served on a toasted brioche bun with double sharp cheddar cheese, applewood smoked bacon, crispy onion strings, pickles, and signature house BBQ mayo.",
    portions: [
      { name: "single", price: 14.50 },
      { name: "double", price: 18.50 },
      { name: "triple", price: 22.50 },
    ],
    taste: "Rich & Savory",
    images: {
      thumbnail: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300",
      primary: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
        "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800"
      ]
    }
  },
  {
    id: 3,
    name: "Truffle Wild Mushroom Fettuccine",
    shortDescription: "Fresh fettuccine pasta tossed in a creamy garlic truffle cream sauce.",
    description: "House-made egg fettuccine noodles tossed with sauteed wild chanterelle and cremini mushrooms. Smothered in a velvet white wine truffle garlic sauce and finished with grated Aged Parmigiano-Reggiano.",
    portions: [
      { name: "regular", price: 21.00 },
      { name: "large", price: 25.00 },
      { name: "family", price: 39.00 },
    ],
    taste: "Creamy & Umami",
    images: {
      thumbnail: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=300",
      primary: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800"
      ]
    }
  },
  {
    id: 4,
    name: "Fiery Buffalo Chicken Wings",
    shortDescription: "Crispy fried wings tossed in classic spicy buffalo sauce.",
    description: "Jumbo chicken wings fried to golden crispiness and drenched in our homemade cayenne pepper buffalo sauce. Accompanied by crunchy celery sticks, carrot spears, and house buttermilk blue cheese dip.",
    portions: [
      { name: "Half Dozen", price: 12.99 },
      { name: "Standard", price: 18.99 },
      { name: "Party Size", price: 29.99 },
    ],
    taste: "Hot & Tangy",
    images: {
      thumbnail: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=300",
      primary: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800"
      ]
    }
  },
  {
    id: 5,
    name: "Tonkotsu Chashu Ramen",
    shortDescription: "Rich rich pork broth ramen with tender chashu pork belly and soft-boiled egg.",
    description: "Slow-simmered 12-hour pork bone broth served over springy ramen noodles. Topped with melt-in-your-mouth slow-braised pork belly, marinated ajitama egg, wood ear mushrooms, bamboo shoots, and scallions.",
    portions: [
      { name: "Regular Bowl", price: 16.75 },
      { name: "Large Bowl", price: 20.75 },
      { name: "Monster Bowl", price: 25.75 },
    ],
    taste: "Savory & Umami",
    images: {
      thumbnail: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300",
      primary: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800"
      ]
    }
  },
  {
    id: 6,
    name: "Mango Passionfruit Cheesecake",
    shortDescription: "Creamy New York style cheesecake topped with fresh tropical fruit glaze.",
    description: "Rich and silky baked cream cheese filling on a buttery graham cracker crust. Layered with a tart passionfruit reduction and topped with diced fresh Kensington Pride mangoes.",
    portions: [
      { name: "Single Slice", price: 8.50 },
      { name: "Double Slice", price: 15.00 },
      { name: "Whole Cake", price: 42.00 },
    ],
    taste: "Sweet & Tangy",
    images: {
      thumbnail: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=300",
      primary: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800",
      gallery: [
        "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800"
      ]
    }
  },
  {
    id: 7,
    name: "Basil Garden Margherita",
    shortDescription: "A crisp sourdough base with tomato, creamy mozzarella, and garden basil.",
    description: "Our hand-stretched sourdough pizza is topped with slow-simmered tomato sauce, fresh mozzarella, fragrant basil, and a finish of extra-virgin olive oil.",
    portions: [
      { name: "small", price: 16.50 },
      { name: "medium", price: 20.50 },
      { name: "large", price: 24.50 },
    ],
    taste: "Fresh & Savory",
    images: {
      thumbnail: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300",
      primary: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800",
      gallery: ["https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800"]
    }
  },
  {
    id: 8,
    name: "Crispy Chicken Club Burger",
    shortDescription: "Golden chicken, ripe tomato, crunchy greens, and peppery herb mayo.",
    description: "A crisp buttermilk chicken burger layered with lettuce, tomato, pickled onion, and house herb mayo on a toasted brioche bun.",
    portions: [
      { name: "single", price: 13.50 },
      { name: "double", price: 17.50 },
    ],
    taste: "Crispy & Zesty",
    images: {
      thumbnail: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300",
      primary: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800",
      gallery: ["https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800"]
    }
  },
  {
    id: 9,
    name: "Lemon Herb Chicken Linguine",
    shortDescription: "Silky linguine with grilled chicken, lemon, herbs, and parmesan.",
    description: "Fresh pasta tossed with grilled chicken, garlic, lemon zest, parsley, and parmesan for a bright, satisfying bowl.",
    portions: [
      { name: "regular", price: 19.50 },
      { name: "large", price: 24.00 },
    ],
    taste: "Bright & Savory",
    images: {
      thumbnail: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=300",
      primary: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800",
      gallery: ["https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800"]
    }
  },
  {
    id: 10,
    name: "Korean BBQ Chicken Rice Bowl",
    shortDescription: "Sticky gochujang chicken, warm rice, crunchy vegetables, and sesame.",
    description: "An Asian-inspired rice bowl with sweet-spicy Korean BBQ chicken, pickled vegetables, scallions, and toasted sesame.",
    portions: [
      { name: "regular bowl", price: 15.75 },
      { name: "large bowl", price: 19.75 },
    ],
    taste: "Sweet Heat & Umami",
    images: {
      thumbnail: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300",
      primary: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800",
      gallery: ["https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800"]
    }
  },
  {
    id: 11,
    name: "Truffle Parmesan Fries",
    shortDescription: "Crispy golden fries tossed with parmesan, parsley, and truffle oil.",
    description: "A shareable side of hand-cut fries, finished with aged parmesan, fresh parsley, and a touch of truffle oil.",
    portions: [
      { name: "regular", price: 7.50 },
      { name: "share size", price: 11.50 },
    ],
    taste: "Crispy & Savory",
    images: {
      thumbnail: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300",
      primary: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800",
      gallery: ["https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800"]
    }
  },
  {
    id: 12,
    name: "Dark Chocolate Lava Cake",
    shortDescription: "Warm chocolate cake with a flowing center and vanilla bean cream.",
    description: "A rich dark chocolate dessert baked to order, served warm with vanilla bean cream and a dusting of cocoa.",
    portions: [
      { name: "single cake", price: 9.25 },
      { name: "two cakes", price: 16.50 },
    ],
    taste: "Deep & Decadent",
    images: {
      thumbnail: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=300",
      primary: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800",
      gallery: ["https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=800"]
    }
  },
  {
    id: 13,
    name: "Strawberry Basil Lemonade",
    shortDescription: "Fresh strawberries, lemon, and basil over ice.",
    description: "A bright house-made drink with muddled strawberries, fresh-squeezed lemon, garden basil, and sparkling water.",
    portions: [
      { name: "regular", price: 5.00 },
      { name: "large", price: 6.50 },
    ],
    taste: "Fresh & Tangy",
    images: {
      thumbnail: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?w=300",
      primary: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?w=800",
      gallery: ["https://images.unsplash.com/photo-1513558161293-cdaf765edfd7?w=800"]
    }
  },
  {
    id: 14,
    name: "Iced Vanilla Matcha Latte",
    shortDescription: "Smooth ceremonial matcha, vanilla, and chilled oat milk.",
    description: "A gently sweet iced beverage made with whisked matcha, vanilla, and creamy oat milk.",
    portions: [
      { name: "regular", price: 6.00 },
      { name: "large", price: 7.50 },
    ],
    taste: "Creamy & Earthy",
    images: {
      thumbnail: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=300",
      primary: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800",
      gallery: ["https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=800"]
    }
  }
];

const categoryKeywords: Record<string, string[]> = {
  pizza: ["pizza"],
  burgers: ["burger"],
  pasta: ["pasta", "fettuccine"],
  "wings-and-sides": ["wing", "side"],
  "ramen-and-asian": ["ramen", "asian"],
  desserts: ["dessert", "cake", "cheesecake"],
  beverages: ["beverage", "drink", "soda"],
};

const ProductList = ({
  category,
  query,
  sort,
  params,
}: {
  category?: string;
  query?: string;
  sort?: string;
  params: "homepage" | "products";
}) => {
  const normalizedQuery = query?.trim().toLowerCase() ?? "";
  const keywords = category && category !== "all" ? categoryKeywords[category] : undefined;
  const visibleProducts = products
    .filter((product) => {
      const searchableText = `${product.name} ${product.shortDescription} ${product.description} ${product.taste}`.toLowerCase();
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
      const matchesCategory = !keywords || keywords.some((keyword) => searchableText.includes(keyword));
      return matchesQuery && matchesCategory;
    })
    .sort((first, second) => {
      if (sort === "price-low") return first.portions[0].price - second.portions[0].price;
      if (sort === "price-high") return second.portions[0].price - first.portions[0].price;
      if (sort === "name") return first.name.localeCompare(second.name);
      return 0;
    });

  return (
    <section id="menu" className="w-full scroll-mt-24">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <ScrollReveal>
          <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-(--brand)">From our kitchen</p>
                    <h2 className="mt-1 text-2xl font-semibold text-foreground sm:text-3xl">Find your next favorite</h2>
          </div>
        </ScrollReveal>
                <p className="text-sm text-(--muted)">{visibleProducts.length} {visibleProducts.length === 1 ? "dish" : "dishes"}</p>
      </div>
      <ScrollReveal delay={0.08}>
        <Categories />
        {params === "products" && <Filter sort={sort} />}
      </ScrollReveal>
      {visibleProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <ScrollReveal>
          <div className="flex min-h-56 flex-col items-center justify-center rounded-lg border border-dashed border-(--line) bg-(--surface) px-6 text-center">
          <Search className="h-6 w-6 text-(--muted)" aria-hidden="true" />
          <h3 className="mt-3 font-semibold">No dishes found</h3>
                    <p className="mt-1 max-w-sm text-sm text-(--muted)">Try another search or choose a different category.</p>
                    <Link href="/products" className="mt-4 text-sm font-semibold text-(--brand) underline underline-offset-4">Browse the full menu</Link>
          </div>
        </ScrollReveal>
      )}
      {params === "homepage" && (
                <Link href={category ? `/products/?category=${category}` : "/products"} className="mt-6 inline-flex min-h-10 items-center text-sm font-semibold text-(--brand) underline underline-offset-4 hover:text-(--brand-dark)">
          View full menu
        </Link>
      )}
    </section>
  );
}

export default ProductList;