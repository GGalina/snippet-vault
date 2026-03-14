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
    <div>

      <h1 className="text-2xl font-bold">
        {snippet.title}
      </h1>

      <p className="mt-2">{snippet.content}</p>

      <div className="flex gap-2 mt-4">
        {snippet.tags.map((tag: string) => (
          <span key={tag} className="bg-gray-200 px-2 py-1 rounded">
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3 mt-6">

        <Link
          href={`/snippets/${id}/edit`}
          className="bg-blue-500 text-white px-3 py-2 rounded"
        >
          Edit
        </Link>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-2 rounded"
        >
          Delete
        </button>

      </div>

    </div>
  );
}