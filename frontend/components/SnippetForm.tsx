"use client";

import { useState } from "react";
import { Snippet, SnippetType } from "@/types/snippet";

interface SnippetFormProps {
  initialData?: Snippet;
  onSubmit: (data: Omit<Snippet, "_id" | "createdAt" | "updatedAt">) => void;
}

export default function SnippetForm({ initialData, onSubmit }: SnippetFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [tags, setTags] = useState(initialData?.tags?.join(",") || "");
  const [type, setType] = useState<SnippetType>(initialData?.type || "note");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      title,
      content,
      type,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* Title */}
      <input
        className="border p-2 w-full"
        placeholder="Title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Content */}
      <textarea
        className="border p-2 w-full"
        placeholder="Content"
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {/* Tags */}
      <input
        className="border p-2 w-full"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      {/* Type */}
      <select
        className="border p-2 w-full"
        value={type}
        onChange={(e) => setType(e.target.value as SnippetType)}
      >
        <option value="link">Link</option>
        <option value="note">Note</option>
        <option value="command">Command</option>
      </select>

      {/* Submit */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>

    </form>
  );
}