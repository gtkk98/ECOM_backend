"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Filter = ({ sort }: { sort?: string }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const handleFilter = (value: string ) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", value);
        router.push(`${pathname}?${params.toString()}`, {scroll: false});
    };

    return (
        <div className="my-5 flex items-center justify-between gap-3 text-sm text-(--muted) sm:justify-end">
            <label htmlFor="sort">Sort dishes</label>
            <select name="sort" id="sort" value={sort ?? "recommended"} className="min-h-10 rounded-md border border-(--line) bg-(--surface) px-3 text-foreground" onChange={(event) => handleFilter(event.target.value)}>
                <option value="recommended">Recommended</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="name">Name: A to Z</option>
            </select>
        </div>
    )
}

export default Filter;