"use client";

import Link from "next/link";

export default function LinkList({ links, action = null }) {
  const handleNavigation = (loc) => {
    const target = document.getElementById(loc);
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ul>
      {links.map((lin) => {
        if (action === "navigation" && typeof lin === "string") {
          return (
            <li
              key={lin}
              onClick={() => handleNavigation(lin.toLowerCase())}
              className="cursor-pointer hover:underline"
            >
              {lin}
            </li>
          );
        }

        if (action === "social" && typeof lin === "object") {
          return (
            <li key={lin.name}>
              <Link href={lin.url || "#"} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:underline">
                {lin.name}
              </Link>
            </li>
          );
        }
        return null;
      })}
    </ul>
  );
}
