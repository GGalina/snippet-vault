"use client";

import { useEffect, useState } from "react";
import { getSnippet, updateSnippet } from "@/api/api";
import { useParams, useRouter } from "next/navigation";
import SnippetForm from "@/components/SnippetForm";

export default function EditSnippet() {
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

  const handleSubmit = async (data: any) => {
    await updateSnippet(id as string, data);
    router.push(`/snippets/${id}`);
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
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back
      </button>

      {/* Page title */}
      <h1 className="text-2xl text-center font-bold mb-4">Edit Snippet</h1>

      {/* Snippet form */}
      <SnippetForm initialData={snippet} onSubmit={handleSubmit} />
    </div>
  );
}
