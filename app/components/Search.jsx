'use client';

import { usePathname, useSearchParams, useRouter } from "next/navigation";


const Search = () => {

    const searchParams = useSearchParams();

    const pathname = usePathname();

    const { replace } = useRouter();

    const handleSearch = (query) => {
        console.log('Search', query);

        const params = new URLSearchParams(searchParams);

        if (query) {
            params.set('query', query);
        } else {
            params.delete('query');
        }

        replace(`${pathname}?${params.toString()}`);
    }
    return (

        <div className="relative flex flex-1  w-[500] flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-[500]  rounded-md border text-gray-900 border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Search by Category"
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}

            />

        </div>
    )
}

export default Search