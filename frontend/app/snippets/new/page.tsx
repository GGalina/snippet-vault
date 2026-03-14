"use client";

import { useRouter } from "next/navigation";
import SnippetForm from "@/components/SnippetForm";
import { createSnippet } from "@/api/api";

export default function NewSnippet() {

  const router = useRouter();

  const handleSubmit = async (data: any) => {
    await createSnippet(data);
    router.push("/");
  };

  return (
    <div>

      <h1 className="text-2xl mb-4">
        Create Snippet
      </h1>

      <SnippetForm onSubmit={handleSubmit} />

    </div>
  );
}