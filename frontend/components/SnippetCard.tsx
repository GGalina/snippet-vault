import Link from "next/link";
import { Snippet } from "@/types/snippet";

export default function SnippetCard({ snippet }: { snippet: Snippet }) {
  return (
    <div className="border border-gray-300 rounded p-4 mb-4 flex flex-col justify-between min-h-37.5">
      {/* Title */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">{snippet.title}</h2>
        <span className="px-4 py-1 rounded border border-gray-300">
          {snippet.type}
        </span>
      </div>

      {/* Content */}
      <p className="text-gray-600 mb-2">{snippet.content}</p>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap mb-2">
        {snippet.tags.map((tag) => (
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

      {/* View Details link */}
      <div className="flex justify-end">
        <Link
          href={`/snippets/${snippet._id}`}
          className="text-blue-500 font-medium hover:underline"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
