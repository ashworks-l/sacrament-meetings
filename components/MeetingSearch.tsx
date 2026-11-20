"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentQuery = searchParams.get("query") ?? "";

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term.trim()) {
      params.set("query", term.trim());
    } else {
      params.delete("query");
    }

    // Start from the first page after a new search.
    params.set("page", "1");

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }, 300);

  return (
    <div className="mb-8">
      <label
        htmlFor="meeting-search"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Search meetings
      </label>

      <input
        key={currentQuery}
        id="meeting-search"
        type="search"
        placeholder="Search by speaker, presiding, conducting, or meeting type..."
        defaultValue={currentQuery}
        onChange={(event) => handleSearch(event.target.value)}
        aria-label="Search meetings"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}
