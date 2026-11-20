
"use client";

import Link from "next/link";
import {
  usePathname,
  useSearchParams,
} from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function getPageUrl(page: number) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));

    return `${pathname}?${params.toString()}`;
  }

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Meeting pagination"
      className="mt-8 flex items-center justify-center gap-6"
    >
      {currentPage > 1 ? (
        <Link
          href={getPageUrl(currentPage - 1)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-400">
          Previous
        </span>
      )}

      <span className="text-sm font-medium text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={getPageUrl(currentPage + 1)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-400">
          Next
        </span>
      )}
    </nav>
  );
}
