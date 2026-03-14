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
    <div>

      <h1 className="text-2xl mb-4">
        Edit Snippet
      </h1>

      <SnippetForm
        initialData={snippet}
        onSubmit={handleSubmit}
      />

    </div>
  );
}