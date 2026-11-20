
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/meetings", label: "All Meetings" },
    { href: "/meetings/current", label: "Current Meeting" },
  ];

  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-4">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href === "/meetings" &&
              pathname.startsWith("/meetings/") &&
              pathname !== "/meetings/current");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors ${
                isActive
                  ? "border-b-2 border-blue-700 text-blue-700"
                  : "text-gray-600 hover:text-blue-700"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

