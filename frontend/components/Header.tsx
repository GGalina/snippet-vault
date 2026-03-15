"use client";

import Link from "next/link";

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded flex items-center justify-center text-white font-bold bg-linear-to-r from-purple-500 to-blue-500">
          {"</>"}
        </div>
        <div>
          <h1 className="text-3xl font-bold">Snippet Vault</h1>
          <p className="text-gray-500">
            Organize and manage your snippets easily
          </p>
        </div>
      </div>

      <Link
        href="/snippets/new"
        className="inline-flex items-center px-4 py-2 rounded text-white font-medium bg-linear-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-colors"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          ></path>
        </svg>
        Add Snippet
      </Link>
    </div>
  );
}
