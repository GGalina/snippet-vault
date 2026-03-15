"use client";

import { useEffect, useState } from "react";
import { getSnippet, deleteSnippet } from "@/api/api";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function SnippetDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [snippet, setSnippet] = useState<any>(null);

  useEffect(() => {
    const fetchSnippet = async () => {
      const res = await getSnippet(id as string);
      setSnippet(res.data);
    };
    fetchSnippet();
  }, [id]);

  if (!snippet) return <p>Loading...</p>;

  const handleDelete = async () => {
    await deleteSnippet(id as string);
    router.push("/");
  };

  return (
    <div className="p-6">
      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        className="inline-flex items-center mb-6 cursor-pointer"
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
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        Back
      </button>

      {/* Snippet title */}
      <div className="flex justify-evenly mb-2">
        <h2 className="text-xl font-semibold">{snippet.title}</h2>
        <span className="px-4 py-1 rounded border border-gray-300">
          {snippet.type}
        </span>
      </div>

      {/* Snippet content */}
      <p className="mt-2 mb-4">{snippet.content}</p>

      {/* Tags with gradient */}
      <div className="flex gap-2 flex-wrap mb-4">
        {snippet.tags.map((tag: string) => (
          <span
            key={tag}
            className="px-2 py-1 text-sm rounded 
                       bg-linear-to-r from-purple-500 to-blue-500
                       text-white"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex justify-center gap-3 mt-6">
        <Link
          href={`/snippets/${id}/edit`}
          className="flex justify-center items-center px-4 py-2 w-32 rounded text-white font-medium
                     bg-green-600 hover:bg-green-700 transition-colors"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="flex justify-center cursor-pointer items-center px-4 py-2 w-32 rounded text-white font-medium
                     bg-red-600 hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
