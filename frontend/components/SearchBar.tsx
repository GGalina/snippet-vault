"use client";

import { useState } from "react";

interface SearchBarProps {
  onSearch: (params: { q: string; tag: string }) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [q, setQ] = useState("");
  const [tag, setTag] = useState("");

  const handleSearch = () => {
    onSearch({ q, tag });
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 mb-4">
      {/* Main search input */}
      <input
        className="border-2 p-2 rounded grow w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search by title or content..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      {/* Tag filter */}
      <input
        className="border-2 p-2 rounded w-full md:w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Filter by tag..."
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />

      {/* Search button */}
      <button
        className="px-4 py-2 rounded w-full md:w-auto text-white font-medium
                   bg-linear-to-r from-purple-500 to-blue-500 cursor-pointer
                   hover:from-purple-600 hover:to-blue-600 transition-colors"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
