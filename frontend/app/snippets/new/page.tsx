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
    <div className="p-6 min-h-screen">
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

      <h1 className="flex items-center justify-center text-2xl font-bold mb-4">
        Create Snippet
      </h1>

      <SnippetForm onSubmit={handleSubmit} />
    </div>
  );
}
