"use client";

import { useState } from "react";
import { Snippet, SnippetType } from "@/types/snippet";

interface SnippetFormProps {
  initialData?: Snippet;
  onSubmit: (data: Omit<Snippet, "_id" | "createdAt" | "updatedAt">) => void;
}

export default function SnippetForm({
  initialData,
  onSubmit,
}: SnippetFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [tags, setTags] = useState(initialData?.tags?.join(",") || "");
  const [type, setType] = useState<SnippetType>(initialData?.type || "note");

  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    tags?: string;
    type?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: {
      title?: string;
      content?: string;
      tags?: string;
      type?: string;
    } = {};

    if (!title.trim()) newErrors.title = "Title is required";
    if (!content.trim()) newErrors.content = "Content is required";
    if (!tags.trim()) newErrors.tags = "Tags are required";
    if (!type.trim()) newErrors.type = "Type is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

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

  // Shared Tailwind input styles
  const inputClass =
    "border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <input
          className={inputClass}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Content */}
      <div>
        <textarea
          className={inputClass}
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content}</p>
        )}
      </div>

      {/* Tags */}
      <div>
        <input
          className={inputClass}
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        {errors.tags && (
          <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
        )}
      </div>

      {/* Type */}
      <div>
        <select
          className={inputClass}
          value={type}
          onChange={(e) => setType(e.target.value as SnippetType)}
        >
          <option value="link">Link</option>
          <option value="note">Note</option>
          <option value="command">Command</option>
        </select>
        {errors.type && (
          <p className="text-red-500 text-sm mt-1">{errors.type}</p>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="flex items-center cursor-pointer justify-center px-8 py-2 w-32 rounded text-white font-medium
                     bg-linear-to-r from-purple-500 to-blue-500
                     hover:from-purple-600 hover:to-blue-600 transition-colors"
        >
          Save
        </button>
      </div>
    </form>
  );
}
