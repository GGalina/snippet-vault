import Link from "next/link";
import { Snippet } from "@/types/snippet";

export default function SnippetCard({ snippet }: { snippet: Snippet }) {
  return (
    <div className="border rounded p-4 mb-4">

      <h2 className="text-xl font-semibold">
        {snippet.title}
      </h2>

      <p className="text-gray-600">{snippet.content}</p>

      <div className="flex gap-2 mt-2">
        {snippet.tags.map((tag) => (
          <span key={tag} className="bg-gray-200 px-2 py-1 text-sm rounded">
            #{tag}
          </span>
        ))}
      </div>

      <Link
        href={`/snippets/${snippet._id}`}
        className="text-blue-500 mt-2 inline-block"
      >
        View Details
      </Link>

    </div>
  );
}