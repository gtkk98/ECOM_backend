import { Search } from "lucide-react";

const SearchBar = () => {
    return (
        <form action="/products" role="search" className="order-3 flex h-10 w-full items-center gap-2 rounded-md border border-(--line) bg-(--surface) px-3 transition-shadow focus-within:border-(--brand) focus-within:shadow-[0_0_0_3px_rgb(23_107_87/10%)] sm:order-0 sm:ml-auto sm:w-64">
            <label htmlFor="menu-search" className="sr-only">Search the menu</label>
            <input
                id="menu-search"
                name="q"
                type="search"
                placeholder="Search dishes"
                className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-(--muted)"
            />
            <button type="submit" aria-label="Search menu" className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-(--muted) transition-colors hover:text-(--brand)">
                <Search aria-hidden="true" className="h-4 w-4" />
            </button>
        </form>
    );
}

export default SearchBar;